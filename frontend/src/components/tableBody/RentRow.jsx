import React from "react";
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
               confirmButtonColor: "orange",
        ...(renta.activo && {
            confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="white" viewBox="0 -960 960 960" width="24"><path d="M480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0 280q-139 0-241-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Z"/></svg>`,
            confirmButtonColor: "orange",
            showCloseButton: true,
        })}).then((result) => {
           if (result.isConfirmed && renta.activo) {
              handleReturn(renta)
           }
       });
    }
  };

    let activo = renta.activo ? "Activo" : "No Activo";
   
  return (
    <tr className={`border-b text-gray-500 ${!renta.activo && "bg-gray-100" } hover:bg-gray-50`} onClick={() => {handleInfo(renta)}}>
      <td className="py-3 text-left px-4 w-1/4">{`${renta.cliente.nombre} ${renta.cliente.apellidos}`}</td>
      <td className=" w-1/5">{renta.soporte.tipo_de_soporte}</td>
        <td className=" w-1/5">
            {
                renta.activo &&
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  className="bi bi-clock-history" viewBox="0 0 16 16">
                    <path
                        d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                    <path
                        d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                </svg>
            }
            {
                !renta.activo &&
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                </svg>
            }
            {
                !renta.activo && !renta.ha_sido_devuelto &&
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            }
        </td>
        <td className="pl-8 w-1/5">{renta.fecha_de_prestamo}</td>
        <td className="pl-12 w-1/5">{renta.costo_del_prestamo}</td>
    </tr>
  );
};

export default RentRow;