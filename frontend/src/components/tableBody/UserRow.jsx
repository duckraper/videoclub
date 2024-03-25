import React from "react";
import Swal from "sweetalert2";
import { useDeleteUserMutation } from "../../app/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const UserRow = ({ index, user }) => {
  const [deleteUser, { isSuccess, isError, isLoading, error }] =
    useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas al usuario: ${user.username}, esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteUser(user.id);
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha eliminado el usuario correctamente `,
        });
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

  const handleInfo = (user) => {
    if (user) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `Usuario: ${user.username} <br><br>
               Nombre: ${user.first_name} ${user.last_name} <br><br>
               Correo: ${user.email} <br><br>
               Rol: ${user.is_staff ? "Administrador" : "Dependiente"}`,
               focusConfirm: false,
               confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" style={{ fill: 'red' }} viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg`,
               confirmButtonColor: "red",
               showCloseButton: true,
               showDenyButton: true,
               denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`, 
               denyButtonColor: "orange",
               
             }).then((result) => {
               if (result.isConfirmed) {
                  handleDelete(user.id);
               }
               else if (result.isDenied) {
                  handleClickEdit(user.id);
               }
           });
    }
  };
  
   const id = localStorage.getItem("id"); 
 
  return (
    <tr className="border-b text-gray-500 hover:bg-gray-50" onClick={()=>{handleInfo(user)}}>
      {id != user.id && <td className="py-3 text-left px-4">{`${user.username}`}</td>}
      {id != user.id && <td>{user.first_name}</td>}
      {id != user.id && <td>{user.last_name}</td>}
      {id != user.id && <td>{user.email}</td>}
      {id != user.id && <td>{role}</td>}
    </tr>
  );
};

export default UserRow;
