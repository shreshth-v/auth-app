import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(formData);
        setFormData({ email: "", password: "" });
        navigate("/");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <label>
                    Email
                    <input className='border border-gray-300 rounded-md px-4 py-2' name='email' type="email" required placeholder="Email"
                        value={formData.email} onChange={onChangeHandler} />
                </label>
                <br />

                <label>
                    Password
                    <input className='border border-gray-300 rounded-md px-4 py-2' name='password' type="password" required placeholder="Password"
                        value={formData.password} onChange={onChangeHandler} />
                </label>
                <br />

                <button className='bg-blue-500 text-white rounded-md px-4 py-2' type="submit">Register</button>
            </form>
        </>
    )
}
export default Login