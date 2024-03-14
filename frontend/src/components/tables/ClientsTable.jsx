import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../../app/services";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";
import ClientsRow from "../tableBody/ClientsRow";
import { PersonAddOutlined,FiberManualRecord } from "@mui/icons-material";


const Usuarios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetClientsQuery(undefined, {
    refetchOnReconnect: true,
  });

    useEffect(() => {
      dispatch(setEdit(null));
    }, []);

return (
    <div className=" px-16">
     <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex flex-col">
          <h1 className="font-bold text-2xl text-black ">Usuarios</h1>
        </div>
        <div className="w-1/3 flex justify-end mt-16">
          <button
            onClick={() => {
              dispatch(setNoHere(false));
              navigate("Agregar/");
            }}
            className=" flex rounded-full shadow-sm justify-center bg-orange-300 hover:bg-orange-200 transition-all text-white w-12 uppercase flex-end"
          >
            <PersonAddOutlined />
          </button>
        </div>
      </div>
      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
         <table className=" w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-16">#</th>
              <th >Nombre</th>
              <th >Apellidos</th>
              <th >Dirección</th>
              <th >Estado</th>
              <th className="  font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <ClientsRow key={el.id} index={index} client={el} />
            ))}
          </tbody>
        </table> 
      </div>
    </div>
  );
};

export default Usuarios;
