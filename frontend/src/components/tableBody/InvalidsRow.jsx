import React from "react";
import Swal from "sweetalert2";
import { useDeleteInvalidClientMutation, useDeleteClientMutation } from "../../app/services";
import { PersonRemoveOutlined, PersonOffOutlined, InfoOutlined } from "@mui/icons-material";

const InvalidsRow = ({ index, invalid }) => {
  const [deleteInvalid] = useDeleteInvalidClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  
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
  const handleInfo = (invalid) => {
    if (invalid) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
               Nombre: ${invalid.nombre} ${invalid.apellidos} <br><br>
               Edad: ${invalid.edad} <br><br>
               CI: ${invalid.ci} <br><br>
               Teléfono: ${invalid.telefono} <br><br>
               Fecha de registro: ${invalid.fecha_registro} <br><br>
               Soportes alquilados: ${invalid.cant_soportes_alquilados} <br><br>
               Invalidado: Si <br><br>
               Es fijo: ${invalid.es_fijo ? "Si" : "No"} <br><br>
               Dirección: ${invalid.direccion} <br><br>
               Provincia: ${invalid.provincia} <br><br>`,
        focusConfirm: false,
        confirmButtonText: `ok`,
        confirmButtonColor: "orange",
      });
    }
  };
  const handleDeleteInvalid = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si desaces la invalidación del cliente: ${invalid.cliente.nombre}, este volverá a ser un cliente normal!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, desacer!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteInvalid(invalid.cliente.id);
      }
    });
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas el Cliente: ${invalid.cliente.nombre}, esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteClient(invalid.cliente.id);
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha eliminado el cliente correctamente `,
        });
      }
    });
  };


  return (
    <tr className="border-b text-gray-500 overflow-x-hidden ">
      <th className="py-3 text-left px-4 text-black">{index + 1}</th>
      <td>{`${invalid.cliente.nombre}`}</td>
      <td>{invalid.cliente.apellidos}</td>
      <td className="pl-10">{invalid.fecha_invalidacion}</td>
      <td className="pl-9 ">{invalid.motivo}</td>

      <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
        <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Info cliente
            </span>
            <InfoOutlined
              onClick={()=>handleInfo(invalid.cliente)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
                Desacer Invalidación
            </span>
            <PersonOffOutlined
              onClick={handleDeleteInvalid}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Eliminar Cliente
            </span>
            <PersonRemoveOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default InvalidsRow;
