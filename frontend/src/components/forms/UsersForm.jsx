import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation, useEditUserMutation } from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
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

  const roles = {
    Administrador: "is_staff",
    Dependiente: "!is_staff",
  };

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
    timer: 5000,
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
          isError ? JSON.stringify(error.data) : JSON.stringify(errorEdit.data)
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
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            {edit ? "Editar Usuario" : "Agregar Usuario"}
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
            
          }}
          validationSchema={Yup.object({
            user: Yup.string().required("El campo usuario es requerido"),
            nombre: Yup.string().required("El campo nombre es requerido"),
            apellidos: Yup.string().required("El campo nombre es requerido"),
            email: Yup.string().email().required("El campo email es requerido"),
            password: Yup.string()
              .required("El campo contraseña es requerido")
              .min(8, "La contraseña debe tener al menos 8 caracteres")
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
            re_password: Yup.string()
              .oneOf(
                [Yup.ref("password"), null],
                "Las contraseñas deben coincidir"
              )
              .required("Debe repetir la contraseña"),
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
              }
            }, []);

            const [showPass,setShowPass] = useState(false)
            const handleShowPass = () => {
                setShowPass(!showPass)
            }
            const [showPassRe,setShowPassRe] = useState(false)
            const handleShowPassRe = () => {
                setShowPassRe(!showPassRe)
            }
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
                      placeholder="Escriba el apellidos"
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
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Correo
                    </label>
                  </div>
                  <div className="md:w-2/3">
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

                {/* <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Role
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      onBlur={handleBlur}
                      className={`select select-bordered w-full max-w-xs ${
                        errors.role && touched.role && "select-error"
                      } ${
                        values.role.length > 0 &&
                        !errors.role &&
                        "select-success"
                      }`}
                      value={values.role}
                      name="role"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione un role
                      </option>
                      {roles?.forEach((rol) => (
                        <option>
                          {rol}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Contraseña
                    </label>
                  </div>
                  <div className="md:w-2/3 space-y-2 mb-6 relative">
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
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer"
                            onClick={handleShowPass}
                        >
                            { showPass ? (
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
                  <div className="md:w-2/3 space-y-2 mb-6 relative">
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
                            className="absolute right-3 top-1/3 transform -translate-y-1/2 cursor-pointer"
                            onClick={handleShowPassRe}
                        >
                            { showPassRe ? (
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
                    className=" rounded-md bg-red-400 uppercase w-1/6 text-white font-semibold"
                    type="button"
                  >
                    cancelar
                  </button>
                  <button
                    disabled={!isValid}
                    className={` rounded-md ${
                      !isValid && "bg-orange-200"
                    } bg-orange-300 uppercase w-1/6 text-white font-semibold`}
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
