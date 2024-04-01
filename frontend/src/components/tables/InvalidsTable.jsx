import React from "react";
import { useListInvalidClientQuery } from "../../app/services";
import InvalidsRow from "../tableBody/InvalidsRow";


const Invalids = () => {
  const { data, isSuccess } = useListInvalidClientQuery({
    refetchOnReconnect: true,
  });
  
  return (
    <div className=" px-16 mb-20">
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex flex-col">
          <h1 className="font-bold text-2xl text-black ">Clientes Invalidados</h1>
        </div>
      </div>

     {data?.length > 0 ? <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full overflow-x-hidden">
          <thead className="border-b">
            <tr className="text-left">
              <th className=" w-1/4 p-2 px-4" >Nombre</th>
              <th >Apellidos</th>
              <th >Fecha invalidación</th>
              <th >Motivo</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <InvalidsRow key={el.id} index={index} invalid={el} />
            ))}
          </tbody>
        </table>
      </div> : "No hay clientes invalidados Actualmente"}
    </div>
  );
};

export default Invalids;