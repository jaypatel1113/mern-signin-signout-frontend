import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import { ToastContainer } from "react-toastify";
import Particles from './components/Particles';

function App() {
    const [data, setData] = useState(false);

    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("https://mern-signin-signout.herokuapp.com/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const data = await res.json();

        if (data.status === 401 || !data) {
            console.log("user not valid");
        } else {
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
            <Particles id="tsparticles" />
            {data ? (
                <div className="main">
                    <Header />

                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dash" element={<Dashboard />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <ToastContainer />
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            )}
        </>
    );
}

export default App;
