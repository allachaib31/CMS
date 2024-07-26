import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { electionDetailsFetch, voteDetailsFetch } from '../../../utils/apiFetch';

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function ElectionDetails() {
    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [labels, setLabels] = useState(["A", "B", "C"]);
    const [data, setData] = useState([0, 0, 0]);
    const [vote, setVote] = useState(false);
    useEffect(() => {
        electionDetailsFetch(queryParams.get("id")).then((res) => {
            setLabels(res.data.vote.choices);
            let array = []
            res.data.vote.choices.forEach((choice) => {
                array.push(0);
            })
            for (let i = 0; i < res.data.vote.userVote.length; i++) {
                let index = res.data.vote.choices.indexOf(res.data.vote.userVote[i].choose);
                array[index]++;
            }
            setData(array);
            setVote(res.data.vote);
        }).catch((err) => {
            if (err.response && err.response.status === 401) {
                navigate("/auth");
            }
        })
    }, [])
    return (
        <div className='container mx-auto'>
            <h1>{vote && vote.subject}</h1>
            <Bar data={{
                labels: labels,
                datasets: [
                    {
                        label: "عدد المصوتين",
                        data: data,
                        backgroundColor: "#1eb854", // Adjust color as needed
                    },
                ],
            }} />
        </div>
    )
}

export default ElectionDetails