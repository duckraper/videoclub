import React, { useEffect, useState} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateRentMutation, useGetClientsQuery, useGetSupportsQuery
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";


const RentForm = () => {
  const [createRent, { isLoading, isSuccess, isError, error }] =
    useCreateRentMutation();
  const { noHere, edit } = useSelector(tipo_state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientes, setClientes] = useState({});
  const { data, isSuccess: is } = useGetClientsQuery();
  useEffect(() => {
    if (data) {
      const newClientes = {};
      data.forEach((dat) => {
        newClientes[`${dat.nombre} ${dat.apellidos}`] = dat.id;
      });
      setClientes(newClientes);
    }
  }, [is]);

  const [soportes, setSoportes] = useState({});
  const { data: datas, isSuccess: iss, isLoading: islo } = useGetSupportsQuery();
  useEffect(() => {
    if (datas) {
      const newSoportes = {};
      datas.forEach((dat) => {
        if (dat.peliculas.length > 0) {
          const peliculas = dat.no_serie + " ( " + dat.peliculas.map((pelicula) => pelicula).join(", ") + " )"
          newSoportes[peliculas] = dat.id;
        }
      });
      setSoportes(newSoportes);

    }
  }, [datas, isLoading]);
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
    if (isSuccess ) {
      navigate(-1);
      Toast.fire({
        icon: "success",
        iconColor: "orange",
        title: `Se creó el préstamo correctamente `,
      })
      dispatch(setNoHere(true));
    }
  }, [isLoading]);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm();

      await createRent({
        cliente: values?.cliente,
        soporte: values?.soporte,
      });
    
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl ">
            Crear préstamo
          </h1>
        </div>
      </div>
      <div className="w-3/4 h-auto shadow-md md:flex md:justify-center md:items-center overflow-auto rounded-md">
        <Formik
          initialValues={{
            cliente: "",
            soporte: "",
          }}
          validationSchema={Yup.object({
            cliente: Yup.string().required("El campo es requerido"),
            soporte: Yup.string().required("El campo es requerido"),
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
                      Cliente
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.cliente && touched.cliente && "border-red-400"
                      } ${isError && "border-red-400"} `}
                      value={values.cliente}
                      name="cliente"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione un cliente
                      </option>
                    {Object.keys(clientes).map((cliente) => (
                        <option key={cliente} value={clientes[cliente]} >
                          {cliente}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Soporte
                    </label>
                  </div>
                  <div className="md:w-2/3">
                  <select 
                  onBlur={handleBlur}
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-2 ${
                        errors.soporte && touched.soporte && "border-red-400"
                      } ${isError && "border-red-400"} `}
                      value={values.soporte}
                      name="soporte"
                      onChange={handleChange}
                    >
                      <option value="" disabled  >
                        Seleccione un soporte
                      </option>
                    {Object.keys(soportes).map((soporte) => (
                        <option key={soporte} value={soportes[soporte]} >
                          {soporte}
                        </option>
                      ))}
                    </select>
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

export default RentForm;
