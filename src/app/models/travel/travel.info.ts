import { Car } from "../driver/cardriver.info";
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
    originLatLng: {};
    destinationLatLng: {};
}

export class Travel {

    static createTravelInfo(userInfo: UserInfo, destination: string, payType: string, price: number, destinationLatLng: {}): TravelInfo {
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
            originLatLng: {
                lat: -33.03362239261196,
                lng: -71.53317651646127,
            },
            destinationLatLng: destinationLatLng,
        }
    }
}