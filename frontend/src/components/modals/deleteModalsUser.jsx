import React, {   useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteUserModals({user, setShowAlert, users, setUsers, deleteFetch}) {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const handleDelete = (id, index) => {
        setSubmit((e) => !e);
        deleteFetch(id).then((res) => {
            //const newListUser = [...users];
            //newListUser.splice(index, 1);
            //setUsers(newListUser);
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            })
            document.getElementById('deleteModel').close();
            document.getElementById(user.id).innerText = user.disable ?"تعطيل":"تنشيط" ;
            document.getElementById(user.id).setAttribute("data-disable",user.disable ? false : true);
        }).catch((err) => {
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
                <h3 className="font-bold text-[1rem]">هل تريد حقًا {user.disable ? "تنشيط": "تعطيل" } هذا المستخدم {user.id}؟</h3>
                <div className="flex justify-center my-[1rem]">
                    {!submit ? "" : <span className="loading loading-ring loading-lg"></span>}
                </div>
                {/* <p className="py-4">Press ESC key or click the button below to close</p>*/}
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn ml-[0.5rem]">أغلق</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            handleDelete(user.id,user.index);
                        }} className="btn btn-error">{user.disable ?"تنشيط": "تعطيل" }</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}

export default DeleteUserModals;
