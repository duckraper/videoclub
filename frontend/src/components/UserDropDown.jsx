import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { logoutState } from "../app/slices/Auth.slice";
import { useLogoutMutation } from "../app/services";
import { useDispatch,} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../app/services";
import Swal from "sweetalert2";
import { setEdit, setNoHere } from "../app/slices/TipoActivo.slice";


export default function AccountMenu() {
    const id = sessionStorage.getItem("id");
    const [name, setName] = React.useState("");
    const {data}= useGetUserByIdQuery(id);
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const Navigate = useNavigate();

    const handleClickEdit = async () => {
        dispatch(setEdit(data));
        dispatch(setNoHere(false));
        Navigate(`Trabajadores/editar/${data.id}`);
      };

    let char = name.charAt(0).toUpperCase()
   
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
       setAnchorEl(null);
       
    };
     
    React.useEffect(() => {
        if (data) {
            setName(data.username);
            
        }
        char = name.charAt(0).toUpperCase()
            console.log(char)
    }, [data]);

    
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    
    const logoutUser = async () => {
        await logout()
            .unwrap()
            .then(() => {
             dispatch(logoutState());
            Navigate("/")
            Toast.fire({
                icon: "success",
                iconColor: "orange",
                title: "Sesión cerrada correctamente"
              });
            });
        };
        
    
    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Opciones">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        
                    >
                        <Avatar sx={{ width: 32, height: 32 }} className=" border-orange-400 border-2">{char}</Avatar>
                    </IconButton>
                </Tooltip>
                
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{ paper: {
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClickEdit}>
                    <Avatar /> {name} 
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Cerrar Sesión
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
