import React from "react";
import { InfoOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useBajaSupportMutation, useGrabarSupportMutation, useGetFilmsQuery } from "../../app/services";

const SupportRow = ({ index, soporte }) => {
  const [deleteSuport] =
    useBajaSupportMutation();

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });  
  const { data: films } = useGetFilmsQuery();
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
 
  
  const [grabarSupport] = useGrabarSupportMutation();
  const handleGrabar = async (soporte) => {
    const { value: selectedFilm } = await Swal.fire({
      title: 'Seleccionar película',
      input: 'select',
      inputOptions: titulos,
      inputPlaceholder: 'Selecciona una película',
      showCancelButton: true,
      confirmButtonText: 'Grabar',
      confirmButtonColor: 'orange',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar una película';
        }
      },
    });

    if (selectedFilm) {
      await grabarSupport({
        id:soporte,
        pelicula: selectedFilm
      });
      Toast.fire({
        icon: "success",
        iconColor: "orange",
        title: `Se ha grabado la película correctamente `,
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
                <p>Cantidad de películas grabadas: ${soporte.cant_peliculas_grabadas}</p> <br>
                <p>Películas: ${soporte.peliculas}</p> <br>
                <p>Costo de adquisición: ${soporte.costo_adquisicion}</p> <br>
                
               `,
        focusConfirm: false,
        confirmButtonText: `Borrar Soporte`,
        confirmButtonColor: "red",
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: `Copiar Película`, 
        denyButtonColor: "orange",
        
      }).then((result) => {
        if (result.isConfirmed) {
           handleDelete(soporte.id);
        }
        else if (result.isDenied) {
           handleGrabar(soporte.id);
        }
    })}
  };

    let disponible = soporte.disponible ? "Disponible" : "No disponible";
   
  return (
    <tr className="border-b text-gray-500">
      <td className="opacity-5 hover:opacity-100 py-3" >
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
        </div>
      </td>
      <td>{soporte.no_serie}</td>
      <td>{`${soporte.tipo_de_soporte}`}</td>
      <td className="pl-5">{soporte.estado}</td>
      <td>{disponible}</td>
      <td className="pl-10">{soporte.cant_prestamos}</td>
      <td className="pl-10">{soporte.cant_peliculas_grabadas}</td>
      {soporte.peliculas.length != 0 ? <td>{soporte.peliculas[0]}</td>: <td>No hay películas</td>}
      <td>{soporte.costo_adquisicion}</td>

    </tr>
  );
};

export default SupportRow;