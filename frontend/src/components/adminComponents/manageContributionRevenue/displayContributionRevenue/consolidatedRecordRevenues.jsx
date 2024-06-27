import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function ConsolidatedRecordRevenues() {
    return (
        <div className="sm:p-0 px-[1rem]">
            <div>
                <Link to="/contributionRevenue/" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">سجل الموحد للإيرادات</h1>
            <div className="mt-[1rem] flex flex-wrap gap-[1rem] justify-center">
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي الايرادات</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي الاشتراكات</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي ايراد السلع</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي ايرادات المساهمات</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">اجمالي ايرادات القروض</h1>
                    <h1 className="text-[1.1rem] font-bold bg-primary text-white rounded-[1rem] py-[0.7rem] px-[1.3rem]">11500</h1>
                </div>
            </div>
            <div className="overflow-x-auto mt-[1rem]">
                <table className="text-[1rem] table border-separate border-spacing-2 border w-[1500px] mx-auto">
                    <thead className="text-center text-[1rem]">
                        <tr>
                            <th className="border border-slate-600" rowSpan={2}>
                                نوع الايراد
                            </th>
                            <th className="border border-slate-600" rowSpan={2}>
                                المبلغ
                            </th>
                            <th className="text-center border border-slate-600" colSpan={2}>
                                تاريخ الايداع
                            </th>
                            <th className="text-center border border-slate-600">
                                الملاحظات
                            </th>
                            <th className="text-center border border-slate-600">
                                تفاصيل اكثر
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <th className="border border-slate-600">الاشتراكات</th>
                            <td className="border border-slate-600">100</td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus magnam reiciendis excepturi itaque dignissimos perferendis architecto necessitatibus expedita! Magni quas autem cum, ut ullam provident suscipit repudiandae harum. Sit.
                            </td>
                            <td className="border border-slate-600">
                            <button className='btn btn-info'>التفاصيل</button>
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-slate-600">ايرادات السلع</th>
                            <td className="border border-slate-600">100</td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus magnam reiciendis excepturi itaque dignissimos perferendis architecto necessitatibus expedita! Magni quas autem cum, ut ullam provident suscipit repudiandae harum. Sit.
                            </td>
                            <td className="border border-slate-600">
                            <button className='btn btn-info'>التفاصيل</button>
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-slate-600">ايرادات المساهمات</th>
                            <td className="border border-slate-600">100</td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus magnam reiciendis excepturi itaque dignissimos perferendis architecto necessitatibus expedita! Magni quas autem cum, ut ullam provident suscipit repudiandae harum. Sit.
                            </td>
                            <td className="border border-slate-600">
                            <button className='btn btn-info'>التفاصيل</button>
                            </td>
                        </tr>
                        <tr>
                            <th className="border border-slate-600">ايرادات القروض</th>
                            <td className="border border-slate-600">100</td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                04/12/2024
                            </td>
                            <td className="border border-slate-600">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt temporibus magnam reiciendis excepturi itaque dignissimos perferendis architecto necessitatibus expedita! Magni quas autem cum, ut ullam provident suscipit repudiandae harum. Sit.
                            </td>
                            <td className="border border-slate-600">
                            <button className='btn btn-info'>التفاصيل</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ConsolidatedRecordRevenues