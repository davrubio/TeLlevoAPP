import { UserModel } from "./models/user/UserModel" 

export const listRoleSys: string[] = ['user','driver','admin'];

export const listTipoPago: string[] = ['credito','debito','efectivo'];

export const listUserSys: UserModel[] = [
    new UserModel('David', 'Rubio', 'dav.rubio@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[1]], 'dav.rubio','dav123', undefined,undefined),
    new UserModel('Nicolás', 'Caviedes', 'ni.caviedes@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0],listRoleSys[1],listRoleSys[2]],'ni.caviedes','nico123', undefined,undefined),
    new UserModel('Sergio', 'Plaza', 's.plazae@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]],'s.plazae','plaza123', undefined,undefined),
    new UserModel('Jorge', 'Escobar', 'jo.escobar@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]],'jo.escobar','jo123', undefined,undefined),
];
