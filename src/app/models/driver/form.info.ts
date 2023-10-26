import { Car } from "./cardriver.info";

export interface DriverRequest {
    idDoc: string;
    emailStudent: string;
    nameStudent: string;
    careerStudent: string;
    vehicleStudent: Car;
    statusRequest: number;
    emailReviewer: string;
    emailApprover: string;
}

export class FormDriverMaker {

    static basicInformation(email: string, nameStudent: string, careerStudent: string): DriverRequest{
        return {
            idDoc: '',
            emailStudent: email,
            nameStudent: nameStudent,
            careerStudent: careerStudent,
            vehicleStudent: {
                patente: '',
                modelo: '',
                marca: '',
                annoVehiculo: 0,
                permisoCirculacion: false,
                dueno: '',
                asientos: 0,
                color: ''
            },
            statusRequest: 0,
            emailReviewer: '',
            emailApprover: ''
        }
    }
}