const Joi = require('joi');

const UserPermissionEnum = [
    "اضافة او حذف او تعديل عضو جديد",
    "اضافة او حذف او تعديل مسؤل جديد",
    "تفعيل اشتراك و ايقاف اشتراك عضو",
    "تغيير رقم الجوال",
    "إضافة أقساط قروض الأعضاء",
    "إضافة البيانات الأولية لشراء سلعة",
    "إضافة إيرادات (المساهمات وشراء السلع",
    "إضافة المصروفات المسترجعة بأنواعها",
    "إضافة المصروفات الغير مسترجعة بأنواعها",
    "إضافة إيرادات (المساهمات وشراء السلع)",
    "إضافة نوع إيراد جديد",
    "إضافة نوع مصروف جديد",
    "طباعة التقارير والجداول",
    "طباعة إيرادات عضو",
    "طباعة ملخص إيرادات عضو",
    "طباعة ملخص إيرادات عضو حسب المدة",
    "طباعة مصروفات حسب المدة",
    "إضافة بيانات سجل المساهمة في شراء سلعة",
    "إضافة بيانات أقساط شراء سلعة",
    "إضافة بيانات سجل المساهمة في الأسهم",
    "إضافة بيانات سجل المساهمة في صندوق استثماري",
    "إضافة بيانات المساهمة في شركة مالية",
    "إضافة إيرادات (اشتراكات الأعضاء)",
    "طباعة كامل المصروفات",
    "طباعة ملخص المصروفات",
    "طباعة مصروفات عضو",
    "طباعة إيرادات الأعضاء",
    "طباعة ملخص الإيرادات",
    "طباعة الإيرادات حسب المدة (بالشهر أو أكثر) مدة محددة",
    "إضافة نوع المصروف",
    "التعامل مع صفحة بنود واتفاقيات الصندوق",
    "التعامل مع صفحة شجرة العائلة",
];

const schemaAdminValidation = Joi.object({
    isAdmin: Joi.boolean(),
    userPermissions: Joi.array().items(
        Joi.string().valid(...UserPermissionEnum)
    )
})

const schemaSearchValidation = Joi.object({
    searchMethod: Joi.string().required().min(1).max(255),
    searchValue: Joi.string().required().min(1).max(255)
})

const schemaUpdateUserValidation = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(1024).required(),
    email: Joi.string().email().max(1024).required(),
    NationalIdentificationNumber: Joi.string()
        .pattern(/^[1-9]\d{9}$/)
        .required(),
    phoneNumber: Joi.string()
        .pattern(/^05\d{8}$/)
        .required(),
    status: Joi.string().valid("active", "not active").required(),
    comments: Joi.string().min(0).max(5000),
})

exports.schemaAdminValidation = schemaAdminValidation;
exports.schemaSearchValidation = schemaSearchValidation;
exports.schemaUpdateUserValidation = schemaUpdateUserValidation;
