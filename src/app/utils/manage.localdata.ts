import { UserInfo, UserLocalData } from "../models/user/user.info";

export class ManageLocalData {

    static saveExistsLocalData(userData: UserLocalData){
        localStorage.clear();
        localStorage.setItem('userdata', JSON.stringify(userData));
    }

    static saveLoginLocalData(email: string, userInfo: UserInfo): UserLocalData{
        const userData: UserLocalData = {
            email: email,
            sesionActiva: true,
            rolActivo: '',
            travelActive: false,
            userInfo: userInfo,
          };
        localStorage.clear();
        localStorage.setItem('userdata', JSON.stringify(userData));
        
        return userData;
    }

    static getLocalData(): UserLocalData{
        return JSON.parse(localStorage.getItem('userdata') || '{}');
    }
}