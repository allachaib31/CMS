const userModel = require("../../models/user");
const {schemaAdminValidation} = require("../../utils/validation/schemaValidation");
//POST METHODS
exports.addAdmin = async (req, res) => {
  let { UserPermission, idUser } = req.body;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل مسؤل جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف مسؤل",
      });
    }
    UserPermission = UserPermission.split(",");
    let err = schemaAdminValidation.validate({
      isAdmin: true,
      userPermissions: UserPermission,
    });
    if (err.error) throw err;
    const admin = await userModel.findByIdAndUpdate(idUser, {
      admin: {
        isAdmin: true,
        userPermissions: UserPermission,
      },
    });
    if (!admin) {
      return res.status(404).send({
        msg: "لم يتم العثور على هذا الشخص",
      });
    }
    return res.status(200).send({
      msg: "لقد تمت إضافة الادمن بنجاح",
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
//GET METHODS
exports.getAdmin = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const admins = await userModel
      .find({ "admin.isAdmin": true })
      .select(
        "_id name email NationalIdentificationNumber phoneNumber status comments hijriDate createdAt"
      );
    const totalUsers = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    return res.status(200).send({
      admins,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};

exports.searchAdmin = async (req, res) => {
  const { searchMethod, searchValue } = req.query;
  let query = {
    "admin.isAdmin": true,
  };
  try {
    if (searchMethod && searchValue) {
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
      return res
        .status(400)
        .send({ msg: "مطلوب طريقة البحث والقيمة" })
        .select(
          "_id name NationalIdentificationNumber phoneNumber status comments hijriDate createdAt"
        );
    }
    const admin = await userModel.find(query);
    console.log(admin)
    return res.status(200).json({
      admin,
    });
  } catch (error) {
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};

//UPDATE METHODS
exports.updateAdmin = async (req, res) => {
  let { idUser, UserPermission} = req.body;
  try {
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل مسؤل جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف مسؤل",
      });
    }
    UserPermission = UserPermission.split(",");
    let err = schemaAdminValidation.validate({
      isAdmin: true,
      userPermissions: UserPermission,
    });
    if (err.error) throw err;
    const admin = await userModel.findByIdAndUpdate(idUser, {
      admin: {
        isAdmin: true,
        userPermissions: UserPermission,
      },
    });
    if (!admin) {
      return res.status(404).send({
        msg: "لم يتم العثور على هذا الشخص",
      });
    }
    return res.status(200).send({
      msg: "لقد تم تحديث الادمن بنجاح",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    });
  }
};
//DELETE METHODS
exports.deleteAdmin = async (req, res) => {
  const { id } = req.query;
  try{
    if (req.user.admin.userPermission.indexOf("اضافة او حذف او تعديل مسؤل جديد") == -1) {
      return res.status(403).send({
        msg: "ليس لديك إذن إضافة او تعديل او حذف عضو",
      });
    }
    const user = await userModel.findByIdAndUpdate(id, {
      admin: {
        isAdmin: false,
        userPermissions: [],
      },
    })
    if (!user) {
      return res.status(404).send({
        msg: "المستخدم غير موجود"
      });
    }
    return res.status(200).send({
      msg: `تتم إزالة المسؤل ${id}`
    });
  }catch(error){
    return res.status(500).send({
      msg: "حدث خطأ أثناء معالجة طلبك"
    })
  }
};
