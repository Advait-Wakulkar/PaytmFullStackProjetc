import { useRecoilState } from "recoil"
import { signinState } from "./atoms/signinAtoms"

function Signin(){

    const [formData, setFormData] = useRecoilState(signinState)

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData(
            ...formData, 
            {[name] : value}
        )
    }

    return <>
    <div>
        <h1>Signin</h1>
        <p></p>
        <div>
            <label htmlFor=""></label>
            <input type="email"></input>
            <p></p>
            <label htmlFor=""></label>
            <input type="email"></input>
        </div>
    </div>
    </>
}

export default Signin