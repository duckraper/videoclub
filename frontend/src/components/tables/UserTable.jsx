import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../app/services";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";
import UserRow from "../tableBody/UserRow";
import { PersonAddOutlined } from "@mui/icons-material";

const Usuarios = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valor, setValor] = React.useState("");
  const { data } = useGetUsersQuery({
    filterParams: { search: valor },
    refetchOnReconnect: true,
  });

  React.useEffect(() => {
    dispatch(setEdit(null));
  }, []);

  return (
    <div className=" px-16 mb-20">
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex items-center">
          <h1 className="font-bold text-2xl text-inherit ">Trabajadores</h1>
        </div>
        <div className="w-1/3 flex justify-end mt-20">
          <button
            onClick={() => {
              dispatch(setNoHere(false));
              navigate("Agregar/");
            }}
            className=" rounded-full shadow-sm bg-orange-300 hover:bg-orange-200 transition-all text-white w-12 uppercase flex-end"
          >
            <PersonAddOutlined />
          </button>
        </div>
      </div>
      <form className="pb-5 flex flex-row relative">
        <input
          type="text"
          className="w-1/4 p-1 px-4 border-2 border-gray-200 rounded-lg pl-8 "
          placeholder="  Buscar Usuario"
          value={valor}
          onChange={(e) => {
            setValor(e.target.value);
          }}
        />
        <span className=" pt-2.5 pl-2 absolute">
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

      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-1/4">Nombre de usuario</th>
              <th className="w-1/4">Nombre</th>
              <th className="w-1/4">Apellidos</th>
              <th className="w-1/4">Correo</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <UserRow key={el.id} index={index} user={el} />
            ))}
            {data?.length === 0 && (
              <tr>
                <td className="text-center">Ninguna coincdencia</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
