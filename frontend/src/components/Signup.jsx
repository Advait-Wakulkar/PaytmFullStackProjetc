import { RecoilRoot, useRecoilState } from "recoil";
import { signupState } from "./atoms/signupAtoms";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Signup() {
    const [formData, setFormData] = useRecoilState(signupState);

    let navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            navigate("/signin")

        } catch (error) {
            console.error("Error during signup: (Email already registered)");
        }
    };

    return (
            <div className="login-form">
                <h1>Signup</h1>
                <p>Enter your information to create an account</p>
                <div className="form-inputs">
                <label htmlFor="firstName">First Name : </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="firstName"
                    name="firstName"
                />
                <p></p>

                <label htmlFor="lastName">Last Name : </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="lastName"
                    name="lastName"
                />
                <p></p>

                <label htmlFor="email">Email : </label>
                <input
                    onChange={handleChange}
                    type="email"
                    id="email"
                    name="username"
                />
                <p></p>

                <label htmlFor="password">Password : </label>
                <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                />

                
                <p></p>
                <button onClick={handleSubmit}>Signup</button> 
                <p></p>

                <p>Already have an account? 
                    <Link to={"/signin"}> Signin</Link>
                </p>
                </div>   
            </div>
    );
}

export default Signup;
