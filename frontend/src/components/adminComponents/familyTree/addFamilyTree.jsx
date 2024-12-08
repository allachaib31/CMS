import { faRightLong, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addNewRelationFetch, addToFamilyTreeFetch, createFamilyTreeFetch, deleteFamilyTreeFetch, getFamilyTreeFetch, getFamilyTreeUseIdFetch, getMemberFamilyTreeFetch } from '../../../utils/apiFetch';
import Alert from '../../alert/alert';

function AddFamilyTree() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const [deleteSubmit, setDeleteSubmit] = useState(false);
    const fileInputRef = useRef(null);
    const [inputs, setInputs] = useState({
        nameTree: "",
    });
    const [idTree, setIdTree] = useState("");
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
    const [family, setFamily] = useState([]);
    const [relations, setRelations] = useState([]);
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
            getFamilyTreeUseIdFetch(idTree).then((res) => {
                setFamily(res.data.familyMembers);
                setRelations(res.data.familyRelations);
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
            getFamilyTreeUseIdFetch(idTree).then((res) => {
                setFamily(res.data.familyMembers);
                setRelations(res.data.familyRelations);
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
    useEffect(() => {
        if (idTree !== "") {
            getFamilyTreeUseIdFetch(idTree).then((res) => {
                setFamily(res.data.familyMembers);
                setRelations(res.data.familyRelations);
            });
        }
    }, [idTree]);
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
            <div className='my-[2rem]'>
                <select onChange={(event) => {
                    let obj = JSON.parse(event.target.value);
                    setIdTree(obj._id)
                    setAddToFamily((prev) => {
                        return {
                            ...prev, idTree: obj._id, nameTree: obj.name
                        }
                    })
                    setFamilyRelations((prev) => {
                        return {
                            ...prev,
                            idTree: obj._id,
                            nameTree: obj.name
                        }
                    })
                }} className="select select-bordered w-full max-w-xs">
                    <option selected disabled>اختر العائلة</option>
                    {
                        familyTree && familyTree.map((tree) => {
                            return (
                                <option value={JSON.stringify(tree)}>{tree.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className='btn btn-success' onClick={() => {
                // setUpdateFamilyTree(tree)
                document.getElementById('my_modal_2').showModal()
            }
            } >اضافة عضو</button>
            <button onClick={() => {
                // setUpdateFamilyTree(tree)
                getMemberFamilyTreeFetch(familyRelations.idTree).then((res) => {
                    setMemberFamilyTree(res.data.familyMember)
                    document.getElementById('my_modal_3').showModal()
                }).catch((err) => {
                    alert(err.response.data.msg)
                })
            }
            } className='btn btn-info'>اضافة علاقة</button>
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
                                handleDelete(addToFamily.idTree)
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
                                            <option value={member.id}>{member.data.title}</option>
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
                                            <option value={member.id}>{member.data.title}</option>
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
            <div role="tablist" className="mt-[1rem] tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="الاعضاء" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>المعرف</th>
                                    <th>الاسم</th>
                                    <th>وصف</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    family && family.map((member) => {
                                        return (
                                            <tr>
                                                <th>{member.id}</th>
                                                <th>{member.data.title}</th>
                                                <th>{member.data.subtitles.join(",")}</th>
                                                <th><button className='btn btn-error'>حذف</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="العلاقات"
                    defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>من</th>
                                    <th>الى</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    relations && relations.map((relation) => {
                                        return (
                                            <tr>
                                                <th>{relation.fromId}</th>
                                                <th>{relation.toId}</th>
                                                <th><button className='btn btn-error'>حذف</button></th>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddFamilyTree