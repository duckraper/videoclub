import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth_state } from "../app/slices/Auth.slice";
import { useSelector } from "react-redux";
import { ManageAccountsOutlined } from "@mui/icons-material";

const LoadingPage = () => {
    const { authenticated } = useSelector(auth_state);

    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            if(authenticated){
            navigate("/home/Dashboard");
        }
            else if(!authenticated){
                navigate("/")
            }
        }, 1000);
    }, []);

    return (
        <div className="flex justify-center flex-col flex-wrap items-center content-center w-full h-screen min-h-[300px]">
            <div>
                <ManageAccountsOutlined
                    style={{
                        fontSize: "xxx-large",
                        width: "10rem",
                        height: "10rem",
                    }}
                />
            </div>
            <div className="w-16 h-16 border-4 border-t-orange-300 border-gray-200 rounded-full animate-spin mt-10" />
        </div>
    );
};

export default LoadingPage;
