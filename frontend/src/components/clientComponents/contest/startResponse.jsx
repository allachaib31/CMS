import React, { useEffect, useState } from 'react';
import { getQuestionsCompetitionFetch, saveResponseFetch } from '../../../utils/apiFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './dragItem';
import DropZone from './dropZone';
import Alert from '../../alert/alert';

function StartResponse() {
    const navigate = useNavigate();
    const location = useLocation();
    const [submit, setSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState({
        display: false,
    });
    const queryParams = new URLSearchParams(location.search);
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [inputs, setInputs] = useState([]);

    const handleSubmit = () => {
        setShowAlert({
            display: false,
        });
        setSubmit((e) => !e);
        saveResponseFetch({
            response: [...inputs],
            idContest: queryParams.get("id"),
            idBranche: queryParams.get("idBranche")
        }).then((res) => {
            setSubmit((e) => !e);
            setShowAlert({
                display: true,
                status: true,
                text: res.data.msg
            });
            navigate("/client/contestStart/userResult?id=" + res.data.id)
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
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
        getQuestionsCompetitionFetch(queryParams.get("id"),queryParams.get("idBranche")).then((res) => {
            const shuffledData = res.data.results.map((result) => {
                if (result.typeQuestion === "عادي") {
                    return {
                        ...result,
                        _doc: {
                            ...result._doc,
                            shuffledResponses: shuffleArray(result._doc.responses)
                        }
                    };
                } else if (result.typeQuestion === "سحب") {
                    return {
                        ...result,
                        _doc: {
                            ...result._doc,
                            combinedResponses: shuffleArray([...result._doc.responses, ...result._doc.falseResponse])
                        }
                    };
                }
                return result;
            });
            setData(shuffledData);
            const initialInputs = shuffledData.map((result) => ({
                idQuestion: result._doc._id,
                question: result._doc.question,
                typeQuestion: result.typeQuestion,
                responses: result.typeQuestion === "عادي" ? "" : []
            }));
            setInputs(initialInputs);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/authClient");
            }
            if (err.response && err.response.status === 403) {
                navigate("/client/contestStart/userResult?id=" + err.response.data.id);
            }
        });
    }, []);

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const handleRadioChange = (event) => {
        const newInputs = [...inputs];
        newInputs[index].responses = event.target.value;
        setInputs(newInputs);
    };

    const handleTextInputChange = (event, blankIndex) => {
        const newInputs = [...inputs];
        newInputs[index].responses[blankIndex] = event.target.value;
        setInputs(newInputs);
    };

    const renderQuestionWithInputs = (questionText) => {
        const parts = questionText.split('_____');
        return (
            <>
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <input
                                type="text"
                                onChange={(event) => handleTextInputChange(event, i)}
                                placeholder="_____"
                                value={inputs[index].responses[i] || ""}
                                className="mx-2 input input-bordered"
                            />
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

    const renderQuestionWithInputsSwip = (questionText) => {
        const parts = questionText.split('_____');
        return (
            <>
                {parts.map((part, i) => (
                    <React.Fragment key={i}>
                        {part}
                        {i < parts.length - 1 && (
                            <DropZone
                                onDrop={(item) => handleDrop(item, i)}
                                answer={inputs[index].responses[i] || ""}
                            />
                        )}
                    </React.Fragment>
                ))}
            </>
        );
    };

    const handleDrop = (item, blankIndex) => {
        const newInputs = [...inputs];
        newInputs[index].responses[blankIndex] = item.text;
        setInputs(newInputs);
    };

    return (
        <div className='py-[2rem] container mx-auto'>
            {showAlert.display ? <Alert msg={showAlert} /> : ""}
            {data.length > 0 && (
                <div className='flex flex-col gap-[1rem] justify-center items-center'>
                    {data[index].typeQuestion === "عادي" && (
                        <div>
                            <h1 className='text-[1.1rem] sm:text-[1.3rem] font-bold'>{data[index]._doc.question}</h1>
                            {data[index]._doc.shuffledResponses.map((res, i) => (
                                <div key={i} className='mb-[0.5rem] flex items-center gap-[1rem] sm:text-[1.4rem]'>
                                    <input
                                        type="radio"
                                        name={`radio-${index}`}
                                        value={res}
                                        onChange={handleRadioChange}
                                        checked={inputs[index].responses === res}
                                        className="radio"
                                    />
                                    {res}
                                </div>
                            ))}
                        </div>
                    )}
                    {data[index].typeQuestion === "املأ الفراغ" && (
                        <div className='px-[0.3rem] text-[1.1rem] sm:text-[1.3rem] font-bold leading-[2.62rem]'>
                            {renderQuestionWithInputs(data[index]._doc.question)}
                        </div>
                    )}
                    {data[index].typeQuestion === "سحب" && (
                        <DndProvider backend={HTML5Backend}>
                            <div>
                                <p className='flex items-center gap-[1rem] font-bold text-[1.1rem]'>
                                    {renderQuestionWithInputsSwip(data[index]._doc.question)}
                                </p>
                                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                                    {data[index]._doc.combinedResponses.map((res, i) => (
                                        <DragItem key={i} id={i} text={res} />
                                    ))}
                                </div>
                            </div>
                        </DndProvider>
                    )}
                    <div className='flex justify-between w-full'>
                        <button
                            onClick={() => setIndex((prevIndex) => prevIndex - 1)}
                            disabled={index === 0}
                            className='btn sm:text-[1.3rem] font-bold'
                        >
                            عودة
                        </button>
                        <button onClick={() => {
                            handleSubmit();
                        }} disabled={!(index === data.length - 1)} className='btn btn-outline btn-warning sm:text-[1.3rem] font-bold'>{submit ? <span className="loading loading-ring loading-lg"></span> : "ارسال الاجوبة"}</button>
                        <button
                            onClick={() => setIndex((prevIndex) => prevIndex + 1)}
                            disabled={index === data.length - 1}
                            className='btn btn-success sm:text-[1.3rem] font-bold'
                        >
                            التالي
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StartResponse;
