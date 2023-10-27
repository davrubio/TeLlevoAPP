import { Car } from "../driver/cardriver.info";
import { UserInfo } from '../user/user.info';


export interface TravelInfo {
    origin: string;
    destination: string;
    passengers: UserInfo[];
    driver: UserInfo;
    car: Car;
    stateTravel: number;
    availableSeats: number;
}

export class Travel {

    static createTravelInfo(userInfo: UserInfo, carInfo: Car, destination: string): TravelInfo {
        return {
            
            origin: 'Duoc UC: Sede Viña Del Mar', 
            destination: destination,
            passengers: [],
            driver: userInfo,
            car: carInfo,
            stateTravel: 3,
            availableSeats: carInfo.asientos-1
        }
    }
}