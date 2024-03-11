import React, { useEffect} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";

const provincias = {
  Pinar_del_Rio: "PRI",
  Artemisa: "ART",
  La_Habana: "HAB",
  Mayabeque: "MAY",
  Matanzas: "MTZ",
  Cienfuegos: "CFG",
  Villa_Clara: "VCL",
  Sancti_Spíritus: "SSP",
  Ciego_de_Ávila: "CAV",
  Camagüey: "CMG",
  Las_Tunas: "LTU",
  Holguín: "HOL",
  Granma: "GRA",
  Santiago_de_Cuba: "SCU",
  Guantánamo: "GTM",
  Isla_de_la_Juventud: "IJV",
};


const UsersForm = () => {
  const [createClient, { isLoading, isSuccess, isError, error }] =
    useCreateClientMutation();
  const [
    editClient,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      error: errorEdit,
    },
  ] = useUpdateClientMutation();

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
        title: `Se ${isSuccessEdit ? "editó" : "creó"} cliente ${
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
      await editClient({
        id: edit.id,
        nombre:
          values?.nombre.charAt(0).toUpperCase() + values?.nombre.slice(1),
        apellidos:
          values?.apellidos.charAt(0).toUpperCase() +
          values?.apellidos.slice(1),
        ci: values?.ci,
        edad: values?.edad,
        provincia: values?.provincia,
        direccion: values?.direccion,
        telefono: values?.telefono,
      });
    } else {
      await createClient({
        nombre:
          values?.nombre.charAt(0).toUpperCase() + values?.nombre.slice(1),
        apellidos:
          values?.apellidos.charAt(0).toUpperCase() +
          values?.apellidos.slice(1),
        ci: values?.ci,
        edad: values?.edad,
        provincia: values?.provincia,
        direccion: values?.direccion,
        telefono: values?.telefono,
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
            nombre: "",
            apellidos: "",
            ci: "",
            edad: "",
            provincia: "",
            direccion: "",
            telefono: "",
          }}
          validationSchema={Yup.object({
            nombre: Yup.string().required("El campo nombre es requerido"),
            apellidos: Yup.string().required("El campo nombre es requerido"),
            ci: Yup.string()
              .matches(
                /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{4}\d$/,
                "El campo CI no cumple con las condiciones"
              )
              .required("El campo nombre es requerido"),
            telefono: Yup.string().matches(
              /^5[0-9]{7}$/,
              "El campo telefono debe ser un número de 8 dígitos que empiece con 5"
            ),
            edad: Yup.number()
              .min(18, "La edad debe ser mayor de 18")
              .max(99, "La edad debe ser menor de 99")
              .required("El campo edad es requerido"),
            provincia: Yup.string().required("El campo provincia es requerido"),
            direccion: Yup.string().required("El campo dirección es requerido"),
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
                setFieldValue("nombre", edit?.nombre, true);
                setFieldValue("apellidos", edit?.apellidos, true);
                setFieldValue("ci", edit?.ci, true);
                setFieldValue("edad", edit?.edad, true);
                setFieldValue("provincia", edit?.provincia, true);
                setFieldValue("direccion", edit?.direccion, true);
                setFieldValue("telefono", edit?.telefono, true);
              }
            }, []);

            return (
              <Form className="w-full p-6 bg-white" autoComplete="off">
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
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Carnet de Identidad
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="ci"
                      value={values.ci}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="ej.03051656897"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.ci && touched.ci && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.ci.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Edad
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="edad"
                      value={values.edad}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="escriba la edad"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.edad && touched.edad && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.edad.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Provincia
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.edad && touched.edad && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.edad.length > 0 && "border-green-100"
                      } `}
                      value={values.provincia}
                      name="provincia"
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione una Provincia
                      </option>
                    {Object.keys(provincias).map((provincia) => (
                        <option key={provincia} value={provincias[provincia]}>
                          {provincia}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Dirección
                    </label>
                  </div>
                  <div className="md:w-2/3 space-y-2 mb-6 relative">
                    <input
                      type="text"
                      name="direccion"
                      value={values.direccion}
                      onChange={handleChange}
                      placeholder="Escriba la dirección"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.direccion &&
                        touched.direccion &&
                        "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.direccion.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Teléfono
                    </label>
                  </div>
                  <div className="md:w-2/3 space-y-2 mb-6 relative">
                    <input
                      type="text"
                      name="telefono"
                      value={values.telefono}
                      onChange={handleChange}
                      placeholder="Escriba el teléfono"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.telefono && touched.telefono && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.telefono.length > 0 && "border-green-100"
                      } `}
                    />
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
