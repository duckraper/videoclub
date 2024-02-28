import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    VisibilityOffOutlined,
    VisibilityOutlined,
    LoginOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Formlogin = ({ users, setLog }) => {
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Campo Obligatorio"),
        password: Yup.string().required("Campo Obligatorio"),
    });

    const handleSubmit = (values, { setFieldError }) => {
        const { username, password } = values;
        const user = users.find(
            (user) => user.username === username && user.password === password
        );
        if (user) {
            setLog(user.role);
            console.log(user.role);
            navigate(`/${user.role}`);
        } else {
            if (!users.some((user) => user.username === username)) {
                setFieldError("username", "Usuario incorrecto");
            }
            else if (!users.some((user) => user.password === password)) {
                setFieldError("password", "Contraseña incorrecta");
            }
        }
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="mx-auto space-y-2 max-w-sm">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="space-y-2 mb-6">
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            className="border-2 border-gray-200 w-full rounded-lg focus:outline-none p-3"
                            placeholder="Usuario"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="text-red-400"
                        />
                        
                    </div>
                    <div className="space-y-2 mb-6 relative">
                        <Field
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="border-2 border-gray-200 w-full rounded-lg focus:outline-none p-3 pr-10"
                            placeholder="Contraseña"
                        />
                        <span
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer"
                            onClick={handleTogglePassword}
                        >
                            {showPassword ? (
                                <VisibilityOffOutlined
                                    style={{ fontSize: "large", color: "gray" }}
                                />
                            ) : (
                                <VisibilityOutlined
                                    style={{ fontSize: "large", color: "gray" }}
                                />
                            )}
                        </span>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-400 hover:bg-orange-300 rounded-lg text-white p-3 transition-all"
                    >
                        Acceder <LoginOutlined />
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default Formlogin;
