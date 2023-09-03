export class UserModel {
    constructor(
        public name: string,
        public last_name: string,
        public institutional_email: string,
        public career: string,
        public roles: string[],
        public username: string,
        public password: string,
        public activeRole: string | undefined,
    ){}
}