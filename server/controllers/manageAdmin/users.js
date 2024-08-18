const userModel = require("../../models/user");
const { Readable } = require('stream');
const getHijriDate = require("../../utils/getHijriDate");
const bcrypt = require("bcrypt");
const { schemaSearchValidation, schemaUpdateUserValidation } = require("../../utils/validation/schemaValidation");
const { File } = require("../../models/advertising/advertising");
const SALTROUNDS = Number(process.env.SALTROUNDS);
const { bucket } = require('../../app');
//POST METHODS
exports.addUser = async (req, res) => {
  const { name, password, NationalIdentificationNumber, phoneNumber } =
    req.body;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    const hijriDate = getHijriDate();
    const genSalt = Number(await bcrypt.genSalt(SALTROUNDS));
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = userModel({
      name,
      password: hashPassword,
      NationalIdentificationNumber,
      phoneNumber,
      hijriDate: {
        day: hijriDate[0],
        month: hijriDate[1],
        year: hijriDate[2],
      },
    });
    let err = await user.joiValidate(user.toObject());
    if (err.error) throw err;
    await user.save();
    return res.status(200).send({
      msg: "لقد تمت إضافة العضو بنجاح",
    });
  } catch (error) {
    let message = '';
    console.log(error)
    if (error.code === 11000) {
      if (error.keyPattern.NationalIdentificationNumber) {
        message = 'رقم التعريف الوطني موجود بالفعل';
      } else if (error.keyPattern.phoneNumber) {
        message = 'رقم الهاتف موجود بالفعل';
      }
      return res.status(400).send({
        msg: message,
      });
    }
    if (error.error) {
      return res.status(422).send({
        msg: "احد المدخلات فيه خطاء",
      });
    }
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
exports.uploadImage = async (req, res) => {
  const { file } = req;
  const { NationalIdentificationNumber } = req.user;
  try {
    if (file) {
      const { originalname, mimetype, buffer } = file;
      let uploadStream = bucket.openUploadStream(originalname, {
        contentType: mimetype
      });
      let readBuffer = new Readable();
      readBuffer.push(buffer);
      readBuffer.push(null);
      // Pipe the buffer to GridFS
      await new Promise((resolve, reject) => {
        readBuffer.pipe(uploadStream)
          .on('finish', resolve)
          .on('error', reject);
      });
      let newFile = new File({
        filename: originalname,
        contentType: mimetype,
        length: buffer.length,
        id: uploadStream.id
      });
      let savedFile = await newFile.save();
      if (!savedFile) {
        return res.status(404).send("حدث خطأ أثناء حفظ البيانات التعريفية للملف");
      }
      const user = await userModel.findOne({
        NationalIdentificationNumber
      });
      user.profileImage = newFile._id;
      await user.save();
      return res.status(200).send({ msg: "لقد تم رفع الصورة بنجاح", profileImage: newFile._id});
    }
    return res.status(404).send({ msg: "لم تصل الصورة حاول مجددا" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
}
exports.getProfileImage = async (req, res) => {
  const { id } = req.params;
  try {
    // Retrieve file metadata from your database
    const file = await File.findById(id);

    if (!file) {
        return res.status(404).send("File not found.");
    }

    // Use file metadata to get content type
    const contentType = file.contentType || 'application/octet-stream'; // Default content type if not found

    // Open a download stream using the file's ObjectId
    const downloadStream = bucket.openDownloadStream(file.id);

    downloadStream.on('error', (error) => {
        console.log(error);
        return res.status(500).send("Error occurred while retrieving the file.");
    });

    // Set the content type from the metadata
    res.setHeader('Content-Type', contentType);

    // Pipe the download stream to the response
    downloadStream.pipe(res);
} catch (error) {
    console.log(error);
    return res.status(500).send("Error occurred while retrieving the file.");
}
}
exports.updatePassword = async (req, res) => {
  const { idUser, password } = req.body;
  console.log(password);
  console.log(idUser)
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    const genSalt = Number(await bcrypt.genSalt(SALTROUNDS));
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = await userModel.findOneAndUpdate({
      id: idUser
    }, {
      password: hashPassword
    });
    console.log(user)
    return res.status(200).send({
      msg: "لقد تم تحديث كلمة سر بنجاح",
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك",
    });
  }
}
//GET METHODS
exports.getUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const users = await userModel.find().select("_id id name NationalIdentificationNumber phoneNumber status comments disable hijriDate createdAt").skip(skip).limit(pageSize).exec();

    const totalUsers = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);

    return res.status(200).json({
      users,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
exports.searchUser = async (req, res) => {
  try {
    const { searchMethod, searchValue } = req.query;
    let err = schemaSearchValidation.validate({
      searchMethod,
      searchValue
    });
    if (err.error) throw err;
    let query = {};
    if (searchMethod && searchValue) {
      switch (searchMethod) {
        case "_id":
          query.id = searchValue;
          break;
        case "name":
          query.name = { $regex: searchValue, $options: "i" };
          break;
        case "NationalIdentificationNumber":
          query.NationalIdentificationNumber = searchValue;
          break;
        case "phoneNumber":
          query.phoneNumber = searchValue;
          break;
        case "status":
          query.status = searchValue == "غير مفعل" ? "not active" : "active";
          break;
        default:
          return res
            .status(400)
            .send({ msg: "قم بتحديث الصفحة هناك خطا في المدخلات" });
      }
    } else {
      return res.status(400).send({ msg: "مطلوب طريقة البحث والقيمة" });
    }
    const user = await userModel.find(query).select("_id id name NationalIdentificationNumber phoneNumber status comments disable hijriDate createdAt");
    const totalUsers = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / 1);
    return res.status(200).json({
      user,
      totalUsers,
      totalPages
    });
  } catch (error) {
    if (error.error) {
      return res.status(422).send({
        msg: "احد المدخلات فيه خطاء",
      });
    }
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
//UPDATE METHODS
exports.updateUser = async (req, res) => {
  const { _id, name, NationalIdentificationNumber, phoneNumber, status, comments } = req.body;
  console.log(req.body)
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    let err = schemaUpdateUserValidation.validate({
      _id, name, NationalIdentificationNumber, phoneNumber, status, comments
    })
    if (err.error) throw err;
    const user = await userModel.findOne({
      id: _id
    });
    /* const user = await userModel.findByIdAndUpdate(_id, {
       name,
       NationalIdentificationNumber,
       phoneNumber,
       status,
       comments,
     })*/
    if (!user) {
      return res.status(404).send({
        msg: "المستخدم غير موجود"
      });
    }
    if (user.status != status) {
      if (req.user.admin.userPermission.indexOf("تفعيل اشتراك و ايقاف اشتراك عضو") == -1) {
        return res.status(403).send({
          msg: "ليس لديك إذن تفعيل اشتراك و ايقاف اشتراك عضو",
        });
      }
      if (user.oneYear == false) {
        return res.status(403).send({
          msg: "لم تمر سنة على تسجيلك"
        })
      }
    }
    user.name = name;
    user.NationalIdentificationNumber = NationalIdentificationNumber;
    user.phoneNumber = phoneNumber;
    user.status = status;
    user.comments = comments
    await user.save();
    return res.status(200).send({
      msg: `تتم تحديث المستخدم ${_id}`
    });
  } catch (error) {
    console.log(error)
    if (error.error) {
      return res.status(422).send({
        msg: "احد المدخلات فيه خطاء",
      });
    }
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
exports.changeStatus = async (req, res) => { };
//DELETE METHODS
exports.deleteUser = async (req, res) => {
  const { id } = req.query;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    const user = await userModel.findOne({
      id: id
    });
    user.disable = !user.disable;
    await user.save();
    /*const user = await userModel.findByIdAndUpdate(id,{
      disable: true
    });*/
    if (!user) {
      return res.status(404).send({
        msg: "المستخدم غير موجود"
      });
    }
    return res.status(200).send({
      msg: `تتم ${user.disable ? "تعطيل" : "تنشيط"} المستخدم ${id}`
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
