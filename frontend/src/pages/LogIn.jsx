import React from "react";
import imagen from "../images/Designer.png";
import Formlogin from "../components/Formlogin";
import logo from "../images/logo.png";
export default function LogIn() {
    return (
        <>
           
            <div className="flex flex-col gap-4 min-h-screen justify-center px-4 text-center md:gap-10 md:px-6 lg:gap-16 xl:gap-20 bg-white">
                <div className="space-y-4">
                    <div className="space-y-2 mb-14 px-36" >
                        <img
                            alt="Video Store"
                            className="mx-auto w-auto h-auto opacity-90 rounded-lg "
                            src={imagen}
                        />
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-4xl mb-8 anima">
                            Bienvenido a la tienda de vídeos
                        </h1>
                        <p className="mx-auto max-w-full text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 ">
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
