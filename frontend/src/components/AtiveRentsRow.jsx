import React from "react";

const ActiveRentRow = ({ index, renta }) => {

    let activo = renta.activo ? "Activo" : "No Activo";
   
  return (
    <tr className="border-b text-gray-500">
     {activo == "Activo" &&  <th className="py-3 text-left px-4 text-black">{index + 1}</th>}
     {activo == "Activo" && <td>{`${renta.cliente.nombre} ${renta.cliente.apellidos}`}</td>}
     {activo == "Activo" && <td className="">{renta.soporte.tipo_de_soporte}</td>}
     {activo == "Activo" && <td className="pl-8">3</td>}
     {activo == "Activo" && <td >{renta.costo_del_prestamo}</td>}
    </tr>
  );
};

export default ActiveRentRow;