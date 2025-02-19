import  { useState } from "react";
import InputText from "../components/InputText";
import { useDispatch } from "react-redux";
import { login } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })
    const handleLogin = async (event: any) => {
        event.preventDefault();
        console.log("Logging in");
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: loginData.username,
                    password: loginData.password
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            dispatch(login({ id: 1, token: data.token }));
            navigate('/'); // Navigate to home or another page after successful login
        } catch (error) {
            console.error('There was a problem with the login request:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }
    return (
        <div className="login-wrapper flex content-center items-center justify-center h-screen">
            <div className="login bg-gray-100 p-10 rounded-lg flex flex-col gap-4">
                <h1>Login</h1>
                <form className="flex flex-col gap-4" onSubmit={(e) => { handleLogin(e) }}>
                    <InputText id="username" placeholder="Username" title="Username" onChange={(e) => { setLoginData({ ...loginData, username: e.target.value }) }} />
                    <InputText id="password" placeholder="Password" title="Password" type="password" onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}></InputText>
                    <button className="p-2 bg-blue-500 text-white rounded cursor-pointer">Login</button>
                </form>
            </div>
        </div>
    )
}