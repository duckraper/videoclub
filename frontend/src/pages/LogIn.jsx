import React from "react";
import imagen from "../images/Designer.png";
import Formlogin from "../components/Formlogin";
import logo from "../images/logo.png";
export default function LogIn() {
    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-14 px-4 bg-white shadow-md">
                <img src={logo} alt="logotipo" className="h-full"/>
            </header>
            <div className="flex flex-col gap-4 min-h-screen justify-center px-4 text-center md:gap-10 md:px-6 lg:gap-16 xl:gap-20 bg-white">
                <div className="space-y-4">
                    <div className="space-y-2 mb-14 px-36" >
                        <img
                            alt="Video Store"
                            className="mx-auto w-full h-96 opacity-90 rounded-lg mt-14"
                            src={imagen}
                        />
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-4xl mb-8 anima">
                            Bienvenido a la tienda de vídeos
                        </h1>
                        <p className="mx-auto max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 ">
                            Administre su videoclub con facilidad utilizando
                            nuestras poderosas herramientas administrativas.
                        </p>
                        <Formlogin />
                    </div>
                </div>
            </div>
        </>
    );
}
