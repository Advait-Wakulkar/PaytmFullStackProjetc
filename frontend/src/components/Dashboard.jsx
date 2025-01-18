import { useRecoilState } from "recoil"
import { getBalanceAtoms } from "./atoms/getBalanceAtoms"
import { useEffect } from "react"
import axios from "axios"

function Dashboard(){

    const [getBalance, setGetBalance] = useRecoilState(getBalanceAtoms)

    const fetchBalance = async ()=>{

        const token = await localStorage.getItem("jwtToken");
        console.log(token)


        try{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",
                {headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }}
            )
            console.log(response.data)
            setGetBalance(response.data.balance)
        }catch(error){
            console.log("Error fethcing balance", error)
        }

    }
    useEffect(() => {
        fetchBalance()
    }, [])

    return <>
    <h1>Payments App</h1>
    <p></p>
    <h3>Your Balance : {getBalance}</h3>

    </>
}

export default Dashboard