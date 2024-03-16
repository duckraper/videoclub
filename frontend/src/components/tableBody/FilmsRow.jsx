import React from "react";
import Swal from "sweetalert2";
import { useDeleteFilmMutation } from "../../app/services";
import { PersonRemoveOutlined, EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const ClientRow = ({ index, film }) => {
  const [deleteFilm, { isSuccess, isError, isLoading, error }] =
    useDeleteFilmMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas la película: "${film.username}", esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFilm(film.id);
      }
    });
  };

  const handleClickEdit = async () => {
    dispatch(setEdit(film));
    dispatch(setNoHere(false));
    navigate(`editar/${film.id}`);
  };

  return (
    <tr className="border-b text-gray-500 overflow-x-hidden ">
      <th className="py-3 text-left px-4 text-black">{index + 1}</th>
      <td className="">{`${film.titulo}`}</td>
      <td>{film.genero}</td>
      <td className="pl-10">{film.clasif_edad}</td>
      <td className="pl-9 ">{film.duracion}</td>
      <td>{film.precio}</td>

      <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
              Editar Película
            </span>
            <EditOutlined
              onClick={handleClickEdit}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Eliminar Película
            </span>
            <PersonRemoveOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ClientRow;
