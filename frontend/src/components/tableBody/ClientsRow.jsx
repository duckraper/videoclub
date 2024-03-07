import React from "react";


const ClientRow = ({ index, client }) => {

   
  return (
    <tr className="border-b">
      <th className="py-3 text-left px-4">{index + 1}</th>
      <td>{`${client.nombre}`}</td>
      <td>{client.apellidos}</td>
      <td>{client.direccion}</td>
    

      {/* <td>Administrador</td> */}

      {/* <td>
        <div className="flex flex-row w-100% justify-center items-center">
          <div className="tooltip" data-tip="Editar">
            <PencilIcon
              onClick={handleClickEdit}
              className="text-stone-900 w-5 h-5 btn btn-circle btn-ghost btn-sm"
            />
          </div>
          <div className="tooltip" data-tip="Eliminar">
            <TrashIcon
              onClick={handleClickErase}
              className="text-stone-900 mx-1 w-5 h-5 btn btn-circle btn-ghost btn-sm"
            />
          </div>
        </div>
      </td> */}
    </tr>
  );
};

export default ClientRow;