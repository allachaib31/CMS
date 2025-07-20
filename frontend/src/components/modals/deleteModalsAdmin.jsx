import React, { useState } from "react";
import { deleteUserFetch } from "../../utils/apiFetch";
import { useNavigate } from "react-router-dom";

function DeleteAdminModals({user, setShowAlert, users, setUsers, deleteFetch}) {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const handleDelete = (id, index) => {
        setSubmit((e) => !e);
        deleteFetch(id).then((res) => {
            const newListUser = [...users];
            newListUser.splice(index, 1);
            setUsers(newListUser);
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            })
            document.getElementById('deleteModel').close();
        }).catch((err) => {
            console.log(err)
            setSubmit((e) => !e)
            document.getElementById('deleteModel').close();
            if (err.response.status == 403 || err.response.status == 404) {
                setShowAlert({
                    display: true,
                    status: false,
                    text: err.response.data.msg
                });
                return
            }else if(err.response.status == 401){
                navigate("/auth");
            }
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
            return
        })
    }
    return (
        <dialog id="deleteModel" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-sm">  
هل تريد حقاً إزالة المستخدم:
{user.name}- من قائمة المسؤولين؟ </h3>
                <div className="flex justify-center my-[1rem]">
                    {!submit ? "" : <span className="loading loading-ring loading-lg"></span>}
                </div>
                {/* <p className="py-4">Press ESC key or click the button below to close</p>*/}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm ml-[0.5rem]">لا</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            handleDelete(user.id,user.index);
                        }} className="btn btn-sm btn-error">نعم</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default DeleteAdminModals;