import { UserModel } from "./models/user/UserModel" 

export const listRoleSys: string[] = ['user','driver','admin'];

export const listUserSys: UserModel[] = [
    new UserModel('David', 'Rubio', 'dav.rubio@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0]], 'dav.rubio','dav123', undefined),
    new UserModel('Nicolás', 'Caviedes', 'ni.caviedes@duocuc.cl', 'Ingenieria en Informatica', [listRoleSys[0],listRoleSys[1],listRoleSys[2]],'ni.caviedes','nico123', undefined),
];
