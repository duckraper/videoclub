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
  const [valor, setValor] = useState("");
  const { data, isSuccess } = useGetClientsQuery({
    refetchOnReconnect: true,
    filterParams: { search: valor },
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
      <form className="pb-5 flex flex-row relative">
        <input
          type="text"
          className="w-1/4 p-1 px-4 border-2 border-gray-200 rounded-lg "
          placeholder="  Buscar Cliente"
          value={valor}
          onChange={(e) => {
            setValor(e.target.value);
          }}
        />
        <span className=" pt-2.5 pl-1 absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </span>
      </form>

      {exist.length >0 ? <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
         <table className=" w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className=" p-2 px-4 w-1/5" >Nombre</th>
              <th className="w-1/5">Apellidos</th>
              <th className="w-1/5">Inscrito desde</th>
              <th className="w-1/5">Préstamos</th>
              <th className="w-1/5">Dirección</th>
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
