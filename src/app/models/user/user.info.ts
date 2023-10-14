import { User } from "firebase/auth";
import { Car } from "../driver/car.driver";
import { capitalizeString } from "src/app/utils/formatter.string";

export interface UserInfo{
    nombre: string;
    uid: string | null;
    lastUid: string | null;
    emailVerificado: boolean;
    roles: string[];
    vehiculo: Car | null;
    carreraUniv: string;
}

export interface UserLocalData {
    email: string;
    sesionActiva: boolean;
    rolActivo: string;
    userInfo: UserInfo | null;
}

export class UserMaker {

    static createFromLogin(userData: User): UserInfo {
        return {
            nombre: userData.displayName != null ? capitalizeString(userData.displayName) : 'User DuocUC',
            uid: userData.uid,
            lastUid: userData.uid,
            emailVerificado: userData.emailVerified,
            roles: ['user'],
            vehiculo: null,
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
            vehiculo: null,
            carreraUniv: '',
        }
    }

    static createBasicLocalData(): UserLocalData{
        return {
            email: '',
            sesionActiva: false,
            rolActivo: '',
            userInfo: null,
        }
    }
}