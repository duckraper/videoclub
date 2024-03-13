import React from "react";
import Swal from "sweetalert2";
import { PersonRemoveOutlined, EditOutlined } from "@mui/icons-material";
import { useDeleteUserMutation } from "../../app/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const UserRow = ({ index, user }) => {
  const [deleteUser, { isSuccess, isError, isLoading, error }] =
    useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const id = localStorage.getItem("id"); 
  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas al usuario: "${user.username}", esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(user.id);
      }
    });
  };
  let role = "";
  if (user.is_staff) {
    role = "Administador";
  } else if (!user.is_staff) {
    role = "Dependiente";
  }
  const handleClickEdit = async () => {
    dispatch(setEdit(user));
    dispatch(setNoHere(false));
    navigate(`editar/${user.id}`);
  };
  return (
    <tr className="border-b text-gray-500">
      {id !== user.id && <th className="py-3 text-left px-4 text-black">{index + 1}</th>}
      {id !== user.id && <td>{`${user.username}`}</td>}
      {id !== user.id && <td>{user.email}</td>}
      {id !== user.id && <td>{role}</td>}

      {id !== user.id && <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
              Editar Trabajador
            </span>
            <EditOutlined
              onClick={handleClickEdit}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Eliminar Trabajador
            </span>
            <PersonRemoveOutlined
              onClick={handleDelete}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
        </div>
      </td>}
    </tr>
  );
};

export default UserRow;
