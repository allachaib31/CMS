import React from 'react'

function Welcome() {
    return (
        <div className='w-full h-screen py-[2rem]'>
            <div className='container mx-auto'>
                <h1 className='text-[1.3rem] font-bold text-center'>مرحبا بك بمسابقة قبيلة بني حسين الرمضانية 1445هـ</h1>
                <h1 className='text-[1.2rem]  font-bold my-[1rem]'>قم باختيار احد الفروع للبدء </h1>
                <div className="overflow-y-auto">
                    <div className='h-[80vh] mt-[2rem] flex md:flex-row gap-[1rem] flex-wrap justify-center items-center'>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع تجريبي
                        </button>

                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع القران الكريم
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الثقافي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع التاريخي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الرياضي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الرياضي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الرياضي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الرياضي
                        </button>
                        <button className='btn h-auto backdrop-blur-xl bg-black/40 hover:bg-black transition-colors duration-300 cursor-pointer rounded-[14px] text-center w-full lg:w-[40%] text-[1rem] sm:text-[1.5rem] p-[4rem]'>
                            فرع الرياضي
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome