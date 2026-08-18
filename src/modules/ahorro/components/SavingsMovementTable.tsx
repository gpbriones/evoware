import type { SavingsMovement } from "../models/SavingsMovement";

interface Props{

    movements:SavingsMovement[];

}

export default function SavingsMovementTable({

    movements

}:Props){

    return(

        <table className="movement-table">

            <thead>

                <tr>

                    <th>Semana</th>

                    <th>Fecha</th>

                    <th>Monto</th>

                    <th>Usuario</th>

                </tr>

            </thead>

            <tbody>

                {movements.map(movement=>(

                    <tr key={movement.id}>

                        <td>{movement.semanaAportada}</td>

                        <td>{movement.fechaAportacion}</td>

                        <td>

                            $

                            {movement.montoAportacion.toFixed(2)}

                        </td>

                        <td>{movement.nombre}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}