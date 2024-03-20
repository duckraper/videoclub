import React from "react";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNoHere } from "../../app/slices/TipoActivo.slice";
import { useGetRentsQuery} from "../../app/services";
import RentRow from "../tableBody/RentRow";

const Rentas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isSuccess } = useGetRentsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const [exist, setExist] = React.useState([]);

  React.useEffect(() => {
    if (isSuccess) {
      setExist(data);
    }
  }, [isSuccess]);

  return (
    <div className=" px-16 mb-20">
      <div className="flex-row flex w-full p-6">
        <div className="w-2/3 flex items-center">
          <h1 className="font-bold antialiased text-2xl text-inherit">
            Préstamos
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
            <AddShoppingCartOutlined />
          </button>
        </div>
      </div>
      {exist.length > 0 ? (
        <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
          <table className=" w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-2 px-4 w-16">#</th>
                <th className="font-sans">Cliente</th>
                <th className="font-sans">Soporte</th>
                <th className="font-sans">Activo</th>
                <th className="font-sans">Fecha del Préstamo</th>
                <th className="font-sans">Costo del Préstamo</th>
                <th className=" font-sans font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((el, index) => (
                <RentRow key={el.id} index={index} renta={el} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        "No hay soportes actualmente"
      )}
    </div>
  );
};

export default Rentas;
