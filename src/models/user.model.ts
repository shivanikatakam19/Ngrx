export class User {
    constructor(
        private email: string,
        private token: string,
        private localId: string,
        private expirationDate: Date
    ) { }


    get ExpirationDate() {
        return this.expirationDate;
    }

    get userToken() {
        return this.token
    }
}