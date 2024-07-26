import { faMicrophone, faRightLong, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom'
import { addAdvertisingFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddAd() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const fileInputRef = useRef(null);
    const [inputs, setInputs] = useState({
        text: "",
        endDate: "",
        image: ""
    });
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const editorConfiguration = {
        language: 'ar',  // Set language to Arabic
        toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'undo', 'redo'
        ], // Customize the toolbar as needed
        contentsLangDirection: 'rtl', // Set text direction to RTL
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setInputs((prevInput) => {
                return {
                    ...prevInput,
                    image: file
                }
            })
        }
    };
    const handleSubmit = () => {
        console.log(inputs)
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        const form = new FormData();
        form.append("text", inputs.text);
        form.append("endDate", inputs.endDate);
        form.append("image", inputs.image);
        addAdvertisingFetch(form).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    return (
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <div>
                <Link to="/manageAdvertising" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج الاعلانات
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={inputs.text}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                text: data
                            }
                        });
                    }}
                />
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ نهاية الاعلان</h1>
                    <input type="date" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                endDate: event.target.value
                            }
                        })
                    }} required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <button className='btn btn-info max-w-sm' type="button" onClick={handleFileClick}>
                    <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/png, image/gif, image/jpeg"
                />
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn btn-primary w-full  font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
            </form>
        </div>
    )
}

export default AddAd