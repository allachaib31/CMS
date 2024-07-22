import React, { useState, useEffect } from 'react';

function Contest() {
    const [counter, setCounter] = useState(60); // Set initial countdown value in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => prevCounter > 0 ? prevCounter - 1 : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(counter / (60 * 60 * 24));
    const hours = Math.floor((counter % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((counter % (60 * 60)) / 60);
    const seconds = counter % 60;

    return (
        <div className='px-[1rem] sm:px-0 py-[2rem]'>
            <div className='container mx-auto'>
                <div className="justify-center grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": seconds }}></span>
                        </span>
                        ثانية
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": minutes }}></span>
                        </span>
                        دقيقة
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": hours }}></span>
                        </span>
                        ساعات
                    </div>
                    <div className="flex flex-col">
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": days }}></span>
                        </span>
                        أيام
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contest;
