import React, { useEffect} from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useCreateInvalidClientMutation
} from "../../app/services";
import { useDispatch, useSelector } from "react-redux";
import {
  setNoHere,
  tipo_state,
  setEdit,
} from "../../app/slices/TipoActivo.slice";
import Swal from "sweetalert2";

const InvalidateForm = () => {
  const [setInvalid, { isLoading, isSuccess, isError, error }] =
    useCreateInvalidClientMutation();
 
  const { noHere, edit } = useSelector(tipo_state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (noHere) {
      navigate("/home/Dashboard/Clientes");
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
      navigate("/home/Dashboard/Clientes");
      Toast.fire({
        icon: "success",
        iconColor: "orange",
        title: "Se invalidó el cliente seleccionado correctamente ",
      });
      dispatch(setNoHere(true));
      if (edit) dispatch(setEdit(null));
    } else if (isError) {
      Toast.fire({
        icon: "error",
        title: `${
          isError && `${Object.values(error.data)}${Object.keys(error.data)}`
        }`,
      });
    }
  }, [isLoading]);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(false);
    actions.resetForm();

    if (edit) {
    console.log(edit.id)
      setInvalid({
        id: edit.id,
        motivo: values?.motivo.charAt(0).toUpperCase() + values?.motivo.slice(1),
      });
      
    } 
  };

  return (
    <div className="h-full w-full flex flex-col items-center ">
      <div className="flex w-full p-6 items-center justify-center">
        <div className="w-2/3 flex items-center justify-center">
          <h1 className="font-bold text-orange-400 text-2xl "> 
            Invalidar Cliente
          </h1>
        </div>
      </div>
      <div className="w-3/4 h-auto shadow-md md:flex md:justify-center md:items-center overflow-auto rounded-md">
        <Formik
          initialValues={{
            motivo: "",
          }}
          validationSchema={Yup.object({
            motivo: Yup.string().required("El campo motivo es requerido"),
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
                setFieldValue("motivo", edit?.motivo, true);
              }
            }, []);

            return (
              <Form className="w-full p-6 bg-white" autoComplete="off">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-sans md:text-right mb-1 md:mb-0 pr-4 label">
                      Motivo
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      type="text"
                      name="motivo"
                      value={values.motivo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Escriba el motivo de la invalidación"
                      className={`border-2 border-gray-200 w-full rounded-lg focus:outline-none px-3 py-1 ${
                        errors.motivo && touched.motivo && "border-red-400"
                      } ${isError && "border-red-400"}  `}
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

export default InvalidateForm;
