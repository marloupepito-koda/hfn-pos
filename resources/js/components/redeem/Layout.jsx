import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function RedeemLayout() {
    const { code } = useParams();
    const [status, setStatus] = useState("");
    useEffect(() => {
        axios.get("/api/get_specific_code/" + code).then((res) => {
            setStatus(res.data.status.status);
        });
    }, []);
    return (
        <div className="col-md-4 offset-md-4">
            <img src="/images/mheader.jpg" width="100%" />
            {status === 1 ? (
                <div className="row">
                    <div className="col-md-3 col-3">
                        <img src="/images/down.png" width="100%" />
                    </div>
                    <div className="col-md-9 col-9 text-center mt-4">
                        <h1>
                            <b>Already Redeemed</b>
                        </h1>
                    </div>
                </div>
            ) : status === 0 ? (
                <div className="row">
                    <div className="col-md-3 col-3">
                        <img src="/images/up.png" width="100%" />
                    </div>
                    <div className="col-md-9 col-9 text-center mt-4">
                        <h1>
                            <b>Unredeemed</b>
                        </h1>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default RedeemLayout;
