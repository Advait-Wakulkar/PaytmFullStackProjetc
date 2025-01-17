function Signup(){
    return <>
    <div>
        <h1>Signup</h1>
        <p></p>
        <p>Enter your information to create an account</p>
        <p></p>

        <label for="firstname">First Name : </label>
        <input type="textbox" id="firstname" name="firstname"></input>
        <p></p>
        <label>Last Name : </label>
        <input type="textbox" id="lastname" name="lastname"></input>
        <p></p>
        <label>Email : </label>
        <input type="textbox" id="email" name="email"></input>
        <p></p>
        <label>Password : </label>
        <input type="textbox" id="password" name="password"></input>
        <p></p>
        <button>Signup</button>
        <p>Already have an account? </p>

    </div>
    </>
}

export default Signup