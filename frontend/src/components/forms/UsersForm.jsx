import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation, useEditUserMutation } from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";

const UsersForm = () => {
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  const [
    editUser,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      error: errorEdit,
    },
  ] = useEditUserMutation();

  const { noHere, edit } = useSelector(tipo_state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (noHere) {
      navigate(-1);
    }
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    if (isSuccess || isSuccessEdit) {
      navigate(-1);
      Toast.fire({
        icon: "success",
        iconColor: "orange",
        title: `Se ${isSuccessEdit ? "editó" : "creó"} el usuario ${
          isSuccessEdit ? "seleccionado" : ""
        } correctamente `,
      });
      dispatch(setNoHere(true));
      if (edit) dispatch(setEdit(null));
    } else if (isError || isErrorEdit) {
      Toast.fire({
        icon: "error",
        title: `${
          isError ?  `${Object.values(error.data)}${Object.keys(error.data)}` : `${Object.values(errorEdit.data)}${Object.keys(errorEdit.data)}`
        }`,
      });
      console.error(error);
    }
  }, [isLoading, isLoadingEdit]);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm();

    if (edit) {
      await editUser({
        id: edit.id,
        username: values?.user,
        first_name:
          values?.nombre.charAt(0).toUpperCase() + values?.nombre.slice(1),
        last_name:
          values?.apellidos.charAt(0).toUpperCase() +
          values?.apellidos.slice(1),
        email: values?.email,
        password: values?.re_password,
        is_staff: values?.administrador,
      });
    } else {
      await createUser({
        username: values?.user,
        first_name:
          values?.nombre.charAt(0).toUpperCase() + values?.nombre.slice(1),
        last_name:
          values?.apellidos.charAt(0).toUpperCase() +
          values?.apellidos.slice(1),
        email: values?.email,
        password: values?.re_password,
        is_staff: values?.administrador,
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            {edit ? "Editar Trabajador" : "Agregar Trabajador"}
          </h1>
        </div>
      </div>
      <div className="w-3/4 h-auto shadow-md md:flex md:justify-center md:items-center overflow-auto rounded-md">
        <Formik
          initialValues={{
            user: "",
            nombre: "",
            apellidos: "",
            password: "",
            email: "",
            re_password: "",
            administrador: false,
          }}
          validationSchema={Yup.object({
            user: Yup.string().required("El campo usuario es requerido"),
            nombre: Yup.string().required("El campo nombre es requerido"),
            apellidos: Yup.string().required("El campo nombre es requerido"),
            email: Yup.string().email().required("El campo email es requerido"),
            password: Yup.string().required("Campo Obligatorio").min(8, "La contraseña debe tener al menos 8 caracteres")
              .notOneOf(
                [
                  Yup.ref("user"),
                  Yup.ref("nombre"),
                  Yup.ref("apellidos"),
                  Yup.ref("email"),
                ],
                "La contraseña no puede ser igual a otros datos del formulario"
              )
              .test(
                "common-password",
                "La contraseña no debe ser común",
                (value) => {
                  const commonPasswords = [
                    "123456",
                    "password",
                    "qwerty",
                    `${value}+123 `,
                  ];
                  return !commonPasswords.includes(value);
                }
              ),
            re_password: Yup.string().required("Campo Obligatorio")
              .oneOf(
                [Yup.ref("password"), null],
                "Las contraseñas deben coincidir"
              )
          })}
          
          onSubmit={handleSubmit}
        >
          
          {({
            values,
            errors,
            touched,
            isValid,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => {
            useEffect(() => {
              if (edit) {
                setFieldValue("user", edit?.username, true);
                setFieldValue("nombre", edit?.first_name, true);
                setFieldValue("apellidos", edit?.last_name, true);
                setFieldValue("email", edit?.email, true);
                setFieldValue("administrador", edit?.is_staff, true);
              }
            }, []);
            
            const [showPass, setShowPass] = useState(false);
            const handleShowPass = () => {
              setShowPass(!showPass);
            };
            const [showPassRe, setShowPassRe] = useState(false);
            const handleShowPassRe = () => {
              setShowPassRe(!showPassRe);
            };
            
            const handleRole = () => {
              setFieldValue("administrador", !values.administrador);
            };
            return (
              <Form className="w-full p-6 bg-white" autoComplete="off">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Usuario
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="user"
                      value={values.user}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba el usuario"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.user && touched.user && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.user.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Nombre
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="nombre"
                      value={values.nombre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba el nombre"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.nombre && touched.nombre && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.nombre.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Apellidos
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="apellidos"
                      value={values.apellidos}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba los apellidos"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.apellidos &&
                        touched.apellidos &&
                        "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.apellidos.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center">
                  <div className=" w-1/2 pb-6">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Correo
                    </label>
                  </div>
                  <div className="flex justify-start w-full">
                  <div className="md:flex mb-6 w-4/5 ">
                      <div className="w-4/5">
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="pepe@uci.cu"
                          className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                            errors.email && touched.email && "border-red-400"
                          } ${isError && "border-red-400"} ${
                            values.email.length > 0 && "border-green-100"
                          } `}
                        />
                      </div>
                  </div>

                  <div className="flex md:items-center mb-6 md:w-1/3 ">
                    <div className="">
                      <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                        Administrador
                      </label>
                    </div>
                    
                      <div className="flex pt-1 ">
                        <input
                          type="checkbox"
                          name="administrador"
                          value={values.administrador}
                          checked={values.administrador}
                          onChange={handleRole}
                          className="mr-2 text-lg"
                          
                        />
                      </div>  
                  </div>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Contraseña
                    </label>
                  </div>
                  <div className="md:w-2/3 relative">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      placeholder="Escriba la contraseña"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.password && touched.password && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.password.length > 0 && "border-green-100"
                      } `}
                    />
                    <span
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer pt-2.5"
                      onClick={handleShowPass}
                    >
                      {showPass ? (
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
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Confirmar Contraseña
                    </label>
                  </div>
                  <div className="md:w-2/3 relative">
                    <input
                      type={showPassRe ? "text" : "password"}
                      name="re_password"
                      value={values.re_password}
                      onChange={handleChange}
                      placeholder="Repita la contraseña"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.re_password &&
                        touched.re_password &&
                        "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.re_password.length > 0 && "border-green-100"
                      } `}
                    />
                    <span
                      className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer pt-2.5"
                      onClick={handleShowPassRe}
                    >
                      {showPassRe ? (
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
                </div>
                        
                <div className="flex justify-between w-full px-auto">
                  <button
                    onClick={() => navigate(-1)}
                    className=" rounded-md bg-red-400 uppercase py-1 px-2 text-white font-medium text-sm"
                    type="button"
                  >
                    cancelar
                  </button>
                  <button
                    disabled={!isValid}
                    className={` rounded-md  bg-orange-300 ${
                      !isValid && "bg-orange-50"
                    } uppercase py-1 px-2 text-white font-medium text-sm`}
                    type="submit"
                  >
                    {edit ? "editar" : "agregar"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UsersForm;
