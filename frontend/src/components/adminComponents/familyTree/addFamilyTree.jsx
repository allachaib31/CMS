import { faRightLong, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addNewRelationFetch, addToFamilyTreeFetch, createFamilyTreeFetch, deleteFamilyTreeFetch, getFamilyTreeFetch, getMemberFamilyTreeFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddFamilyTree() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [deleteSubmit, setDeleteSubmit] = useState(false);
    const fileInputRef = useRef(null);
    const [inputs, setInputs] = useState({
        nameTree: "",
    });
    const [addToFamily, setAddToFamily] = useState({
        idTree: "",
        nameTree: "",
        title: "",
        titleBgColor: "#000000",
        titleTextColor: "#FFFFFF",
        subtitles: [],
        sex: "M",
        badges: [],
        image: undefined,
    });
    const [familyRelations, setFamilyRelations] = useState({
        idTree: "",
        nameTree: "",
        relationType: "",
        prettyType: "",
        toId: "",
        fromId: "",
        isInnerFamily: false
    })
    const [memberFamilyTree, setMemberFamilyTree] = useState(false);
    const [familyTree, setFamilyTree] = useState(false);
    // const [updateFamilyTree, setUpdateFamilyTree] = useState(false);
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
    const handleFileClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAddToFamily((prevInput) => {
                return {
                    ...prevInput,
                    image: file
                }
            })
        }
    };
    const addNewSun = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        const form = new FormData();
        form.append("idTree", addToFamily.idTree);
        form.append("nameTree", addToFamily.nameTree);
        form.append("title", addToFamily.title);
        form.append("titleBgColor", addToFamily.titleBgColor);
        form.append("titleTextColor", addToFamily.titleTextColor);
        form.append("subtitles", addToFamily.subtitles);
        form.append("sex", addToFamily.sex);
        form.append("badges", addToFamily.badges);
        form.append("image", addToFamily.image);
        addToFamilyTreeFetch(form).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            //setUpdateFamilyTree(res.data.familyTree)
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
    const addNewRelation = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        addNewRelationFetch(familyRelations).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            //setUpdateFamilyTree(res.data.familyTree)
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
    /*function getAllNames(node, names = []) {
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
    }, [updateFamilyTree])*/
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
                            <div className='mb-[1rem] w-full md:w-1/2 flex justify-center items-center'>
                                <div className='bg-primary rounded-[14px] text-center w-full lg:w-[70%] text-white text-[1.1rem] sm:text-[1.5rem] p-[2rem] sm:p-[4rem]'>
                                    {tree.name}
                                    <div className='flex gap-[0.2rem] justify-center'>
                                        <button className='btn btn-success' onClick={() => {
                                            // setUpdateFamilyTree(tree)
                                            setAddToFamily((prev) => {
                                                return {
                                                    ...prev, idTree: tree._id, nameTree: tree.name
                                                }
                                            })
                                            document.getElementById('my_modal_2').showModal()
                                        }
                                        } >اضافة عضو</button>
                                        <button onClick={() => {
                                            // setUpdateFamilyTree(tree)
                                            setFamilyRelations((prev) => {
                                                return {
                                                    ...prev,
                                                    idTree: tree._id,
                                                    nameTree: tree.name
                                                }
                                            })
                                            getMemberFamilyTreeFetch(tree._id).then((res) => {
                                                console.log(res)
                                                setMemberFamilyTree(res.data.familyMember)
                                                document.getElementById('my_modal_3').showModal()
                                            }).catch((err) => {
                                                alert(err.response.data.msg)
                                            })
                                        }
                                        } className='btn btn-info'>اضافة علاقة</button>
                                    </div>
                                </div>
                            </div>
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
                        <form className='flex flex-col justify-center gap-[1rem]'>
                            <button disabled={deleteSubmit} onClick={() => {
                                //handleDelete(updateFamilyTree._id)
                            }} className='btn btn-error mb-1'>{deleteSubmit ? <span className="loading loading-ring loading-lg"></span> : "حذف شجرة العائلة"}</button>
                            <input type="text" className='formInput input input-bordered' disabled placeholder='شجرة عائلة' value={addToFamily.nameTree} required />
                            <input type="text" className='formInput input input-bordered' onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev,
                                        title: event.target.value
                                    }
                                })
                            }} id="title" name="title" placeholder=' الاسم الكامل:' required />
                            <div className='flex items-center gap-[1rem]'>
                                <label for="titleBgColor">لون خلفية الاسم:</label>
                                <input onChange={(event) => {
                                    setAddToFamily((prev) => {
                                        return {
                                            ...prev,
                                            titleBgColor: event.target.value
                                        }
                                    })
                                }} type="color" id="titleBgColor" name="titleBgColor" required />
                            </div>
                            <div className='flex items-center gap-[1rem]'>
                                <label for="titleTextColor">لون نص الاسم:</label>
                                <input type="color" id="titleTextColor" name="titleTextColor" onChange={(event) => {
                                    setAddToFamily((prev) => {
                                        return {
                                            ...prev,
                                            titleTextColor: event.target.value
                                        }
                                    })
                                }} value={addToFamily.titleTextColor} required />
                            </div>

                            <textarea id="subtitles" onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev,
                                        subtitles: event.target.value.split(",")
                                    }
                                })
                            }} className='input formInput input-bordered' name="subtitles" placeholder="أدخل التفاصيل الإضافية هنا" required></textarea>
                            <select onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev,
                                        sex: event.target.value
                                    }
                                })
                            }} className='input input-bordered' id="sex" name="sex" required>
                                <option value="M">ذكر</option>
                                <option value="F">أنثى</option>
                            </select>
                            <input className='input formInput input-bordered' onChange={(event) => {
                                setAddToFamily((prev) => {
                                    return {
                                        ...prev,
                                        badges: event.target.value.split(",")
                                    }
                                })
                            }} type="text" id="badges" name="badges" placeholder="أدخل الأوسمة، مفصولة بفواصل" />
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
                        </form>
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
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    {showAlert.display ? <Alert msg={showAlert} /> : ""}
                    {
                        <form className='flex flex-col justify-center gap-[1rem]'>
                            <input type="text" className='formInput input input-bordered' disabled placeholder='شجرة عائلة' value={familyRelations.nameTree} required />
                            <label for="relationType">نوع العلاقة:</label>
                            <select onChange={(event) => {
                                setFamilyRelations((prev) => {
                                    return {
                                        ...prev,
                                        relationType: event.target.value,
                                        prettyType: event.target.value,
                                    }
                                })
                            }} className='input input-bordered' id="relationType" name="relationType" required>
                                <option disabled selected>اختر نوع العلاقة</option>
                                <option value="Parent">والد</option>
                                <option value="Parent in law">والد الزوج</option>
                                <option value="Partner">شريك</option>
                                <option value="Child">طفل</option>
                                <option value="Sibling">أخ/أخت</option>
                                <option value="Nephew/niece">ابن أخ/ابنة أخت</option>
                                <option value="Cousin">ابن عم</option>
                                <option value="Uncle/aunt">عم/خالة</option>
                                <option value="Grandparent">الجد والجدة</option>
                                <option value="Grandchild">حفيد</option>
                            </select>

                            <label for="fromId">من:</label>
                            <select onChange={(event) => {
                                setFamilyRelations((prev) => {
                                    return {
                                        ...prev,
                                        fromId: event.target.value,
                                    }
                                })
                            }} className='input input-bordered' id="relationType" name="relationType" required>
                                <option disabled selected>اختر شخص</option>
                                {
                                    memberFamilyTree && memberFamilyTree.map((member) => {
                                        return (
                                            <option value={member.id}>{member.data.title} {member.id}</option>
                                        )
                                    })
                                }
                            </select>

                            <label for="toId">إلى:</label>
                            <select onChange={(event) => {
                                setFamilyRelations((prev) => {
                                    return {
                                        ...prev,
                                        toId: event.target.value,
                                    }
                                })
                            }} className='input input-bordered' id="relationType" name="relationType" required>
                                <option disabled selected>اختر شخص</option>
                                {
                                    memberFamilyTree && memberFamilyTree.map((member) => {
                                        return (
                                            <option value={member.id}>{member.data.title} {member.id}</option>
                                        )
                                    })
                                }
                            </select>

                        </form>

                    }
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">اغلاق</button>
                            <button onClick={(event) => {
                                event.preventDefault();
                                addNewRelation();
                            }} disabled={submit} className='btn btn-success'>{submit ? <span className="loading loading-ring loading-lg"></span> : "إضافة"}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddFamilyTree