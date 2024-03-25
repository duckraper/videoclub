import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../../app/services";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";
import ClientsRow from "../tableBody/ClientsRow";
import { PersonAddOutlined } from "@mui/icons-material";

const Clientes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetClientsQuery(undefined, {
    refetchOnReconnect: true,
  });
  const [exist, setExist] = useState([]);

  useEffect(() => {
   if(isSuccess){setExist(data);}
  }, [isSuccess])

    useEffect(() => {
      dispatch(setEdit(null));
    }, []);

return (
    <div className=" px-16 mb-20">
     <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex flex-col">
          <h1 className="font-bold text-2xl text-black ">Clientes</h1>
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
      {exist.length >0 ? <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
         <table className=" w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className=" p-2 px-4" >Nombre</th>
              <th >Apellidos</th>
              <th >Inscrito desde</th>
              <th>Prestamos</th>
              <th >Estado</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <ClientsRow key={el.id} index={index} client={el} />
            ))}
          </tbody>
        </table> 
      </div> : "No hay clientes Actualmente"}
    </div>
  );
};

export default Clientes;
