import React, { useEffect} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateFilmMutation,
  useUpdateFilmMutation,
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";

const clasif_edads = {
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
}
const UsersForm = () => {
  const [createFilm, { isLoading, isSuccess, isError, error }] =
    useCreateFilmMutation();
  const [
    editFilm,
    {
      isLoading: isLoadingEdit,
      isSuccess: isSuccessEdit,
      isError: isErrorEdit,
      error: errorEdit,
    },
  ] = useUpdateFilmMutation();

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
        title: `Se ${isSuccessEdit ? "editó" : "creó"} la película ${
          isSuccessEdit ? "seleccionado" : ""
        } correctamente `,
      });
      dispatch(setNoHere(true));
      if (edit) dispatch(setEdit(null));
    } else if (isError || isErrorEdit) {
      Toast.fire({
        icon: "error",
        title: `${
          isError ? Object.values(error.data) : Object.values(errorEdit.data)
        }`,
      });
      console.error(error);
    }
  }, [isLoading, isLoadingEdit]);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm();

    if (edit) {
      await editFilm({
        id: edit.id,
        titulo:
          values?.titulo.charAt(0).toUpperCase() + values?.titulo.slice(1),
        genero:
          values?.genero.charAt(0).toUpperCase() +
          values?.genero.slice(1),
        duracion: values?.duracion,
        director: values?.director,
        clasif_edad: values?.clasif_edad,
        tamanio: values?.tamanio,
        precio: values?.precio,
      });
    } else {
      await createFilm({
        titulo:
          values?.titulo.charAt(0).toUpperCase() + values?.titulo.slice(1),
        genero:
          values?.genero.charAt(0).toUpperCase() +
          values?.genero.slice(1),
        duracion: values?.duracion,
        director: values?.director,
        clasif_edad: values?.clasif_edad,
        tamanio: values?.tamanio,
        precio: values?.precio,
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            {edit ? "Editar película" : "Agregar película"}
          </h1>
        </div>
      </div>
      <div className="w-3/4 h-auto shadow-md md:flex md:justify-center md:items-center overflow-auto rounded-md">
        <Formik
          initialValues={{
            titulo: "",
            genero: "",
            duracion: "",
            director: "",
            clasif_edad: "A",
            tamanio: "",
            precio: "",
          }}
          validationSchema={Yup.object({
            titulo: Yup.string().required("El campo titulo es requerido"),
            genero: Yup.string().required("El campo titulo es requerido"),
            ci: Yup.string()
              .matches(
                /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{4}\d$/,
                "El campo CI no cumple con las condiciones"
              )
              .required("El campo titulo es requerido"),
            precio: Yup.string().matches(
              /^5[0-9]{7}$/,
              "El campo precio debe ser un número de 8 dígitos que empiece con 5"
            ),
            director: Yup.number()
              .min(18, "La director debe ser mayor de 18")
              .max(99, "La director debe ser menor de 99")
              .required("El campo director es requerido"),
            clasif_edad: Yup.string().required("El campo clasif_edad es requerido"),
            tamanio: Yup.string().required("El campo dirección es requerido"),
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
                setFieldValue("titulo", edit?.titulo, true);
                setFieldValue("genero", edit?.genero, true);
                setFieldValue("duracion", edit?.duracion, true);
                setFieldValue("director", edit?.director, true);
                setFieldValue("clasif_edad", edit?.clasif_edad, true);
                setFieldValue("tamanio", edit?.tamanio, true);
                setFieldValue("precio", edit?.precio, true);
              }
            }, []);

            return (
              <Form className="w-full p-6 bg-white" autoComplete="off">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Título
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="titulo"
                      value={values.titulo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba el titulo"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.titulo && touched.titulo && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.titulo.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Género
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="genero"
                      value={values.genero}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba los genero"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.genero &&
                        touched.genero &&
                        "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.genero.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Duración
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="duracion"
                      value={values.duracion}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Introduzca la duración en minutos"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.duracion && touched.duracion && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.duracion.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Director
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="director"
                      value={values.director}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="escriba la director"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.director && touched.director && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.director.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Clasificacion de Edad
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.clasif_edad && touched.clasif_edad && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.clasif_edad.length > 0 && "border-green-100"
                      } `}
                      value={values.clasif_edad}
                      name="clasif_edad"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione una clasif_edad
                      </option>
                    {Object.keys(clasif_edads).map((clasif_edad) => (
                        <option key={clasif_edad} value={clasif_edads[clasif_edad]} >
                          {clasif_edad}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Tamaño
                    </label>
                  </div>
                  <div className="md:w-2/3  relative">
                    <input
                      type="text"
                      name="tamanio"
                      value={values.tamanio}
                      onChange={handleChange}
                      placeholder="Escriba la dirección"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.tamanio &&
                        touched.tamanio &&
                        "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.tamanio.length > 0 && "border-green-100"
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
                  <div className="md:w-2/3 relative">
                    <input
                      type="text"
                      name="precio"
                      value={values.precio}
                      onChange={handleChange}
                      placeholder="Escriba el teléfono"
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.precio && touched.precio && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.precio.length > 0 && "border-green-100"
                      } `}
                    />
                  </div>
                </div>

                <div className="flex justify-between w-full px-auto">
                  <button
                    onClick={() => navigate(-1)}
                    className=" rounded-md bg-red-400 uppercase py-1 px-2 font-medium text-sm text-white"
                    type="button"
                  >
                    cancelar
                  </button>
                  <button
                    disabled={!isValid}
                    className={`rounded-md bg-orange-300 ${
                      !isValid && "bg-orange-50"
                    }  uppercase py-1 px-2 font-medium text-sm text-white`}
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
