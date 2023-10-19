import { UserModel } from "../user/UserModel";

export class TravelModel{
    
    constructor(
        public origen: string,
        public destino: string,
        public fecha_hora: Date | undefined,
        public conductor: UserModel | undefined,
        public asientosDisp: number,
        public pasajeros: UserModel[],
        public tipoPago: string,
        public mtoViaje: number,
    ){}
}