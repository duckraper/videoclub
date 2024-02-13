import { useState } from "react";
import Error from "./Error";

const FormLogIn = ({ logged, setLogged, users, setUsers, user, setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handelSubmit = (e) => {
        e.preventDefault();
        if ([email, password].includes("")) {
            setError(true);
            return;
        }

        setError(false);
        setLogged(true);
    };

    return (
        <div className="flex flex-col content-center items-center">
            <legend className="font-bold text-gray-700 text-5xl uppercase mt-20 mb-10">
                Bienvenido<span className="text-6xl text-indigo-700">!</span>
            </legend>
            {error && <Error>Ambos campos son obligatorios</Error>}
            <form
                className="bg-white border-indigo-200 border-2 shadow-xl rounded-lg px-4  mx-4 md:w-1/3 md:h-80"
                onSubmit={handelSubmit}
            >
                <div className="mb-2 p-10">
                    <label
                        htmlFor="email"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Correo Electr&oacute;nico
                    </label>

                    <input
                        value={email}
                        type="email"
                        placeholder="Intruduzca su correo"
                        className="border-b border-indigo-600  w-full p-2 placeholder-gray-500 mb-4 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label
                        htmlFor="password"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Clave
                    </label>

                    <input
                        type="password"
                        placeholder="Intruduzca su Clave"
                        value={password}
                        className="border-b border-indigo-600  w-full p-2 placeholder-gray-500 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        className=" py-2 px-4 w-full
                         text-white font-bold text-xl uppercase
                         border-2 shadow-md rounded-md
                         bg-blue-500
                         hover:bg-blue-400 cursor-pointer transition-all mt-10"
                        type="submit"
                        value="Acceder"
                        // onSubmit={}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormLogIn;
