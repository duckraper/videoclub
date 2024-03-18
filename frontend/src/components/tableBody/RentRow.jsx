import React from "react";
import { DeleteOutlineOutlined, RestoreOutlined, InfoOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useDeleteRentMutation, useReturnRentMutation } from "../../app/services";

const RentRow = ({ index, renta }) => {
  const [deleteRent] = useDeleteRentMutation();
  const [returnRent] = useReturnRentMutation();
 
  const handleInfo = (renta) => {
    if (renta) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
                Cliente: ${renta.cliente.nombre} <br><br>
                Tipo de soporte: ${renta.soporte.tipo_de_soporte} <br><br>
                Activo: ${renta.activo ? "Si" : "No"} <br><br>
                Fecha de prestamo: ${renta.fecha_de_prestamo} <br><br>
                Costo del prestamo: ${renta.costo_del_prestamo} <br><br>
                Fecha de devolución: ${renta.fecha_de_devolucion} <br><br>
                
               `,
        focusConfirm: false,
        confirmButtonText: `ok`,
        confirmButtonColor: "orange",
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas la renta de : ${renta.cliente.nombre} , esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRent(soporte.id);
      }
    });
  };

  const handleReturn = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si devuelves la renta de : ${renta.cliente.nombre} , esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, devolver!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await returnRent({ id: renta.id });
      }
    });
  };

    let activo = renta.activo ? "Activo" : "No Activo";
   
  return (
    <tr className="border-b text-gray-500">
      <th className="py-3 text-left px-4 text-black">{index + 1}</th>
      <td>{`${renta.cliente.nombre}`}</td>
      <td className="pl-5">{renta.soporte.tipo_de_soporte}</td>
      <td>{activo}</td>
      <td className="pl-20">{renta.fecha_de_prestamo}</td>
      <td>{renta.costo_del_prestamo}</td>
  
      <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
        <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Info Préstamo
            </span>
            <InfoOutlined
              onClick={()=>handleInfo(renta)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
              Devolver Préstamo
            </span>
            <RestoreOutlined
               onClick={handleReturn}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Eliminar Préstamo
            </span>
            <DeleteOutlineOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RentRow;