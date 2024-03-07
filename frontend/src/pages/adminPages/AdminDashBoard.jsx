import { Card, CardContent, Typography } from "@mui/material";

export default function AdminDashBoard() {
    return (
        <main className="flex flex-1 flex-col p-6 gap-8 py-16 px-44">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="bg-white border-2 border-gray-200 shadow-sm rounded-lg p-5">
                    <div className="flex flex-col">
                        <h1 className=" font-bold text-xl px-2">
                            Total de Clientes
                        </h1>
                        <p className="text-gray-500 px-3">Numero de clientes</p>
                        <span className="text-3xl font-bold text-center">
                            345
                        </span>
                    </div>
                </div>
                <div className="bg-white border-2 border-gray-200 shadow-sm rounded-lg p-5">
                    <div className="flex flex-col">
                        <h1 className=" font-bold text-xl px-2">
                            Total de Dinero
                        </h1>
                        <p className="text-gray-500 px-3">
                            Dinero Generado de las Rentas
                        </p>
                        <span className="text-3xl font-bold text-center">
                            $5,432.00
                        </span>
                    </div>
                </div>
            </div>

            <h1 className="font-bold text-2xl">Rentas en Curso</h1>

            <div className=" rounded-lg border-2 border-gray-200 bg-white shadow-sm ">
                <table className="w-full">
                    <thead className="border-b">
                        <tr className="text-left">
                            <th className="p-2"># Renta</th>
                            <th>Clientes</th>
                            <th>Fecha de entrega</th>
                            <th>Formato</th>
                            <th>Precio</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b ">
                            <td className="p-3">#1</td>
                            <td>John Doe</td>
                            <td>2023-02-25</td>
                            <td>DVD</td>
                            <td>$5.99</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3">#2</td>
                            <td>Jane Smith</td>
                            <td>2023-02-25</td>
                            <td>Blu-ray</td>
                            <td>$7.99</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-3">#3</td>
                            <td>Mike Johnson</td>
                            <td>2023-02-26</td>
                            <td>DVD</td>
                            <td>$5.99</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </main>
    );
}
