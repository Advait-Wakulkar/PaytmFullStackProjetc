import { RecoilRoot, useRecoilState } from "recoil"
import { signupState } from "./atoms/signupAtoms"

function Signup(){

    const [formData, setFormData] = useRecoilState(signupState)

    const handleChange = (e)=>{
        const {field, value} = e.target
        console.log({[field]:value})
        setFormData({
            ...formData,
            [field] : value
        })
    }

    return <>
    <RecoilRoot>
    <div>
        <h1>Signup</h1>
        <p></p>
        <p>Enter your information to create an account</p>
        <p></p>

        <label htmlFor="firstname">First Name : </label>
        <input onChange={handleChange} value={formData.firstName} type="textbox" id="firstname" name="firstname"></input>
        <p></p>
        <label htmlFor="lastname">Last Name : </label>
        <input type="textbox" id="lastname" name="lastname"></input>
        <p></p>
        <label htmlFor="email">Email : </label>
        <input type="textbox" id="email" name="email"></input>
        <p></p>
        <label htmlFor="password">Password : </label>
        <input type="textbox" id="password" name="password"></input>
        <p></p>
        <button>Signup</button>
        <p>Already have an account?  <button>Login</button>
        </p>
    </div>
    </RecoilRoot>
    </>
}

export default Signup