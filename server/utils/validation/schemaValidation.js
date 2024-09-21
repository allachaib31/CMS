const Joi = require('joi');

const UserPermissionEnum = [
    "اضافة او حذف او تعديل عضو جديد",
    "اضافة او حذف او تعديل مسؤل جديد",
    "تفعيل اشتراك و ايقاف اشتراك عضو",
    "تغيير رقم الجوال",
    "إضافة أقساط قروض الأعضاء",
    "إضافة المصروفات المسترجعة بأنواعها",
    "إضافة المصروفات الغير مسترجعة بأنواعها",
    "إضافة نوع إيراد جديد",
    "إضافة نوع مصروف جديد",
    "إضافة إيرادات (شراء السلع)",
    "إدارة الإعلانات",
    "تعبئة عقد شراء سلعة وأقساطها",
    "إضافة إيرادات المساهمات في الأسهم",
    "إدارة التصويت",
    "طباعة القروض و أقساطها (كل الأعضاء أو عضو محدد)",
    "طباعة طلب شراء سلعة (بعد التعبئة)",
    "طباعة جدول أقساط سلعة (بعد التعبئة)",
    "طباعة سجل المساهمة في شراء السلع",
    "طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)",
    "إضافة بيانات شراء السلع وأقساطها",
    "إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)",
    "إضافة بيانات سجل المساهمة في صندوق استثماري",
    "إضافة بيانات المساهمة في شركة مالية",
    "إضافة إيرادات (اشتراكات الأعضاء)",
    "طباعة الإيرادات (كلي أو جزئي حسب المدة)",
    "طباعة إيرادات عضو (كلي أو جزئي حسب المدة) ",
    "طباعة مصروفات عضو (كلي أو جزئي حسب المدة)",
    "طباعة المصروفات الغير مسترجعة (كلي أو جزئي حسب المدة)",
    "طباعة المصروفات المسترجعة (كلي أو جزئي حسب المدة)",
    "طباعة سجل المساهمات بأنواعها",
    "طباعة عقد شراء سلعة و أقساطها (بعد التعبئة)",
    "طباعة سجل المساهمة في الصناديق الاستثمارية",
    "طباعة سجل المساهمة في الأسهم",
    "طباعة سجل المساهمة في شركة مالية",
    "التعامل مع صفحة بنود واتفاقيات الصندوق",
    "التعامل مع صفحة شجرة العائلة"
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
