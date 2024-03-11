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
  const { data } = useGetUsersQuery(undefined, {
    refetchOnReconnect: true,
  });

  React.useEffect(() => {
    dispatch(setEdit(null));
  }, []);

  return (
    <div className=" px-16">
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
      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-16">#</th>
              <th className="">Nombre</th>
              <th className="">Correo</th>
              <th className="">Role</th>
              <th className="font-bold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <UserRow key={el.id} index={index} user={el} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;
