const userModel = require("../../models/user");
const getHijriDate = require("../../utils/getHijriDate");
const bcrypt = require("bcrypt");
const { schemaSearchValidation, schemaUpdateUserValidation } = require("../../utils/validation/schemaValidation");
const SALTROUNDS = Number(process.env.SALTROUNDS);

//POST METHODS
exports.addUser = async (req, res) => {
  const { name, email, password, NationalIdentificationNumber, phoneNumber } =
    req.body;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    const hijriDate = await getHijriDate();
    const genSalt = Number(await bcrypt.genSalt(SALTROUNDS));
    const hashPassword = await bcrypt.hash(password, genSalt);
    const user = userModel({
      name,
      email,
      password: hashPassword,
      NationalIdentificationNumber,
      phoneNumber,
      hijriDate: {
        day: hijriDate.data.hijri.day,
        month: hijriDate.data.hijri.month,
        year: hijriDate.data.hijri.year,
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
    if (error.code === 11000) {
      if (error.keyPattern.email) {
        message = 'البريد الإلكتروني موجود بالفعل';
      } else if (error.keyPattern.NationalIdentificationNumber) {
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
//GET METHODS
exports.getUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const users = await userModel.find().select("_id name email NationalIdentificationNumber phoneNumber status comments hijriDate createdAt").skip(skip).limit(pageSize).exec();

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
      ;
      switch (searchMethod) {
        case "_id":
          query._id = searchValue;
          break;
        case "name":
          query.name = { $regex: searchValue, $options: "i" };
          break;
        case "email":
          query.email = searchValue;
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
    const user = await userModel.find(query).select("_id name email NationalIdentificationNumber phoneNumber status comments hijriDate createdAt");
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
  const { _id, name, email, NationalIdentificationNumber, phoneNumber, status, comments } = req.body;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل عضو جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    let err = schemaUpdateUserValidation.validate({
      _id, name, email, NationalIdentificationNumber, phoneNumber, status, comments
    })
    if (err.error) throw err;
    const user = await userModel.findByIdAndUpdate(_id, {
      name,
      email,
      NationalIdentificationNumber,
      phoneNumber,
      status,
      comments,
    })
    if(!user){
      return res.status(404).send({
        msg: "المستخدم غير موجود"
      });
    }
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
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        msg: "المستخدم غير موجود"
      });
    }
    return res.status(200).send({
      msg: `تتم إزالة المستخدم ${id}`
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
