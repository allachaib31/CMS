import { faMicrophone, faRightLong, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom'

function AddAd() {
    const [submit, setSubmit] = useState(false);
    const fileInputRef = useRef(null);
    const [editorData, setEditorData] = useState('');
    const handleFileClick = () => {
      fileInputRef.current.click();
    };
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
     /* const file = event.target.files[0];
      if (file) {
        onFileSelect(file);
      }*/
    };
    const handleSubmit = () => {}
    useEffect(() => {
        console.log(editorData)
    },[editorData])
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
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />
                <div className="relative sm:w-full">
                    <FontAwesomeIcon icon={faMicrophone} className="absolute top-[1rem] right-[1rem]" />
                    <input type="text" required className="formInput w-full input pr-[2.3rem] input-bordered flex items-center gap-2" placeholder={`موضوع الاعلان`} />
                </div>
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ بداية الاعلان</h1>
                    <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <div className='flex gap-[1rem] items-center'>
                    <h1>تاريخ نهاية الاعلان</h1>
                    <input type="date" required className="formInput input pr-[2.3rem] input-bordered flex items-center gap-2" />
                </div>
                <button className='btn btn-info max-w-sm' type="button" onClick={handleFileClick}>
                    <FontAwesomeIcon icon={faUpload} /> تحميل صورة
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
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