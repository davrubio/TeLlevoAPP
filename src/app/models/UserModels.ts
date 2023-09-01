export class UserModel {
    constructor(
        public name: string,
        public last_name: string,
        public institutional_email: string,
        public career: string,
        public type: string,
        public username: string,
        public password: string,
    ){}

    static crateUser(event: {
        name: string,
        last_name: string,
        institutional_email: string,
    }){
        return {
            name: event.name,
            last_name: event.last_name,
            institutional_email: event.institutional_email,
        }
    }
}