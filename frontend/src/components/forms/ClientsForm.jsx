import React, { useEffect} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetClientByIdQuery
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";

const provincias = {
  "Pinar del Rio": "PRI",
  "Artemisa": "ART",
  "La Habana": "HAB",
  "Mayabeque": "MAY",
  "Matanzas": "MTZ",
  "Cienfuegos": "CFG",
  "Villa Clara": "VCL",
  "Sancti Spíritus": "SSP",
  "Ciego de Ávila": "CAV",
  "Camagüey": "CMG",
  "Las Tunas": "LTU",
  "Holguín": "HOL",
  "Granma": "GRA",
  "Santiago de Cuba": "SCU",
  "Guantánamo": "GTM",
  
};

const generos = {
  "Comedia": "Comedia",
  "Acción": "Acción",
  "Aventura": "Aventura",
  "Ciencia Ficción": "Ciencia Ficción",
  "Drama": "Drama",
  "Romance": "Romance",
  "Fantasía": "Fantasía",
  "Terror": "Terror",
  "Suspenso": "Suspenso",
  "Animación": "Animación",
  "Documental": "Documental",
  "Musical": "Musical",
  "Crimen": "Crimen",
  "Misterio": "Misterio",
  "Western": "Western",
  "Histórico": "Histórico",
  "Guerra": "Guerra",
  "Biografía": "Biografía",
  "Fantástico": "Fantástico",
  "Infantil": "Infantil",
  "Indefinido": "Indefinido",
}

const ClientForm = () => {
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

  const { data, isSuccess:isS } = useGetClientByIdQuery(edit?.id)
  let genero = "Indefinido"
  
 useEffect(() => {
  if (data?.genero_favorito) {
    genero = data?.genero_favorito
 }
 }, [isS])
 

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
          isError ? `${Object.values(error.data)}${Object.keys(error.data)}` : `${Object.values(errorEdit.data)}${Object.keys(errorEdit.data)}`
        }`,
      });
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
        es_fijo: values?.es_fijo,
        genero_favorito: values?.genero_favorito,
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
        es_fijo: values?.es_fijo,
        genero_favorito: values?.genero_favorito,
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            {edit ? "Editar Cliente" : "Agregar Cliente"}
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
            provincia: "HAB",
            direccion: "",
            telefono: "",
            es_fijo: false,
            genero_favorito: "",
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
                setFieldValue("es_fijo",edit?.es_fijo, true)
                setFieldValue("genero_favorito",genero, true)
              }
            }, []);

            const handleFijo = () => {
              setFieldValue("es_fijo", !values.es_fijo);
            };

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
                        values.edad >= 18 && "border-green-100"
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
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.provincia && touched.provincia && "border-red-400"
                      } ${isError && "border-red-400"} ${
                        values.provincia.length > 0 && "border-green-100"
                      } `}
                      value={values.provincia}
                      name="provincia"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione una Provincia
                      </option>
                    {Object.keys(provincias).map((provincia) => (
                        <option key={provincia} value={provincias[provincia]} >
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
                  <div className="md:w-2/3  relative">
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
                  <div className="md:w-2/3 relative">
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
                {edit && <div className="md:flex md:items-center mb-6">
                  <div className="flex w-2/5  md:justify-end pr-9">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label text-center">
                      Cliente Fijo
                    </label>
                    <div className="flex pt-1 ">
                        <input
                          type="checkbox"
                          name="es_fijo"
                          value={values.es_fijo}
                          checked={values.es_fijo}
                          onChange={handleFijo}
                          className="mr-2 text-lg"
                          
                        />
                    </div>  
                  </div>
                {values.es_fijo && !data?.genero_favorito &&  
                 <div className="flex w-3/5 md:justify-end">
                    <div className="">
                      <label className="block text-gray-500 font-sans md:text-right  md:mb-0 pr-4 pt-2 label w-full">
                        Género favorito
                      </label> 
                    </div>
                    <select
                        onBlur={handleBlur}
                        className={`border-2 border-gray-200 w-3/5 rounded-lg focus:outline-none px-3 py-2 ${
                            errors.genero_favorito && touched.genero_favorito && "border-red-400"
                        } ${isError && "border-red-400"} `}
                        value={values.genero_favorito}
                        name="genero_favorito"
                        onChange={handleChange}
                    >
                        <option value=""  disabled>
                            Seleccione un género
                        </option>
                        {Object.keys(generos).map((genero) => (
                            <option key={genero} value={generos[genero]} >
                                {genero}
                            </option>
                        ))}
                    </select>
                  </div>}
                </div>}

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

export default ClientForm;
