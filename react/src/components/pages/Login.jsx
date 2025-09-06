import { useState, useEffect } from "react";
import "../../style/login.css"
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate=useNavigate()
    const {setAuth}=useAuth()
    const [form, setForm] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            /*await axios.post("",form)
            .then((res)=>{
                if(res.data.message==='ok'){
                    setAuth(res.data.data)
                    setForm({
                        username:"",
                        password:""
                    })
                }
            })*/
           console.log("login data",form)
            setAuth(true)
            setForm({
                username:"",
                password:""
            })
            navigate('/home')
        }catch(err){
            console.error("error occured in login",err)
        }
    }

    return (
        <div>
            <form>
                <h2>Login to your Account</h2>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="input"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-fields"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );

}