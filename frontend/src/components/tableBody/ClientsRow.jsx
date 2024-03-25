import React from "react";
import Swal from "sweetalert2";
import {
  useDeleteClientMutation,
  useCreateInvalidClientMutation,
  useGetClientByIdQuery
} from "../../app/services";
import {
  PersonRemoveOutlined,
  EditOutlined,
  FiberManualRecord,
  PersonOffOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { setEdit, setNoHere } from "../../app/slices/TipoActivo.slice";

const ClientRow = ({ index, client }) => {
  const [deleteClient, { isSuccess, isError, isLoading, error }] =
    useDeleteClientMutation();
  const [invalidar] = useCreateInvalidClientMutation();
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
      text: `¡Si eliminas al cliente ${client.nombre}, esta acción no se podrá revertir!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
          await deleteClient(client.id);
        Toast.fire({
          icon: "success",
          iconColor: "orange",
          title: `Se ha eliminado el cliente correctamente `,
        });
      }
      
    });
    
  };

  const formInvalidar = async (client) => {
    const { value: motivo } = await Swal.fire({
      title: 'Motivo de invalidación',
      input: 'text',
      inputLabel: 'Motivo',
      inputPlaceholder: 'Ingrese el motivo de la invalidación',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: 'orange',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un motivo';
        }
      },
    });

    if (motivo) {
      await invalidar({
        id: client,
        motivo: motivo,
      });
    }
  };

  const handleInvalidar = async (client) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Invalidar al cliente, lo sacará de esta lista!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, invalidar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await formInvalidar(client);
      }
    });
  };

  const handleClickEdit = async () => {
    dispatch(setEdit(client));
    dispatch(setNoHere(false));
    navigate(`editar/${client.id}`);
  };

  const extra  = (client) => {
    if (client) {
      Swal.fire({
        title: "<strong>Info</strong>",
        text: `¿Desea eliminar, o invalidar al cliente ${client.nombre}?`,
        focusConfirm: false,
        confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" style = {{color: "white"}} viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`,
        confirmButtonColor: "red",
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M791-55 686-160H160v-112q0-34 17.5-62.5T224-378q45-23 91.5-37t94.5-21L55-791l57-57 736 736-57 57ZM240-240h366L486-360h-6q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm496-138q29 14 46 42.5t18 61.5L666-408q18 7 35.5 14t34.5 16ZM568-506l-59-59q23-9 37-29.5t14-45.5q0-33-23.5-56.5T480-720q-25 0-45.5 14T405-669l-59-59q23-34 58-53t76-19q66 0 113 47t47 113q0 41-19 76t-53 58Zm38 266H240h366ZM457-617Z"/></svg>`, 
        denyButtonColor: "orange",
               
             }).then((result) => {
               if (result.isConfirmed) {
                  handleDelete(client.id);
               }
               else if (result.isDenied) {
                  handleInvalidar(client.id);
               }
           });
    }
  };
//TODO terminar el invalidar
  const handleInfo = (client) => {
    if (client) {
      Swal.fire({
        title: "<strong>Info</strong>",
        html: `
               Nombre: ${client.nombre} ${client.apellidos} <br><br>
               Edad: ${client.edad} <br><br>
               CI: ${client.ci} <br><br>
               Teléfono: ${client.telefono} <br><br>
               Fecha de registro: ${client.fecha_registro} <br><br>
               Soportes alquilados: ${client.cant_soportes_alquilados} <br><br>
               Invalidado: ${client.invalidado ? "Si" : "No"} <br><br>
               Es fijo: ${client.es_fijo ? "Si" : "No"} <br><br>
               Dirección: ${client.direccion} <br><br>
               Provincia: ${client.provincia} <br><br>`,               
               focusConfirm: false,
               confirmButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>`,
               confirmButtonColor: "red",
               showCloseButton: true,
               showDenyButton: true,
               denyButtonText: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`, 
               denyButtonColor: "orange",
               
             }).then((result) => {
               if (result.isConfirmed) {
                  extra(client);
               }
               else if (result.isDenied) {
                  handleClickEdit(client.id);
               }
           });
    }
  };



  return (
    <tr className="border-b text-gray-500 hover:bg-gray-50" onClick={()=>handleInfo(client)}>
      <td className="py-3 text-left px-4">{`${client.nombre}`}</td>
      <td>{client.apellidos}</td>
      <td className="pl-3">{client.fecha_registro}</td>
      <td className="pl-8">{client.cant_soportes_alquilados}</td>
      {client.es_fijo && 
      <td className=" pl-5">
          <FiberManualRecord
            style={{
              fontSize: "small",
              paddingBottom: "4px",
              color: "greenyellow",
            }}
          />   
      </td>
      }{client.invalidado && 
        <td className=" pl-5">
            <FiberManualRecord
              style={{
                fontSize: "small",
                paddingBottom: "4px",
                color: "red",
              }}
            />   
        </td>
        }
        {!client.es_fijo && !client.invalidado &&
      <td className=" pl-5">
          <FiberManualRecord
            style={{
              fontSize: "small",
              paddingBottom: "4px",
              color: "gray",
            }}
          />   
      </td>
      }
    </tr>
  );
};

export default ClientRow;
