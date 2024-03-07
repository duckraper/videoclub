import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    VisibilityOffOutlined,
    VisibilityOutlined,
    LoginOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../app/services/AuthService";
import { auth_state, loginState } from "../app/slices/Auth.slice";
import { useNavigate } from "react-router-dom";

const Formlogin = () => {
    const [login, { isSuccess, isError, isLoading }] = useLoginMutation();
 
    const dispatch = useDispatch();
    const { authenticated } = useSelector(auth_state);
    console.log(authenticated)
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Campo Obligatorio"),
        password: Yup.string().required("Campo Obligatorio"),
    });

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
    
        login({ username: values.username, password: values.password });
      };
    
      React.useEffect(() => {
        if (isSuccess) {
          dispatch(loginState());
          navigate("/admini");
          console.log("exito")
        }
    
        if (isError) {
          console.log("error")
          navigate("/");
        }
      }, [isLoading]);
    
      React.useEffect(() => {
        if (authenticated) {
          navigate("/");
        }

      }, []);

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
              {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
            }) => (  
                <Form>
                    <div className="space-y-2 mb-6">
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none p-3 ${
                                errors.username && touched.username && "border-red-400"
                              } `}
                            placeholder="Usuario"
                        />
                        
                        
                    </div>
                    <div className="space-y-2 mb-6 relative">
                        <Field
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none p-3 ${
                                errors.password && touched.password && "border-red-400"
                              } `}
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
                    
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-400 hover:bg-orange-300 rounded-lg text-white p-3 transition-all"
                    >
                        Acceder <LoginOutlined />
                    </button>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default Formlogin;
