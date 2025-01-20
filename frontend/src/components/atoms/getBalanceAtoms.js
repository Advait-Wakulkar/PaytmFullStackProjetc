import {atom} from "recoil"

const getBalanceAtoms = atom({
    key : "getBalanceAtoms",
    default : 5000
})

const displayUserAtoms = atom({
    key : "displayUserAtoms",
    default : [{}]
})

export {
    getBalanceAtoms,
    displayUserAtoms
}