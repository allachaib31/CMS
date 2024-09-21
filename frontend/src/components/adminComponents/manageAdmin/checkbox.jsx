import React from 'react'

function Checkbox({inputs, setInputs}) {
    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if(value == "إضافة إيرادات (اشتراكات الأعضاء)") return;
        if (value === "الكل") {
            const checkInput = document.querySelectorAll(".checkbox");
            if (checked) {
                const allPermissions = [
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
                    UserPermission: ["إضافة إيرادات (اشتراكات الأعضاء)"],
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
                            <span className="label-text text-[1.3rem]">إضافة بيانات الأعضاء الجدد أو الحذف أو التعديل</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="اضافة او حذف او تعديل مسؤل جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة أو حذف أو تعديل مسؤول جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="تفعيل اشتراك و ايقاف اشتراك عضو" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">تفعيل و إيقاف إشتراك عضو</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات شراء السلع وأقساطها" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات (شراء السلع)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة إيرادات (شراء السلع)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة إيرادات (شراء السلع)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة بيانات المساهمات (أسهم، صندوق استثماري، شركة مالية، أخرى)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات المساهمات في الأسهم</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة إيرادات المساهمات في الأسهم" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة إيرادات المساهمات في الأسهم</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة أقساط قروض الأعضاء" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة بيانات القروض </span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" checked={true} value="إضافة إيرادات (اشتراكات الأعضاء)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة إيرادات (اشتراكات الأعضاء)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إضافة المصروفات الغير مسترجعة بأنواعها" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة المصروفات  </span>
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
                            <input type="checkbox" value="إضافة نوع مصروف جديد" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إضافة نوع مصروف جديد</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="التعامل مع صفحة شجرة العائلة" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إدارة شجرة العائلة</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="التعامل مع صفحة بنود واتفاقيات الصندوق" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إدارة اتفاقيات الصندوق</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إدارة التصويت" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إدارة التصويت</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="إدارة الإعلانات" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">إدارة الإعلانات</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة إيرادات عضو (كلي أو جزئي حسب المدة) " onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة إيرادات عضو (كلي أو جزئي حسب المدة) </span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة الإيرادات (كلي أو جزئي حسب المدة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة الإيرادات (كلي أو جزئي حسب المدة)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة سجل الاشتراكات (سنوي ، شهري ، أو مدة محددة)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة مصروفات عضو (كلي أو جزئي حسب المدة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة مصروفات عضو (كلي أو جزئي حسب المدة)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة القروض و أقساطها (كل الأعضاء أو عضو محدد)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة القروض و أقساطها (كل الأعضاء أو عضو محدد)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة سجل المساهمة في شراء السلع" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة سجل المساهمة في شراء السلع</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة طلب شراء سلعة (بعد التعبئة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة طلب شراء سلعة (بعد التعبئة)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة سجل المساهمة في الأسهم" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة سجل المساهمة في الأسهم</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة عقد شراء سلعة و أقساطها (بعد التعبئة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة عقد شراء سلعة و أقساطها (بعد التعبئة)</span>
                        </label>
                    </div>
                    <div className="w-full sm:w-1/2 flex-row form-control">
                        <label className="label gap-[1rem] cursor-pointer">
                            <input type="checkbox" value="طباعة المصروفات الغير مسترجعة (كلي أو جزئي حسب المدة)" onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            <span className="label-text text-[1.3rem]">طباعة المصروفات   (كلي أو جزئي حسب المدة)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkbox;