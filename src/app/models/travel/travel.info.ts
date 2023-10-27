import { UserInfo } from '../user/user.info';


export interface TravelInfo {
    idDoc: string;
    origin: string;
    destination: string;
    passengers: UserInfo[];
    driver: UserInfo;
    stateTravel: number;
    availableSeats: number;
    payType: string;
    price: number;
}

export class Travel {

    static createTravelInfo(userInfo: UserInfo, destination: string, payType: string, price: number): TravelInfo {
        return {
            idDoc: '',
            origin: 'Duoc UC: Sede Viña Del Mar', 
            destination: destination,
            passengers: [],
            driver: userInfo,
            stateTravel: 3,
            availableSeats: userInfo.vehiculo?.asientos!-1,
            payType: payType,
            price: price,
        }
    }
}