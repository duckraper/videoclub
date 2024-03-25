import React, { useEffect, useState } from "react";
import { PersonOutlined } from "@mui/icons-material";
import { useGetClientsQuery } from "../app/services";
import { useGetRentsQuery } from "../app/services";
import ActiveRentsRow from "../components/AtiveRentsRow";

export default function AdminDashBoard() {
  const { data } = useGetClientsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const clientsCount = data ? data.length : 0;

  const { data: dataRent, isSuccess } = useGetRentsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [exist, setExist] = React.useState([]);

  React.useEffect(() => {
    if (isSuccess) {
      setExist(dataRent);
    }
  }, [isSuccess]);

  return (
    <main className="flex flex-1 flex-col p-6 gap-8 py-16 px-44">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-white border-2 border-gray-200 shadow-sm rounded-lg p-5">
          <div className="flex flex-col">
            <h1 className=" font-bold text-xl px-2">Total de Clientes</h1>
            <p className="text-gray-500 px-3">Numero de clientes</p>
            <span className="text-3xl font-bold text-center">
              {clientsCount}{" "}
              <PersonOutlined
                style={{ fontSize: "xx-large", marginBottom: "5px" }}
              />
            </span>
          </div>
        </div>
        <div className="bg-white border-2 border-gray-200 shadow-sm rounded-lg p-5">
          <div className="flex flex-col">
            <h1 className=" font-bold text-xl px-2">Total de Dinero</h1>
            <p className="text-gray-500 px-3">Dinero Generado de las Rentas</p>
            <span className="text-3xl font-bold text-center">$5,432.00</span>
          </div>
        </div>
      </div>

      <h1 className="font-bold text-2xl">Rentas en Curso</h1>

      {exist.length > 0 ? <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
         <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2">Renta</th>
              <th>Clientes</th>
              <th>Formato</th>
              <th>Días para la entrega</th> 
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {dataRent?.map((el, index) => (
              <ActiveRentsRow key={el.id} index={index} renta={el} />
            ))}
          </tbody>
        </table>
      </div>: "No hay préstamos en curso"}
    </main>
  );
}
