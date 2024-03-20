import React from "react";
import { NoteAddOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSupportsQuery } from "../../app/services";
import { setNoHere } from "../../app/slices/TipoActivo.slice";
import SupportRow from "../tableBody/SupportRow";

const Support = () => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  
  const { data, isSuccess } = useGetSupportsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [exist, setExist] = React.useState([]);

  React.useEffect(() => {
   if(isSuccess){setExist(data);}
  }, [isSuccess])

  return (
    <div className=" px-16 mb-20" >
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex items-center">
          <h1 className="font-bold antialiased text-2xl text-inherit">
            Soportes
          </h1>
        </div>
        <div className="w-1/3 flex justify-end mt-16">
          <button
            onClick={() => {
              dispatch(setNoHere(false));
              navigate("Agregar/");
            }}
            className=" flex rounded-full shadow-sm justify-center bg-orange-300 hover:bg-orange-200 transition-all text-white w-12 uppercase flex-end"
          >
            <NoteAddOutlined />
          </button>
        </div>
      </div>
      {exist.length > 0 ?
      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full">
          
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-16">#</th>
              <th className="">Tipo</th>
              <th className="">Estado</th>
              <th className="">Disponibilidad</th>
              <th className="">Préstamos</th>
              <th className="">Películas</th>
              <th className="">titulo principal</th>
              <th className="">Precio</th>
              <th className="  font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <SupportRow key={el.id} index={index} soporte={el} />
            ))}
          </tbody>
        </table>
      </div>: "No hay soportes actualmente"}
    </div>
  );
};

export default Support;