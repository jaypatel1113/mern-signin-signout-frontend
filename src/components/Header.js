import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import "./header.css";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("https://mern-signin-signout.herokuapp.com/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                    Accept: "application/json",
                },
            }
        );

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            toast.success("Logged out Successful 😃", {
                position: "bottom-right",
                theme: "colored",
            });
            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false);
            history("/");
        } else {
            toast.error("Someting went wrong! 😥", {
                position: "bottom-right",
                theme: "colored",
            });
            console.log("error");
        }
    };

    const goDash = () => {
        history("/dash");
    };

    const goError = () => {
        toast.error("Login First to access it 😢", {
            position: "bottom-right",
            theme: "colored",
        });
        history("*");
    };

    return (
        <>
            <header>
                <nav>
                    <NavLink to="/" style={{ zIndex: 1000 }}>
                        <h1>JP MERN</h1>
                    </NavLink>
                    <div className="avtar">
                        {logindata.ValidUserOne ? (
                            <Avatar
                                style={{
                                    // background: "salmon",
                                    background: "#333",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    zIndex: 1000,
                                    color: "#fff",
                                    padding: 5,
                                }}
                                onClick={handleClick}
                            >
                                {logindata.ValidUserOne.fname[0].toUpperCase()}
                            </Avatar>
                        ) : (
                            <Avatar
                                style={{
                                    background: "#333",
                                    zIndex: 1000,
                                    color: "#fff",
                                    padding: 5,
                                }}
                                onClick={handleClick}
                            />
                        )}
                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        {logindata.ValidUserOne ? (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        goDash();
                                        handleClose();
                                    }}
                                >
                                    Profile
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        logoutuser();
                                        handleClose();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        goError();
                                        handleClose();
                                    }}
                                >
                                    Profile
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                </nav>
            </header>
        </>
    );
};

export default Header;
