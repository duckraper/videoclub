import FilmList from "./FilmList";
function Header() {
    return (
        <div>
            {" "}
            <div className=" flex flex-row justify-between bg-blue-600 sm:w-screen shadow-xl border-t-8 border-b-8 border-black border-dashed items-center">
                <h1 className="font-black text-5xl sm:w-1/5  lg:w-1/5 p-5">
                    Video
                    <span className="text-white">Clubapp</span>
                </h1>
                <nav className="flex flex-row right-3">
                    <button className="font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all">
                        Categorias
                    </button>
                    <button className="font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all">
                        Estreneos
                    </button>
                    <button className="font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all">
                        Rebajas
                    </button>
                    <button className="font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all">
                        Locales
                    </button>
                    <button className="font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all">
                        Buscar
                    </button>
                </nav>
            </div>
            <FilmList />
        </div>
    );
}

export default Header;
