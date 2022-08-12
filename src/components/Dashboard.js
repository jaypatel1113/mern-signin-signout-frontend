import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch(
            "https://mern-signin-signout.herokuapp.com/validuser",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        );

        const data = await res.json();

        if (data.status === 401 || !data) {
            toast.error("Login First to access it 😢", {
                position: "bottom-right",
                theme: "colored",
            });
            history("*");
        } else {
            toast.success("Logged In Successful 😃", {
                position: "bottom-right",
                theme: "colored",
            });
            console.log("user verify");
            setLoginData(data);
            history("/dash");
        }
    };

    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true);
        }, 2000);
    }, []);

    return (
        <>
            {data ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "calc(100vh - 80px)",
                        gap: "15px",
                    }}
                >
                    <img
                        src={`${
                            logindata
                                ? `https://mern-signin-signout.herokuapp.com/public/images/${logindata.ValidUserOne.profilePic}`
                                : ""
                        }`}
                        style={{
                            width: "150px",
                            height: "150px",
                            marginTop: 20,
                            borderRadius: "50%",
                            zIndex: 1000,
                        }}
                        alt=""
                    />
                    <h3 style={{ zIndex: 1000 }}>
                        Name : {logindata ? logindata.ValidUserOne.fname : ""}
                    </h3>
                    <h3 style={{ zIndex: 1000 }}>
                        Email : {logindata ? logindata.ValidUserOne.email : ""}
                    </h3>
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 80px)",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
};

export default Dashboard;
