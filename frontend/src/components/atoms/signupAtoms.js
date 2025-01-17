import {atom} from "recoil"

export const signupState = atom({
    key : "signupState",
    default : {
        firstName : '',
        lastName : '',
        email : '',
        password : ' '
    }
})