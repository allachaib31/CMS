import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToFamilyTreeFetch, createFamilyTreeFetch, deleteFamilyTreeFetch, getFamilyTreeFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddFamilyTree() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [deleteSubmit, setDeleteSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        nameTree: "",
        name: ""
    });
    const [addToFamily, setAddToFamily] = useState({
        idTree: "",
        valueName: "",
        nameSun: "",
    });
    const [familyTree, setFamilyTree] = useState(false);
    const [updateFamilyTree, setUpdateFamilyTree] = useState(false);
    const [names, setNames] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const handleDelete = (id) => {
        setShowAlert({
            display: false,
        });
        setDeleteSubmit((e) => !e);
        deleteFamilyTreeFetch(id).then((res) => {
            setDeleteSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            getFamilyTree();
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
            setDeleteSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: false,
                text: err.response.data.msg
            });
        })
    }
    const createNewTree = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        createFamilyTreeFetch(inputs).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setFamilyTree((prevTree) => {
                return [res.data.familyTree, ...prevTree]
            })
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
    const addNewSun = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addToFamilyTreeFetch(addToFamily).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            setUpdateFamilyTree(res.data.familyTree)
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
    const getFamilyTree = () => {
        getFamilyTreeFetch().then((res) => {
            console.log(res)
            setFamilyTree(res.data.familyTree);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }
    useEffect(() => {
        getFamilyTree();
    }, [])
    function getAllNames(node, names = []) {
        if (node.name) {
            names.push({ name: node.name, value: node.value });
        }
        if (node.children) {
            node.children.forEach(child => getAllNames(child, names));
        }
        console.log(names)
        return names;
    }
    useEffect(() => {
        if (updateFamilyTree != false) {
            setNames(getAllNames(updateFamilyTree.familyTree));
        }
    }, [updateFamilyTree])
    return (
        <div className="sm:p-0 px-[1rem] container mx-auto">
            <div>
                <Link to="/familyTree" className="btn btn-primary text-[2rem] px-[2rem]">
                    <FontAwesomeIcon icon={faRightLong} />
                </Link>
            </div>
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                نموذج شجرة العائلة
            </h1>
            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='btn btn-primary'>انشاء شجرة عائلة جديدة</button>
            <div className='mt-[2rem] flex md:flex-row flex-col flex-wrap justify-center items-center'>
                {
                    familyTree && familyTree.map((tree) => {
                        return (
                            <button onClick={() => {
                                setUpdateFamilyTree(tree)
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev, idTree: tree._id, valueName: tree.familyTree.value
                                    }
                                })
                                document.getElementById('my_modal_2').showModal()
                            }
                            } className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
                                <div className='bg-primary rounded-[14px] text-center w-full lg:w-[70%] text-white text-[1.5rem] p-[4rem]'>
                                    {tree.name}
                                </div>
                            </button>
                        )
                    })
                }
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    <input type="text" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                nameTree: event.target.value,
                            }
                        })
                    }} placeholder="اسم شجرة العائلة" required className="formInput input input-bordered w-full mb-[1rem]" />
                    <input type="text" onChange={(event) => {
                        setInputs((prevInput) => {
                            return {
                                ...prevInput,
                                name: event.target.value,
                            }
                        })
                    }} placeholder="اسم الجد الاكبر" required className="formInput input input-bordered w-full " />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                createNewTree();
                            }} disabled={submit} className='btn btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    {
                        updateFamilyTree && <>
                            <button disabled={deleteSubmit} onClick={() => {
                                handleDelete(updateFamilyTree._id)
                            }} className='btn btn-error mb-1'>{deleteSubmit ? <span className="loading loading-ring loading-lg"></span> : "حذف شجرة العائلة"}</button>
                            <input type="text" disabled value={updateFamilyTree.name} placeholder="اسم شجرة العائلة" required className="formInput input input-bordered w-full mb-[1rem]" />
                            <select onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev, valueName: event.target.value
                                    }
                                })
                            }} className="select select-bordered w-full">
                                {
                                    names && names.map((name) => {
                                        return (<option value={name.value}>{name.name}</option>)
                                    })
                                }
                            </select>
                            <input type="text" onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev,
                                        nameSun: event.target.value,
                                    }
                                })
                            }} placeholder="اسم الابن" required className="formInput input input-bordered w-full " />
                        </>
                    }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                addNewSun();
                            }} disabled={submit} className='btn btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddFamilyTree