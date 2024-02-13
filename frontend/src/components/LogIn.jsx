import { useState } from "react";
import FormLogIn from "./FormLogIn";
import FormCreate from "./FormCreate";

const LogIn = ({ logged, setLogged, users, setUsers, user, setUser }) => {
    const [logg, setLogg] = useState(true);
    const [create, setCreate] = useState(false);
    return (
        <div>
            <div className=" flex flex-row justify-between bg-blue-600 sm:w-screen shadow-xl border-t-8 border-b-8 border-black border-dashed items-center">
                <h1 className="font-black lg:text-5xl md:w-1/5 p-5">
                    Video
                    <span className="text-white">Clubapp</span>
                </h1>

                <div>
                    <button
                        className={
                            logg
                                ? "font-bold text-yellow-400 text-center text-md p-2 m-3 hover:text-yellow-300 transition-all"
                                : "font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all"
                        }
                        onClick={
                            !logg
                                ? () => {
                                      setLogg(true);
                                      setCreate(false);
                                  }
                                : () => {
                                      setLogg(true);
                                      setCreate(false);
                                  }
                        }
                    >
                        LogIn
                    </button>
                    <button
                        className={
                            create
                                ? "font-bold text-yellow-400 text-center text-md p-2 m-3 hover:text-yellow-300 transition-all"
                                : "font-bold text-white text-center text-md p-2 m-3 hover:text-gray-300 transition-all"
                        }
                        onClick={
                            !create
                                ? () => {
                                      setCreate(true);
                                      setLogg(false);
                                  }
                                : () => {
                                      setCreate(true);
                                      setLogg(false);
                                  }
                        }
                    >
                        Crear Cuenta
                    </button>
                </div>
            </div>

            <div className=" bg-blue-100 h-screen text-black shadow-2xl overflow-y-scroll ">
                {logg ? (
                    <FormLogIn
                        logged={logged}
                        setLogged={setLogged}
                        users={users}
                        setUsers={setUsers}
                        user={user}
                        setUser={setUser}
                    />
                ) : (
                    <FormCreate
                        user={user}
                        setUser={setUser}
                        users={users}
                        setUsers={setUsers}
                    />
                )}
            </div>
        </div>
    );
};

export default LogIn;
