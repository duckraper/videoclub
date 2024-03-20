import React from "react";
import Swal from "sweetalert2";
import { useDeleteFilmMutation } from "../../app/services";
import { CancelPresentationOutlined, EditOutlined, InfoOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const FilmsRow = ({ index, film }) => {
  const [deleteFilm, { isSuccess, isError, isLoading, error }] =
    useDeleteFilmMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

 const handleInfo = (film) => {
    if (film) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
               Titulo: ${film.titulo} <br><br>
               Director: ${film.director} <br><br>
               Género: ${film.genero} <br><br>
               Clasificación de edad: ${film.clasif_edad} <br><br>
               Duración: ${film.duracion} min <br><br>
               Precio: $${film.precio}.00 <br><br>
               Fecha de estreno: ${film.fecha_estreno} <br><br>
               Tamaño: ${film.tamanio} GB <br><br>
               Estreno: ${film.estreno ? "si": "no"} <br><br>
               Soportes: ${film.soportes} <br><br>
               `,
        focusConfirm: false,
        confirmButtonText: `ok`,
        confirmButtonColor: "orange",
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas la película: ${film.titulo}, esta acción no se podrá revertir!`,
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
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Info película
            </span>
            <InfoOutlined
              onClick={()=>handleInfo(film)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
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
            <CancelPresentationOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default FilmsRow;
