import { useState } from "react";
import Error from "./Error";

const FormCreate = ({ user, setUser, users, setUsers }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorPass, setErrorPass] = useState(false);

    const handelSubmit = (e) => {
        e.preventDefault();
        if ([name, lastName, email, password, validPassword].includes("")) {
            setError(true);
            setErrorPass(false);
            return;
        } else if (password != validPassword) {
            setErrorPass(true);
            setError(false);
            return;
        }
        setError(false);
        setErrorPass(false);

        const newUser = {
            name,
            lastName,
            email,
            password,
            validPassword,
        };

        setUser(newUser);

        setUsers([...users, newUser]);
    };

    return (
        <div className="flex flex-col content-center items-center">
            <legend
                className="font-bold text-gray-700 text-3xl uppercase mt-4
             mb-3"
            >
                Primeros Pasos
                <span className="text-xl text-indigo-700">...</span>
            </legend>
            {error && <Error>Todos los campos son obligatorios</Error>}
            {errorPass && <Error>Las claves son diferentes</Error>}

            <form
                className="bg-white border-indigo-200 border-2 shadow-xl rounded-lg px-4  mx-4 md:w-1/3 md:h-full"
                onSubmit={handelSubmit}
            >
                <div className=" p-3">
                    <label
                        htmlFor="name"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Nombre
                    </label>

                    <input
                        id="name"
                        value={name}
                        type="text"
                        placeholder="Intruduzca su nombre"
                        className=" border-b border-indigo-700 w-full p-2 placeholder-gray-500 mb-6 outline-none"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label
                        htmlFor="lastName"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Apellido
                    </label>

                    <input
                        id="lastName"
                        value={lastName}
                        type="text"
                        placeholder="Intruduzca su Apellido"
                        className="border-b border-indigo-700  w-full p-2 placeholder-gray-500 mb-6 outline-none"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label
                        htmlFor="email"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Correo Electr&oacute;nico
                    </label>

                    <input
                        id="email"
                        value={email}
                        type="email"
                        placeholder="Intruduzca su correo electronico"
                        className="border-b border-indigo-700  w-full p-2 placeholder-gray-500 mb-6 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label
                        htmlFor="password"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Clave
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Intruduzca su Clave"
                        value={password}
                        className="border-b border-indigo-600  w-full p-2 placeholder-gray-500 mb-6 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label
                        htmlFor="validPassword"
                        className="block text-gray-800 font-bold uppercase"
                    >
                        Confirmar Clave
                    </label>

                    <input
                        id="validPassword"
                        type="password"
                        placeholder="Repita su Clave"
                        value={validPassword}
                        className="border-b border-indigo-600  w-full p-2 placeholder-gray-500 outline-none"
                        onChange={(e) => setValidPassword(e.target.value)}
                    />
                    <input
                        className=" py-2 px-4 w-full
                         text-white font-bold text-xl uppercase
                         border-2 shadow-md rounded-md
                         bg-blue-500
                         hover:bg-blue-400 cursor-pointer transition-all mt-6"
                        type="submit"
                        value="Acceder"
                    />
                </div>
            </form>
        </div>
    );
};

export default FormCreate;
