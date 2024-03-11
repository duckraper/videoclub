import React from "react";
import { useDispatch } from "react-redux";
import { useGetFilmsQuery } from "../../app/services";
import FilmsRow from "../tableBody/FilmsRow";

const Usuarios = () => {
//   const dispatch = useDispatch();
  const { data } = useGetFilmsQuery(undefined, {
    refetchOnReconnect: true,
  });

  return (
    <div className=" px-16 ">
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex items-center">
          <h1 className="font-bold antialiased text-2xl text-inherit font-mono">
            Películas
          </h1>
        </div>
        {/* <div className="w-1/3 flex justify-end"> */}
          {/* <button
            onClick={() => {
              dispatch(setNoHere(false));
              navigate(ADD_USUARIO_URL);
            }}
            className="btn btn-primary p-0 m-0 w-32 uppercase flex-end"
          >
            agregar
          </button>
        </div> */}
      </div>
      <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
        <table className=" w-full">
          {/* <!-- head --> */}
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-2 px-4 w-16">#</th>
              <th className="font-sans">Titulo</th>
              <th className="font-sans">Género</th>
              <th className="font-sans">Duración</th>
            <th className="font-sans">Precio</th>
              <th className=" font-sans font-bold text-center">Acciones</th>
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