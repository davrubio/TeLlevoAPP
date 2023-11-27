import { AuthService } from "../services/authentication/auth.service";

export class ManageSession {
    
    authService: AuthService;

    constructor(authServ: AuthService){
        this.authService = authServ;
    }

    
}