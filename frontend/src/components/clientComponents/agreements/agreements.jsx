import React, { useEffect, useState } from "react";
import { clientInformationAgreementsFetch } from "../../../utils/apiFetch";
import { useNavigate } from "react-router-dom";

function AgreementsClient() {
    const navigate = useNavigate();
    const [agreements, setAgreements] = useState("");
    useEffect(() => {
        clientInformationAgreementsFetch()
            .then((res) => {
                console.log(res);
                const parser = new DOMParser();
                const dom = parser.parseFromString(
                    res.data.agreements[0].text,
                    "text/html"
                );
                setAgreements(dom.body.innerText);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    navigate("/authClient");
                }
            });
    }, []);
    return (
        <div className="px-[1rem] sm:px-0 py-[2rem]">
            <h1 className="text-center text-[1.5rem] font-bold py-[1rem]">
                {" "}
                بنود وإتفاقيات الصندوق
            </h1>
            <div
                className="container mx-auto"
                dangerouslySetInnerHTML={{ __html: agreements }}
            ></div>
        </div>
    );
}

export default AgreementsClient;
