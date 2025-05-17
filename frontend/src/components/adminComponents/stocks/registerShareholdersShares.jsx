import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { hijriDateObject } from '../../../utils/getHijriDate';
import { getIdStockFetch, getRegisterShareholdersSharesFetch } from '../../../utils/apiFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

function RegisterShareholdersShares() {
    const navigate = useNavigate();
    const [date, setDate] = useState(hijriDateObject());
    const [yearOptions, setYearOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState({
        month: date[1].number,
        year: date[2],
    });
    const [id, setId] = useState("");
    const [idList, setIdList] = useState([]);
    const [userStock, setUserStock] = useState(false);
    const generateYear = () => {
        const years = [];
        for (let i = 1415; i <= inputs.year; i++) {
            years.push(i);
        }
        setYearOptions(years);
    };
    useEffect(() => {
        getIdStockFetch(inputs).then((res) => {
            setIdList(res.data.stock);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [inputs])
    const handleSearch = () => {
        setLoading((e) => !e)
        getRegisterShareholdersSharesFetch(id).then((res) => {
            setLoading((e) => !e)
            setUserStock(res.data.userStock)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setLoading((e) => !e);
        })
    }
    useEffect(() => {
        generateYear();
    }, []);
    return (
        <div className="sm:p-0 px-[1rem]">
            <div className='sm:container sm:mx-auto'>
                <div>
                    <Link to="/stocks" className="btn btn-sm btn-primary px-[2rem]">
                        <FontAwesomeIcon icon={faRightLong} />
                    </Link>
                </div>
                <h1 className="text-center text-sm font-bold py-[1rem]">
                    سجل المساهمين في الأسهم
                </h1>
                <div className="md:join ">
                    <select onChange={(event) => {
                        setInputs((prevInput) => {
                            return { ...prevInput, year: event.target.value }
                        });
                    }} className="select select-sm xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                        {yearOptions.map((value) => (
                            <option key={value} value={value} selected={inputs.year == value}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <select onChange={(event) => {
                        setInputs((prevInput) => {
                            return { ...prevInput, month: event.target.value }
                        });
                    }} className="select select-sm xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                        <option value="1" selected={"1" == inputs.month}>محرم</option>
                        <option value="2" selected={"2" == inputs.month}>صفر</option>
                        <option value="3" selected={"3" == inputs.month}>ربيع الاول</option>
                        <option value="4" selected={"4" == inputs.month}>ربيع الثاني</option>
                        <option value="5" selected={"5" == inputs.month}>جمادى الاول</option>
                        <option value="6" selected={"6" == inputs.month}>جمادى الثاني</option>
                        <option value="7" selected={"7" == inputs.month}>رجب</option>
                        <option value="8" selected={"8" == inputs.month}>شعبان</option>
                        <option value="9" selected={"9" == inputs.month}>رمضان</option>
                        <option value="10" selected={"10" == inputs.month}>شوال</option>
                        <option value="11" selected={"11" == inputs.month}>ذو القعدة</option>
                        <option value="12" selected={"12" == inputs.month}>ذو الحجة</option>
                    </select>
                    <select onChange={(event) => {
                        setId(event.target.value);
                    }} className="select select-sm w-[7rem] xs:mt-0 mt-[1rem] pl-[2rem] pr-[1.5rem] select-bordered join-item">
                        <option selected disabled>قم باختيار العدد الخاص بالاسهم</option>
                        {idList && idList.map((list) => (
                            <option value={list._id}>{list.id}</option>
                        ))}
                    </select>
                    <div className="indicator">
                        <button onClick={handleSearch} className="btn btn-sm btn-primary join-item  md:mt-[0rem] mt-[1rem]">ابحث</button>
                    </div>
                </div>
            </div>
            {
                !loading ? <div className="flex justify-center">
                    {" "}
                    <span className=" loading loading-ring loading-lg"></span>
                </div> : <div className="overflow-x-auto mt-[0.5rem]">
                    {userStock && <table className="text-xs table table-xs border-separate border-spacing-2 border w-[450px] sm:w-[550px]  mx-auto">
                        <tr className='text-xs'>
                            <th className="border text-center border-slate-600" >
                                رقم المساهمة
                            </th>
                            <th className="border text-center border-slate-600" >
                                اسم العضو
                            </th>
                            <th className="border text-center border-slate-600" >
                                نسبة المساهمة
                            </th>
                            <th className="border text-center border-slate-600" >
                                مبلغ المساهمة
                            </th>
                            <th className="border text-center border-slate-600" >
                                مبلغ الربح
                            </th>
                        </tr>
                        <tbody>
                            {
                                userStock && userStock.map((user) => {
                                    return (
                                        <tr className='text-xs'>
                                            <td className="border text-center border-slate-600">{user.idStock.id}</td>
                                            <td className="border text-center border-slate-600">{user.idUser.name}</td>
                                            <td className="border text-center border-slate-600">{user.contributionRate.toFixed(2)}%</td>
                                            <td className="border text-center border-slate-600">{user.contributionAmount.toFixed(2)}</td>
                                            <td className="border text-center border-slate-600">{user.amount.toFixed(2)}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>}
                </div>
            }
        </div>
    )
}

export default RegisterShareholdersShares