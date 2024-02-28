import React, { useState } from "react";
import imagen from "../images/fondo.png";
import Formlogin from "../components/Formlogin";
export default function LogIn() {
    const [users, setUsers] = useState([
        { username: "dep", password: "dep", role: "depe" },
        { username: "admin", password: "admin", role: "admini"},
    ]);
    const [log, setLog] = useState("");

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-12 px-4 bg-white shadow-md">
                <h1 className="text-lg font-bold ">Video Store</h1>
            </header>
            <div className="flex flex-col gap-4 min-h-screen justify-center px-4 text-center md:gap-10 md:px-6 lg:gap-16 xl:gap-20 bg-gray-50 animate-">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <img
                            alt="Video Store"
                            className="mx-auto w-2/3 h-44 rounded-lg mb-12"
                            src={imagen}
                        />
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-8 anima">
                            Bienvenido a la tienda de vídeos
                        </h1>
                        <p className="mx-auto max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 ">
                            Administre su videoclub con facilidad utilizando
                            nuestras poderosas herramientas administrativas.
                        </p>
                        <Formlogin users={users} setLog={setLog} />
                    </div>
                </div>
            </div>
        </>
    );
}
