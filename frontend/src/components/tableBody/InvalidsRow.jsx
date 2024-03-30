import React from "react";
import Swal from "sweetalert2";
import { useDeleteInvalidClientMutation, useDeleteClientMutation } from "../../app/services";

const InvalidsRow = ({ index, invalid }) => {
  const [deleteInvalid] = useDeleteInvalidClientMutation();
  const [deleteClient] = useDeleteClientMutation();
  
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
               confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="white" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`,
               confirmButtonColor: "red",
               showCloseButton: true,
               showDenyButton: true,
               denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="white" viewBox="0 -960 960 960" width="24"><path d="M791-55 686-160H160v-112q0-34 17.5-62.5T224-378q45-23 91.5-37t94.5-21L55-791l57-57 736 736-57 57ZM240-240h366L486-360h-6q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm496-138q29 14 46 42.5t18 61.5L666-408q18 7 35.5 14t34.5 16ZM568-506l-59-59q23-9 37-29.5t14-45.5q0-33-23.5-56.5T480-720q-25 0-45.5 14T405-669l-59-59q23-34 58-53t76-19q66 0 113 47t47 113q0 41-19 76t-53 58Zm38 266H240h366ZM457-617Z"/></svg>`, 
               denyButtonColor: "orange",
               
             }).then((result) => {
               if (result.isConfirmed) {
                  handleDelete(invalid.client);
               }
               else if (result.isDenied) {
                  handleDeleteInvalid(invalid.client);
               }
           });
    }
  };


  return (
    <tr className="border-b text-gray-500 overflow-x-hidden hover:bg-gray-50 " onClick={() => {handleInfo(invalid.cliente)}}>
      <td className="py-3 text-left px-4">{`${invalid.cliente.nombre}`}</td>
      <td>{invalid.cliente.apellidos}</td>
      <td className="pl-10">{invalid.fecha_invalidacion}</td>
      {invalid.motivo ? <td className="">{invalid.motivo}</td>: <td className="">Comportamiento indebido</td>}
    </tr>
  );
};

export default InvalidsRow;
