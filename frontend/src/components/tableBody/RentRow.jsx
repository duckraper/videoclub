import React from "react";
import { DeleteOutlineOutlined, RestoreOutlined, InfoOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useReturnRentMutation } from "../../app/services";

const RentRow = ({ index, renta }) => {
  const [returnRent] = useReturnRentMutation();
 
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

  const handleReturn = async (renta) => {
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
        await returnRent(renta.id);
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha devuelto la renta correctamente `,
        });
      }
    });
  };

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
               confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0 280q-139 0-241-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Z"/></svg>`,
               confirmButtonColor: "orange",
               showCloseButton: true,
             }).then((result) => {
               if (result.isConfirmed) {
                  handleReturn(renta)
               }
           });
    }
  };

    let activo = renta.activo ? "Activo" : "No Activo";
   
  return (
    <tr className={`border-b text-gray-500 ${!renta.activo && "bg-gray-100" } hover:bg-gray-50`} onClick={() => {handleInfo(renta)}}>
      <td className="py-3 text-left px-4 w-1/5">{`${renta.cliente.nombre} ${renta.cliente.apellidos}`}</td>
      <td className=" w-1/5">{renta.soporte.tipo_de_soporte}</td>
      <td className=" w-1/5">{activo}</td>
      <td className="pl-8 w-1/5">{renta.fecha_de_prestamo}</td>
      <td className="pl-12 w-1/5">{renta.costo_del_prestamo}</td>
    </tr>
  );
};

export default RentRow;