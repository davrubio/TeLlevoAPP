export class CarModel{
    constructor(
        public patente: string,
        public modelo: string,
        public marca: string,
        public annoVehiculo: number,
        public permisoCirculacion: boolean,
        public dueño: string,
        public asientos: number,
        public color: string,
    ){}
}