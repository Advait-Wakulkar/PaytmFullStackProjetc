import { RecoilRoot, useRecoilState } from "recoil";
import { signupState } from "./atoms/signupAtoms";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useRecoilState(signupState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log({ [name]: value });
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json", // Correct content type
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <RecoilRoot>
            <div>
                <h1>Signup</h1>
                <p>Enter your information to create an account</p>

                <label htmlFor="firstName">First Name : </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="firstName"
                    name="firstName" // Match this with backend expected field
                />
                <p></p>

                <label htmlFor="lastName">Last Name : </label>
                <input
                    onChange={handleChange}
                    type="text"
                    id="lastName"
                    name="lastName" // Match this with backend expected field
                />
                <p></p>

                <label htmlFor="email">Email : </label>
                <input
                    onChange={handleChange}
                    type="email" // Use email input type for validation
                    id="email"
                    name="username" // Match this with backend expected field (username as email)
                />
                <p></p>

                <label htmlFor="password">Password : </label>
                <input
                    onChange={handleChange}
                    type="password" // Use password type for security
                    id="password"
                    name="password" // Match this with backend expected field
                />
                <p></p>

                <button onClick={handleSubmit}>Signup</button>
                <p>
                    Already have an account? <button>Login</button>
                </p>
            </div>
        </RecoilRoot>
    );
}

export default Signup;
