import { User } from "firebase/auth";
import { Car } from "../driver/cardriver.info";
import { capitalizeString } from "src/app/utils/formatter.string";

export interface UserInfo{
    nombre: string;
    uid: string;
    lastUid: string;
    emailVerificado: boolean;
    roles: string[];
    vehiculo: Car | undefined;
    carreraUniv: string;
}

export interface UserLocalData {
    email: string;
    sesionActiva: boolean;
    rolActivo: string;
    travelActive: boolean;
    userInfo: UserInfo | undefined;
}

export class UserMaker {

    static createFromLogin(userData: User): UserInfo {
        return {
            nombre: userData.displayName != null ? capitalizeString(userData.displayName) : 'User DuocUC',
            uid: userData.uid,
            lastUid: userData.uid,
            emailVerificado: userData.emailVerified,
            roles: ['user'],
            vehiculo: {
                patente: '',
                modelo: '',
                marca: '',
                annoVehiculo: 0,
                permisoCirculacion: false,
                dueno: '',
                asientos: 0,
                color: ''
            },
            carreraUniv: '',
        }
    }

    static createBasicUserInfo(): UserInfo{
        return {
            nombre: 'User DuocUC',
            uid: '',
            lastUid: '',
            emailVerificado: false,
            roles: ['user'],
            vehiculo: {
                patente: '',
                modelo: '',
                marca: '',
                annoVehiculo: 0,
                permisoCirculacion: false,
                dueno: '',
                asientos: 0,
                color: ''
            },
            carreraUniv: '',
        }
    }

    static createBasicLocalData(): UserLocalData{
        return {
            email: '',
            sesionActiva: false,
            rolActivo: '',
            travelActive: false,
            userInfo: undefined,
        }
    }
}