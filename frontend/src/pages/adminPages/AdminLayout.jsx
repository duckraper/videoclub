import {
    HomeOutlined,
    Inventory2Outlined,
    CameraOutdoorOutlined,
    PeopleAltOutlined,
    ShoppingCartOutlined,
    Person2Outlined,
} from "@mui/icons-material";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import UserDropDown from "../../components/UserDropDown";


export default function AdminView() {
    const location = useLocation();
    return (
        <div className="flex w-full bg-gray-100 ">
            <div>
                <div className="flex flex-col items-center p-2 h-full">
                    <NavLink
                    to="/admini/Dashboard">
                        <div className="flex items-center gap-1 text-2xl font-semibold pb-10">
                            <CameraOutdoorOutlined
                                style={{ fontSize: "xx-large" }}
                            />
                            <span className="pt-2">Films</span>
                        </div>
                    </NavLink>
                    <nav className="flex items-start p-4 text-sm font-medium">
                        <div className="grid gap-10 pt-8">
                            <NavLink
                                className={
                                    location.pathname === "/admini/Dashboard"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/admini/Dashboard"
                            >
                                <HomeOutlined />
                                Dashboard
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/admini/Dashboard/Inventario"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Inventario"
                            >
                                <Inventory2Outlined />
                                Inventario
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/admini/Dashboard/Trabajadores"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-2.5  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Trabajadores"
                            >
                                <PeopleAltOutlined />
                                Trabajadores
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/admini/Dashboard/Rentas"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Rentas"
                            >
                                <ShoppingCartOutlined />
                                Rentas
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/admini/Dashboard/Clientes"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4 border-r-4 border-orange-400 transition-all"
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="Clientes"
                            >
                                <Person2Outlined />
                                Clientes
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-12 items-center gap-4 px-6 justify-end">
                    <UserDropDown />
                </header>
                <div className="h-screen w-full bg-gray-50 border-r rounded-lg shadow-xl overflow-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
