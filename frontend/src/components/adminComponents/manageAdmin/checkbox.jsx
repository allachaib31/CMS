import React from 'react'

function Checkbox({inputs, setInputs}) {
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (value === "الكل") {
            const checkInput = document.querySelectorAll(".checkbox");
            if (checked) {
                const allPermissions = [
                    "اضافة او حذف او تعديل عضو جديد",
                    "اضافة او حذف او تعديل مسؤل جديد",
                    "تفعيل اشتراك و ايقاف اشتراك عضو",
                    "تغيير رقم الجوال",
                    "إضافة أقساط قروض الأعضاء",
                    "إضافة البيانات الأولية لشراء سلعة",
                    "إضافة إيرادات (المساهمات وشراء السلع",
                    "إضافة المصروفات المسترجعة بأنواعها",
                    "إضافة المصروفات الغير مسترجعة بأنواعها",
                    "إضافة نوع إيراد جديد",
                    "إضافة نوع مصروف جديد",
                    "طباعة التقارير والجداول",
                    "إضافة إيرادات (المساهمات وشراء السلع)",
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
                    "التعامل مع صفحة شجرة العائلة"];
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    UserPermission: allPermissions,
                }));
                checkInput.forEach((input) => {
                    input.checked = true;
                })
            } else {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    UserPermission: [],
                }));
                checkInput.forEach((input) => {
                    input.checked = false;
                })
            }
        } else {
            if (checked) {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    UserPermission: [...prevInputs.UserPermission, value],
                }));
            } else {
                setInputs((prevInputs) => ({
                    ...prevInputs,
                    UserPermission: prevInputs.UserPermission.filter(
                        (permission) => permission !== value
                    ),
                }));
            }
        }
    };
    return (
        <div>
            <label className="text-[1.3rem]">الصلاحيات</label>
            <div>
                <div className="flex-row form-control">
                    <label className="label gap-[1rem] cursor-pointer">
                        <input type="checkbox" value="الكل"
                            onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                        <span className="label-text text-[1.3rem]">الكل</span>
                    </label>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="اضافة او حذف او تعديل عضو جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">اضافة او حذف او تعديل عضو جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="اضافة او حذف او تعديل مسؤل جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">اضافة او حذف او تعديل مسؤل جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات سجل المساهمة في شراء سلعة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]"> إضافة بيانات سجل المساهمة في شراء سلعة </span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="تفعيل اشتراك و ايقاف اشتراك عضو" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">تفعيل اشتراك و ايقاف اشتراك عضو</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات أقساط شراء سلعة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات أقساط شراء سلعة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات سجل المساهمة في الأسهم" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات سجل المساهمة في الأسهم</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات سجل المساهمة في صندوق استثماري" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات سجل المساهمة في صندوق استثماري</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة أقساط قروض الأعضاء" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة أقساط قروض الأعضاء</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات المساهمة في شركة مالية" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات المساهمة في شركة مالية</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة البيانات الأولية لشراء سلعة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة البيانات الأولية لشراء سلعة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة إيرادات (اشتراكات الأعضاء)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة إيرادات (اشتراكات الأعضاء)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة إيرادات (المساهمات وشراء السلع)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة إيرادات (المساهمات وشراء السلع)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة كامل المصروفات" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة كامل المصروفات</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة المصروفات المسترجعة بأنواعها" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة المصروفات المسترجعة بأنواعها</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة ملخص المصروفات" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة ملخص المصروفات</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة المصروفات الغير مسترجعة بأنواعها" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة المصروفات الغير مسترجعة بأنواعها</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة مصروفات عضو" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة مصروفات عضو</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة نوع إيراد جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة نوع إيراد جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة إيرادات الأعضاء" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة إيرادات الأعضاء</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة نوع مصروف جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة نوع مصروف جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة ملخص الإيرادات" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة ملخص الإيرادات</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة التقارير والجداول" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة التقارير والجداول</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة الإيرادات حسب المدة (بالشهر أو أكثر) مدة محددة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]"> طباعة الإيرادات حسب المدة (بالشهر أو أكثر) مدة محددة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة إيرادات عضو" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة إيرادات عضو</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة ملخص إيرادات عضو" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة ملخص إيرادات عضو</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة نوع المصروف" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة نوع المصروف</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة ملخص إيرادات عضو حسب المدة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة ملخص إيرادات عضو حسب المدة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="التعامل مع صفحة بنود واتفاقيات الصندوق" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">التعامل مع صفحة بنود واتفاقيات الصندوق</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة مصروفات حسب المدة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة مصروفات حسب المدة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="التعامل مع صفحة شجرة العائلة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">التعامل مع صفحة شجرة العائلة</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkbox;