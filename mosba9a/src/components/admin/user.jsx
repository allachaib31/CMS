import React, { useEffect, useState } from 'react'
import Alert from '../alert/alert'
import { useNavigate } from 'react-router-dom';
import { activeUserFetch, deleteUsersFetch, getUsersFetch } from '../../utils/apiFetch';

function User() {
    const navigate = useNavigate();
    const [users, setUsers] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleDelete = (id, index) => {
        setShowAlert({
            display: false,
        });
        deleteUsersFetch(id).then((res) => {
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let arr = users;
            arr.splice(index, 1);
            setUsers(arr)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const handleSubmit = (id,index) => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        activeUserFetch({
            id
        }).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            let arr = users;
            arr[index].active = true;
            setUsers(arr);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    useEffect(() => {
        getUsersFetch().then((res) => {
            setUsers(res.data.users)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authAdmin");
            }
        })
    }, [])
    return (
        <div className='p-[2rem]'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            <div className="overflow-x-auto flex justify-center mt-[2rem]">
                <table className="bg-white text-black table w-[1000px]">
                    <thead>
                        <tr className="text-center text-black text-[1rem]">
                            <th>العدد</th>
                            <th>الاسم</th>
                            <th>الفخذ</th>
                            <th>بريد إلكتروني</th>
                            <th>رقم الهاتف</th>
                            <th>تفعيل</th>
                            <th>حدف</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-[1rem]">
                        {
                            users && users.map((user, index) => {
                                return (
                                    <tr>
                                        <th>{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.fakhidName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.active ? "مفعل" : <button onClick={() => {
                                            handleSubmit(user._id,index)
                                        }} className='btn btn-success'>
                                            تفعيل</button>}</td>
                                        <td><button onClick={() => {
                                            handleDelete(user._id, index)
                                        }} className='btn btn-error'>حدف</button></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User