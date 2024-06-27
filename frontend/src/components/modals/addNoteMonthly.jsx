import React, { useState } from 'react'
import { addCommentMonthlyFetch } from '../../utils/apiFetch';
import { useNavigate } from 'react-router-dom';

function AddNoteMonthly({ comment, setComment }) {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const handleSubmit = () => {
        setSubmit((e) => !e);
        addCommentMonthlyFetch(comment).then((res) => {
            setSubmit((e) => !e);
            document.getElementById(comment._id).innerText = comment.comment;
            document.getElementById('addNote').close();
        }).catch((err) => {
            setSubmit((e) => !e)
            document.getElementById('addNote').close();
            if(err.response.status == 401){
                navigate("/auth");
            }
        })
    }
  return (
    <dialog id="addNote" className="modal">
    <div className="modal-box">
        <h3 className="font-bold text-lg">اضف ملاحظة لي {comment._id}</h3>
        <textarea onChange={(event) => {
            return setComment((prevComment) => {
                return { ...prevComment, comment: event.target.value }
            })
        }} className="textarea textarea-bordered resize-none w-full mt-[1rem]" placeholder="أكتب هنا"></textarea>
        <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className='btn btn-primary h-auto' onClick={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}>{!submit ? "ارسال" : <span className="loading loading-ring loading-lg"></span>}</button>
                <button className="btn">اغلاق</button>
            </form>
        </div>
    </div>
</dialog>
  )
}

export default AddNoteMonthly