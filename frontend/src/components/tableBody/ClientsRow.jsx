import React from "react";
import Swal from "sweetalert2";
import {
  useDeleteClientMutation,
  useCreateInvalidClientMutation,
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
    timer: 5000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleDelete = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Si eliminas al cliente: ${client.nombre}, esta acción no se podrá revertir!`,
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
        confirmButtonText: `ok`,
        confirmButtonColor: "orange",
      });
    }
  };

  const handleInvalidar = async (client) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¡Invalidar al cliente: ${(client.nombre)}, lo sacara de esta lista!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "¡Si, invalidar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await invalidar(client.id,{
        motivo: "Invalidado por el administrador",
        });
      }
    });
  };

  const handleClickEdit = async () => {
    dispatch(setEdit(client));
    dispatch(setNoHere(false));
    navigate(`editar/${client.id}`);
  };

  return (
    <tr className="border-b text-gray-500">
      <th className="py-3 text-left px-4 text-black">{index + 1}</th>
      <td>{`${client.nombre}`}</td>
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

      <td>
        <div className="flex flex-row w-100% justify-center items-center space-x-2">
        <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Info cliente
            </span>
            <InfoOutlined
              onClick={()=>handleInfo(client)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-yellow-400 -mt-6">
              Editar Cliente
            </span>
            <EditOutlined
              onClick={handleClickEdit}
              className="text-black mx-1 w-5 h-5 hover:text-yellow-400 transition-all"
            />
          </div>
          {!client.invalidado && 
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Invalidar Cliente
            </span>
            <PersonOffOutlined
              onClick={()=>handleInvalidar(client)}
              className="text-black mx-1 w-5 h-5 hover:text-red-400 transition-all"
            />
          </div>}
          <div className="hover:cursor-pointer has-tooltip">
            <span className="tooltip rounded shadow-sm p-1 text-xs bg-gray-100 text-red-400 -mt-6">
              Eliminar Cliente
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
