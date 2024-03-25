import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useDeleteFilmMutation, useGetSupportsQuery } from "../../app/services";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const FilmsRow = ({ index, film }) => {
  const [deleteFilm, { isSuccess, isError, isLoading, error }] =
    useDeleteFilmMutation();
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
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha eliminado la correctamente `,
        });
      }
    });
  };

  const handleClickEdit = async () => {
    dispatch(setEdit(film));
    dispatch(setNoHere(false));
    navigate(`editar/${film.id}`);
  };
 const soportes = film.soportes.map((sop) => {
    return sop.no_serie;
  
 }) 

 const handleInfo = (film) => {
    if (film) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
               Título: ${film.titulo} <br><br>
               Director: ${film.director} <br><br>
               Género: ${film.genero} <br><br>
               Clasificación de edad: ${film.clasif_edad} <br><br>
               Duración: ${film.duracion} min <br><br>
               Precio: $${film.precio} <br><br>
               Fecha de estreno: ${film.fecha_estreno} <br><br>
               Tamaño: ${film.tamanio} GB <br><br>
               Estreno: ${film.estreno ? "si": "no"} <br><br>
               Soportes: ${film.soportes.length != 0 ? soportes : "Ningún soporte tiene esta película"} <br><br>
               `,
               focusConfirm: false,
               confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" style = {{color: "white"}} viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`,
               confirmButtonColor: "red",
               showCloseButton: true,
               showDenyButton: true,
               denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`, 
               denyButtonColor: "orange",
               
             }).then((result) => {
               if (result.isConfirmed) {
                  handleDelete(film.id);
               }
               else if (result.isDenied) {
                  handleClickEdit(film.id);
               }
           });
    }
  };


  return (
    <tr className="border-b text-gray-500 overflow-x-hidden hover:bg-gray-50 " onClick={() => handleInfo(film)}>
      <td className="py-3 text-left px-4 w-2/5">{`${film.titulo}`}</td>
      <td>{film.genero}</td>
      <td className="pl-10">{film.clasif_edad}</td>
      <td className="pl-9 ">{film.duracion}</td>
      <td>{film.precio}</td>
    </tr>
  );
};

export default FilmsRow;
