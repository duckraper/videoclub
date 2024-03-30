import React from "react";

const ActiveRentRow = ({ index, renta }) => {
  const [diasRestantes, setDiasRestantes] = React.useState(0);
  const dia = localStorage.setItem("dia", JSON.stringify("dia"));
  
  React.useEffect(() => {
    const fechaEntrega = new Date(renta.fecha_de_prestamo);
    fechaEntrega.setDate(fechaEntrega.getDate() + 3);
    const hoy = new Date();
    const diffTime = fechaEntrega.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDiasRestantes(diffDays);
  }, [dia]);

  let activo = renta.activo ? "Activo" : "No Activo";

  return (
    <tr className="border-b text-gray-500">
      {activo == "Activo" && (
        <td className=" py-3 px-4">{`${renta.cliente.nombre} ${renta.cliente.apellidos}`}</td>
      )}
      {activo == "Activo" && (
        <td className="">{renta.soporte.tipo_de_soporte}</td>
      )}
      {activo == "Activo" && <td className="pl-8">{diasRestantes > 0 ? diasRestantes : "Límite Éxedido"}</td>}
      {activo == "Activo" && <td>{renta.costo_del_prestamo}</td>}
    </tr>
  );
};

export default ActiveRentRow;
