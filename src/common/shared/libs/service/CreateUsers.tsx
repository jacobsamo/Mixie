import { auth } from '../config/firebase';

class CreateUsers {
    EmailPassword(email: any, password: any) {
        return ''
    }
    Google() {
        return 'google'
    }
    Github() {
        return 'Github'
    }
    Facebook() {
        return 'Facebook'
    }
}   

export default new CreateUsers();