import { useState } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";

function App() {
    const [logged, setLogged] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    return (
        <div>
            {logged ? (
                <Header />
            ) : (
                <LogIn
                    logged={logged}
                    setLogged={setLogged}
                    users={users}
                    setUsers={setUsers}
                    user={user}
                    setUser={setUser}
                />
            )}
        </div>
    );
}

export default App;
