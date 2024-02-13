import react from "react";
const Film = () => {
    return (
        <div className=" bg-gray-100 p-5 border border-blue-100 rounded-lg shadow-xl m-8 h-72 hover:bg-green-50 hover:to-current transition-all ">
            <img src="" alt="Portada" className=" w-5/6 h-1/2" />
            <h1>Titulo</h1>
            <p>Categoria</p>
            <p>Descripcion</p>
            <p>Formato</p>
            <p>Precio</p>
        </div>
    );
};

export default Film;
