import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import backgroundIslamic from "../images/backgroundIslamic.png"
import mosque from "../images/mosque.png"
import quran from "../images/quran.png"
import { Link, useNavigate } from 'react-router-dom'
import { validationUserFetch } from '../utils/apiFetch'
import Loading from './loading/loading'
function LandingPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        validationUserFetch().then((res) => {
            navigate("/home");
        }).catch((err) => {
            setLoading((e) => !e)
        })
    }, []);
    return (
        <div>
            {loading ? <Loading /> : <>
                <div
                    className="hero items-start sm:min-h-screen"
                    style={{
                        backgroundImage: `url(${backgroundIslamic})`,
                    }}>
                    <div className="navbar z-[999]">
                        <div className="navbar-start">
                            <Link to="/auth" className="btn btn-primary font-bold w-36">تسجيل الدخول</Link>
                        </div>
                        <div className="navbar-end">
                            <img src={logo} alt="" className='w-[140px] h-[100px]' />
                        </div>
                    </div>
                    <div className='flex items-center justify-around w-full h-[70vh] sm:h-screen'>
                        <div className='h-full flex flex-col justify-center'>
                            <h1 className='px-[0.5rem] font-bold text-[16px] sm:text-[25px] md:text-[30px] mb-[2rem]'>
                                انضموا إلينا في مسابقات رمضان الشيقة واكتشفوا <br /> متعة المنافسة والجوائز القيمة!
                            </h1>
                            <Link to="/signUp" className='mx-[0.5rem] btn btn-primary font-bold sm:text-[20px] sm:w-[20rem] h-auto btn-md'>المشاركة في المسابقة</Link>
                        </div>
                        <div className='hidden min-h-screen xl:grid content-end'>
                            <img src={mosque} alt="" className=' w-[600px] h-[400px] xxl:w-[750px] xxl:h-[550px]' />
                        </div>
                    </div>
                </div>
                <div className="sm:min-h-screen py-[1rem] sm:py-[4rem]">
                    <div className="flex flex-col lg:flex-row items-center justify-around">
                        <img
                            src={quran}
                            className='xxl:w-[707px] xxl:h-[707px] sm:w-[507px] sm:h-[507px] w-[307px] h-[307px]'
                        />
                        <div>
                            <h1 className="text-3xl lg:text-5xl font-bold px-[0.5rem]">مسابقة رمضان</h1>
                            <p className="py-3 sm:py-6 px-[0.5rem]">
                                وجهتكم المثالية للمسابقات الرمضانية المثيرة!
                                انغمسوا في تحديات ممتعة لتعزيز تجربتكم في رمضان.
                            </p>
                            <p className='px-[0.5rem]'>شاركوا في مجموعة متنوعة من المسابقات، من تلاوة القرآن إلى المسابقات
                                الثقافية الإسلامية، واحصلوا على فرصة الفوز بجوائز رائعة.</p>
                        </div>
                    </div>
                </div></>}
        </div>
    )
}

export default LandingPage