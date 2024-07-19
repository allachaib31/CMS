import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { addAgreementsFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';


function AddAgreements() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [editorData, setEditorData] = useState('');

    const editorConfiguration = {
        language: 'ar', // Set language to Arabic
        toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'undo', 'redo'
        ], // Customize the toolbar as needed
        contentsLangDirection: 'rtl', // Set text direction to RTL
    };

    const [showAlert, setShowAlert] = useState({
        display: false,
    });

    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addAgreementsFetch({
            text: editorData
        }).then((res) => {
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
                <Link to="/agreements" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج الاتفاقيات
            </h1>
            <form action="" className="py-[2rem] flex flex-col gap-[1rem]">
                {showAlert.display ? <Alert msg={showAlert} /> : ""}
                <CKEditor
                    plugins={{
                        padding: "20px"
                    }}
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={editorData}
                    onReady={editor => {
                        const editableElement = editor.ui.view.editable.element;
                        editableElement.classList.add('ck-content');
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                    }}
                />
                <button onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }} disabled={submit} className='btn btn-primary w-full font-bold'>
                    {submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}
                </button>
            </form>
        </div>
    )
}

export default AddAgreements;
