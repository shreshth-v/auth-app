import { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        profilePicture: null
    });

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    const handleImageChange = (e) => {

        setFormData({ ...formData, profilePicture: e.target.files[0] });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister(formData);
        setFormData({ username: "", email: "", password: "", profilePicture: null });
        navigate("/");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input className='border border-gray-300 rounded-md px-4 py-2'
                        name='username'
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required />
                </label>
                <br />

                <label>
                    Email
                    <input className='border border-gray-300 rounded-md px-4 py-2'
                        name='email'
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required />
                </label>
                <br />

                <label>
                    Password
                    <input className='border border-gray-300 rounded-md px-4 py-2'
                        name='password'
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                </label>
                <br />

                <label>
                    Profile Picture
                    <input className='border border-gray-300 rounded-md px-4 py-2'
                        name='profilePicture'
                        type="file"
                        onChange={handleImageChange}
                        required />
                </label>

                <button className='bg-blue-500 text-white rounded-md px-4 py-2' type="submit">Register</button>
            </form>
        </>
    )
}

export default Register