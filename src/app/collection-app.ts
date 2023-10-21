import { UserModel } from "./models/user/UserModel";
import { CarModel } from "./models/driver/CarModel";
import { TravelModel } from "./models/travel/TravelModel";

export const listRoleSys: string[] = ['user','driver','admin'];
export const listTipoPago: string[] = ['credito','debito','efectivo'];

let vehicleAMG: CarModel = new CarModel('BBCL69','AMG','Mercedes Benz',2021,true,'Papa Noel',4,'rojo');
let vehicleBMW: CarModel = new CarModel('BBCL69','M5','BMW',2023,true,'Papa Noel',4,'rojo');

export const listUserSys: UserModel[] = [
    new UserModel('David', 'Rubio', 'dav.rubio@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]], 'dav.rubio','dav123', undefined,vehicleAMG),
    new UserModel('Nicolás', 'Caviedes', 'ni.caviedes@duocuc.cl', 'Medicina', [listRoleSys[0],listRoleSys[1],listRoleSys[2]],'ni.caviedes','nico123', undefined,vehicleBMW),
    new UserModel('Sergio', 'Plaza', 's.plazae@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]],'s.plazae','plaza123', undefined,undefined),
    new UserModel('Jorge', 'Escobar', 'jo.escobar@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]],'jo.escobar','jo123', undefined,undefined),
];

export const listTravel: TravelModel[]= [
    new TravelModel('Viña del mar','Quilpue',new Date(),listUserSys[1],3,[],'Efectivo',2590),
    new TravelModel('','',undefined,undefined,0,[],'',0),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
    // new TravelModel('','',undefined,undefined,0,undefined,''),
];