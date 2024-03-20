import React from "react";
import { DeleteOutlineOutlined, NoteAddOutlined, InfoOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useBajaSupportMutation } from "../../app/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const SupportRow = ({ index, soporte }) => {
  const [deleteSuport, { isSuccess, isError, isLoading, error }] =
    useBajaSupportMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleInfo = (soporte) => {
    if (soporte) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
                Tipo de soporte: ${soporte.tipo_de_soporte} <br><br>

                Estado: ${soporte.estado} <br><br>
                Disponible: ${soporte.disponible ? "Si" : "No"} <br><br>
                Cantidad de prestamos: ${soporte.cant_prestamos} <br><br>
                Cantidad de películas grabadas: ${soporte.cant_peliculas_grabadas} <br><br>
                Película: ${soporte.peliculas[0].titulo } <br><br>
                Costo de adquisición: ${soporte.costo_adquisicion} <br><br>
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
      text: `¡Si das de baja al soporte: ${soporte.tipo_de_soporte} seleccionado , esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSuport(soporte.id);
      }
    });
  };  

    const handleCopy = async () => {
      dispatch(setEdit(soporte));
      dispatch(setNoHere(false));
      navigate(`copiar/${soporte.id}`);
    }

    let disponible = soporte.disponible ? "Disponible" : "No disponible";
   
  return (
    <tr className="border-b text-gray-500">
      <th className="py-3 text-left px-4 text-black">{index + 1}</th>
      <td>{`${soporte.tipo_de_soporte}`}</td>
      <td className="pl-5">{soporte.estado}</td>
      <td>{disponible}</td>
      <td className="pl-10">{soporte.cant_prestamos}</td>
      <td className="pl-10">{soporte.cant_peliculas_grabadas}</td>
      <td>{soporte.peliculas[0].titulo}</td>
      <td>{soporte.costo_adquisicion}</td>
  
      <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
        <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Info soporte
            </span>
            <InfoOutlined
              onClick={()=>handleInfo(soporte)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
              Copiar Película
            </span>
            <NoteAddOutlined
              onClick={handleCopy}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Dar de baja
            </span>
            <DeleteOutlineOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default SupportRow;