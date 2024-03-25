import React from "react";
import { useDispatch } from "react-redux";
import { useGetFilmsQuery } from "../../app/services";
import FilmsRow from "../tableBody/FilmsRow";
import { AddToQueueOutlined, PersonAddOutlined } from "@mui/icons-material";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";
import { useNavigate } from "react-router-dom";

const Films = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetFilmsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [exist, setExist] = React.useState([]);

  React.useEffect(() => {
   if(isSuccess){setExist(data);}
  }, [isSuccess])

  React.useEffect(() => {
    dispatch(setEdit(null));
  }, []);

  return (
    <div className=" px-16 mb-20">
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
            <AddToQueueOutlined />
          </button>
        </div>
      </div>
      {exist.length > 0 ? 
      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full overflow-x-hidden">
          <thead className="border-b">
            <tr className="text-left">
              <th className=" w-1/4 p-2 px-4" >Título</th>
              <th >Género</th>
              <th >Clasificación</th>
              <th >Duración (min)</th>
              <th >Precio</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <FilmsRow key={el.id} index={index} film={el} />
            ))}
          </tbody>
        </table>
      </div>: "No hay películas Actualmente"}
    </div>
  );
};

export default Films;