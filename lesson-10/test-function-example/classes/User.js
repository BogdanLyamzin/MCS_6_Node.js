export default class User {
    constructor(name, lastName, phone) {
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
    }

    getFullName() {
        return `${this.name} ${this.lastName}`
    }
}

