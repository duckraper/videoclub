import React, { useEffect} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateSupportMutation,
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";

const tipos = {
  "DVD": "dvd",
  "VCD": "vcd",
  "Casete": "casete"
}

const capacidades = {
  "8.5": 8.5,
  "4.7": 4.7,
}

const estados = {
  "Bien": "B",
  "Regular": "R",
  "Mal": "M",
}
const formatos = {
  "Betamax": "Betamax",
  "VHS": "VHS",
  "Blu-ray": "Blu-ray",
}

const formatoALM = {
  "Dato": "Dato",
  "DVDVideo": "DVDVideo",
}

const marcas = {
  "Sony": "Sony",
  "Panasonic": "Panasonic",
  "LG": "LG",
  "Samsung": "Samsung",
  "Philips": "Philips",
  "JVC": "JVC",
}

const SupportForm = () => {
  const [createSupport, { isLoading, isSuccess, isError, error }] =
    useCreateSupportMutation();

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
    if (isSuccess) {
      navigate(-1);
      Toast.fire({
        icon: "success",
        iconColor: "orange",
        title: "Se creó el soporte correctamente ",
      });
      dispatch(setNoHere(true));
    } 
  }, [isLoading]);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm();

      await createSupport({
        tipo_soporte: values?.tipo_soporte,
        costo_adquisicion: values?.costo_adquisicion,
        estado: values?.estado,
        formato_cinta: values?.formato_cinta,
        formato_almacenamiento: values?.formato_almacenamiento,
        capacidad: values?.capacidad,
        marca: values?.marca,

      });
  
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            Agregar Soporte
          </h1>
        </div>
      </div>
      <div className="w-3/4 h-auto shadow-md md:flex md:justify-center md:items-center overflow-auto rounded-md">
        <Formik
          initialValues={{
            tipo_soporte: "dvd",
            costo_adquisicion: "",
            estado: "B",
            formato_cinta: "VHS",
            formato_almacenamiento: "Dato",
            capacidad: "8.5",
            marca: "Sony",

          }}
          validationSchema={Yup.object({
            tipo_soporte: Yup.string().required("El campo es requerido"),
            costo_adquisicion: Yup.number().required("El campo es requerido"),
            estado: Yup.string().required("El campo es requerido"),
            capacidad: Yup.string().required("El campo es requerido"),
            formato_cinta: Yup.string().required("El campo formato_cinta es requerido"),
            formato_almacenamiento: Yup.string().required("El campo dirección es requerido"),
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

            }, []);

            return (
              <Form className="w-full p-6 bg-white" autoComplete="off">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Tipo de Soporte
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select 
                    onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.tipo_soporte && touched.tipo_soporte && "border-red-400"
                      } ${isError && "border-red-400"} `}
                      value={values.tipo_soporte}
                      name="tipo_soporte"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione una tipo_soporte
                      </option>
                    {Object.keys(tipos).map((tipo) => (
                        <option key={tipo} value={tipos[tipo]} >
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Costo del Soporte
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="costo_adquisicion"
                      value={values.costo_adquisicion}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba los costo_adquisicion"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.costo_adquisicion &&
                        touched.costo_adquisicion &&
                        "border-red-400"
                      } ${isError && "border-red-400"}  `}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Estado del soporte
                    </label>
                  </div>
                  <div className="md:w-2/3">
                   <select 
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.estado && touched.estado && "border-red-400"
                      } ${isError && "border-red-400"}  `}
                      value={values.estado}
                      name="estado"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione un estado
                      </option>
                    {Object.keys(estados).map((stado) => (
                        <option key={stado} value={estados[stado]} >
                          {stado}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                { values?.tipo_soporte == "casete" &&  
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Formato De la Cinta
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.formato_cinta && touched.formato_cinta && "border-red-400"
                      } ${isError && "border-red-400"} `}
                      value={values.formato_cinta}
                      name="formato_cinta"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione un Formato
                      </option>
                    {Object.keys(formatos).map((formato) => (
                        <option key={formato} value={formatos[formato]} >
                          {formato}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>}
                {values?.tipo_soporte == "dvd" &&  
                  <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Formato de almacenamiento
                    </label>
                  </div>
                  <div className="md:w-2/3  relative">
                    <select onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.formato_almacenamiento && touched.formato_almacenamiento && "border-red-400"
                      } ${isError && "border-red-400"}  `}
                      value={values.formato_almacenamiento}
                      name="formato_almacenamiento"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione un Formato
                      </option>
                    {Object.keys(formatoALM).map((formato) => (
                        <option key={formato} value={formatoALM[formato]} >
                          {formato}
                        </option>
                      ))}
                    </select> 
                  </div>
                </div>}
                {values?.tipo_soporte == "dvd" && 
                 <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Capacidad
                    </label>
                  </div>
                  <div className="md:w-2/3 relative">
                    <select 
                      onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.capacidad && touched.capacidad && "border-red-400"
                      } ${isError && "border-red-400"}  `}
                      value={values.capacidad}
                      name="capacidad"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione una capacidad
                      </option>
                    {Object.keys(capacidades).map((capacidad) => (
                        <option key={capacidad} value={capacidades[capacidad]} >
                          {capacidad}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>}
                {values?.tipo_soporte == "vcd" && 
                <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                    Marca
                  </label>
                </div>
                <div className="md:w-2/3 relative">
                  <select 
                    onBlur={handleBlur}
                    className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                      errors.marca && touched.marca && "border-red-400"
                    } ${isError && "border-red-400"}  `}
                    value={values.marca}
                    name="marca"
                    onChange={handleChange}
                  >
                    <option value="" disabled  >
                      Seleccione una marca
                    </option>
                  {Object.keys(marcas).map((marca) => (
                      <option key={marca} value={marcas[marca]} >
                        {marca}
                      </option>
                    ))}
                  </select>
                </div>
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
                    agregar
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

export default SupportForm;
