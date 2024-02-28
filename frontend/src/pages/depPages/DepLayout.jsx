import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
    HomeOutlined,
    CameraOutdoorOutlined,
    ShoppingCartOutlined,
    PersonOutlineOutlined,
    MovieOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import UserDropDown from "../../components/UserDropDown";

export default function Component() {
    const location = useLocation();
    return (
        <div className="flex w-full bg-gray-100 ">
            <div className=" lg:block ">
                <div className="flex flex-col items-center p-2 h-full">
                    <div className="flex items-center gap-1 text-2xl font-semibold pb-10 ">
                        <NavLink
                            className="flex items-center gap-2 font-semibold"
                            to="/depe/Dashboard"
                        >
                            <CameraOutdoorOutlined
                                style={{ fontSize: "xx-large" }}
                            />
                            <span className="pt-2">Films</span>
                        </NavLink>
                    </div>

                    <nav className="flex items-start p-4 text-sm font-medium">
                        <div className="grid gap-10 pt-8">
                            <NavLink
                                className={
                                    location.pathname === "/depe/Dashboard"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/depe/Dashboard"
                            >
                                <HomeOutlined className="h-4 w-4" />
                                Dashboard
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/depe/Dashboard/Clientes"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/depe/Dashboard/Clientes"
                            >
                                <PersonOutlineOutlined className="h-4 w-4" />
                                Clientes
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/depe/Dashboard/Peliculas"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/depe/Dashboard/Peliculas"
                            >
                                <MovieOutlined className="h-4 w-4" />
                                Pel&iacute;culas
                            </NavLink>
                            <NavLink
                                className={
                                    location.pathname ===
                                    "/depe/Dashboard/Rentas"
                                        ? "flex items-center gap-3 text-xl text-orange-400 pl-3 pr-4  border-r-4 border-orange-400 transition-all "
                                        : "flex items-center gap-3 text-xl px-3  text-orange-400 transition-all hover:text-yellow-900"
                                }
                                to="/depe/Dashboard/Rentas"
                            >
                                <ShoppingCartOutlined className="h-4 w-4" />
                                Rentas
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <header className="flex h-12 justify-end items-center gap-4  px-6 ">
                    <div className="">
                        <form>
                            <div className="bg-white w-60 flex flex-row rounded-md p-1">
                                <SearchOutlined />
                                <input
                                    placeholder={"Buscar el amor..."}
                                    type="search"
                                    className=" outline-none"
                                />
                            </div>
                        </form>
                    </div>
                    <UserDropDown />
                </header>
                <div className="h-screen w-full bg-gray-50 border-r rounded-lg shadow-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
