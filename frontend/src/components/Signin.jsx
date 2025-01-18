import { useRecoilState } from "recoil"
import { signinState } from "./atoms/signinAtoms"
import { Link, useNavigate } from "react-router"
import axios from "axios"

function Signin(){

    const navigate = useNavigate()

    const [formData, setFormData] = useRecoilState(signinState)

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData({
            ...formData, 
            [name] : value
        })
        console.log(formData)
    }

    const handleSubmit = async (e)=>{

        e.preventDefault()

        try{
            
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        console.log(response.data)
        if (response.data.token) {
            localStorage.setItem("jwtToken", response.data.token)
        }
        navigate("/dashboard")
        } catch(error){
            console.log("Error Logging in ", error)
        }
    }

    return <>
    <div className="login-form" >
        <h1>Signin</h1>
        <p></p>
        <p>Enter your credentials to access your account</p>
        <p></p>
        <div className="form-inputs">
            <label htmlFor="username">Username : </label>
            <input onChange={handleChange} type="email" id="username" name="username"></input>
            <p></p>
            <label htmlFor="password">Password : </label>
            <input onChange={handleChange} type="password" id="password" name="password"></input>
            <p></p>
            <button onClick={handleSubmit}>Login</button>
            <p></p>
            <p>Don't have an account? <Link to={"/signup"}>
            Register here
            </Link></p>
        </div>
    </div>
    </>
}

export default Signin