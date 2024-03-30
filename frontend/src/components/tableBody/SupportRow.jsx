import React from "react";
import Swal from "sweetalert2";
import {
  useBajaSupportMutation,
  useGrabarSupportMutation,
  useGetFilmsQuery,
} from "../../app/services";

const SupportRow = ({ index, soporte }) => {
  const [deleteSuport] = useBajaSupportMutation();

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
  const { data: films } = useGetFilmsQuery({ filterParams: { search: "" } });
  const [titulos, setTitulos] = React.useState({});
  React.useEffect(() => {
    if (films) {
      const newTitulos = {};
      films.forEach((dat) => {
        newTitulos[dat.id] = dat.titulo;
      });
      setTitulos(newTitulos);
    }
  }, [films]);

  const [grabarSupport, { isSuccess, isError, error }] =
    useGrabarSupportMutation();
  const handleGrabar = async (soporte) => {
    const { value: selectedFilm } = await Swal.fire({
      title: "Seleccionar película",
      input: "select",
      inputOptions: titulos,
      inputPlaceholder: "Selecciona una película",
      showCancelButton: true,
      confirmButtonText: "Grabar",
      confirmButtonColor: "orange",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes seleccionar una película";
        }
      },
    });
    if (selectedFilm) {
      await grabarSupport({
        id: soporte,
        pelicula: selectedFilm,
      });
      if (isSuccess) {
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha grabado la película correctamente `,
        });
      } else if (Error) {
        Toast.fire({
          icon: "error",
          iconColor: "orange",
          title: `Ha ocurrido un error al grabar la película, verifique la capacidad del soporte `,
        });
      }
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
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha eliminado el soporte correctamente `,
        });
      }
    });
  };

  const handleInfo = (soporte) => {
    if (soporte) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
                <p>Tipo de soporte: ${soporte.tipo_de_soporte}</p> <br>
                <p>Estado: ${soporte.estado}</p> <br>
                <p>Disponible: ${soporte.disponible ? "Si" : "No"}</p> <br>
                <p>Cantidad de prestamos: ${soporte.cant_prestamos}</p> <br>
                <p>Cantidad de películas grabadas: ${
                  soporte.cant_peliculas_grabadas
                }</p> <br>
                <p>Costo de adquisición: ${soporte.costo_adquisicion}</p> <br>
                ${
                  soporte.peliculas.length !== 0
                    ? `<div class = "flex justify-center px-20 ">
                    <table class = "w-full"> 
                    <thead class = "w-full">
                      <tr >
                        <th class = "w-full bg-slate-200 py-1.5">Soportes:</th>
                      </tr>
                    </thead> 
                    <tbody class = "w-full"> 
                      ${soporte.peliculas
                        .map(
                          (soporte) => `
                        <tr class = "w-full bg-slate-100 hover:bg-slate-300"> 
                          <td class = "w-full" > 
                            <a href="/home/Dashboard/Soportes/" >${soporte}</a>`
                        )
                        .join("")}
                          </td>
                        </tr>
                    </tbody>
                  </table>
                  </div>`
                    : "Ningún soporte tiene esta película"
                }
                
               `,
        focusConfirm: false,
        confirmButtonText: `<span><svg xmlns="http://www.w3.org/2000/svg" height="24" fill="white" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></span>`,
        confirmButtonColor: "red",
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="white" viewBox="0 -960 960 960" width="24"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>`,
        denyButtonColor: "orange",
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(soporte.id);
        } else if (result.isDenied) {
          handleGrabar(soporte.id);
        }
      });
    }
  };

  let disponible = soporte.disponible ? "Disponible" : "No disponible";

  return (
    <tr
      className={`border-b text-gray-500 ${
        !soporte.disponible && "bg-gray-200"
      } hover:bg-gray-50`}
      onClick={() => handleInfo(soporte)}
    >
      <td className="py-3 text-left px-4">{soporte.no_serie}</td>
      <td>{`${soporte.tipo_de_soporte}`}</td>
      <td className="pl-5 py-3">{soporte.estado}</td>
      <td>{disponible}</td>
      <td className="pl-10">{soporte.cant_prestamos}</td>
      <td className="pl-10">{soporte.cant_peliculas_grabadas}</td>
      {soporte.peliculas.length != 0 ? (
        <td>{soporte.peliculas[0]}</td>
      ) : (
        <td>No hay películas</td>
      )}
      <td>{soporte.costo_adquisicion}</td>
    </tr>
  );
};

export default SupportRow;
