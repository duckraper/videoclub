import React from "react";
import { useDispatch } from "react-redux";
import { useGetFilmsQuery } from "../../app/services";
import FilmsRow from "../tableBody/FilmsRow";
import { PersonAddOutlined } from "@mui/icons-material";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useGetFilmsQuery(undefined, {
    refetchOnReconnect: true,
  });

  return (
    <div className=" px-16 ">
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex flex-col">
          <h1 className="font-bold text-2xl text-black ">Películas</h1>
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
        <table className=" w-full overflow-x-hidden">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-16 text">#</th>
              <th className=" w-1/4" >Titulo</th>
              <th >Género</th>
              <th >Clasificación</th>
              <th >Duración (min)</th>
            <th >Precio</th>
              <th className="  font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <FilmsRow key={el.id} index={index} film={el} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;