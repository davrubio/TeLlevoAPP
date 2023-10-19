import { UserModel } from "../user/UserModel"

export interface ITravel {
    origen: string;
    destino: string;
    fecha_hora: Date | undefined;
    conductor: UserModel | undefined;
    asientosDisp: number | undefined;
    pasajeros: UserModel[] | undefined;
    tipoPago: string;
    mtoViaje: number;
}