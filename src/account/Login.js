import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
const md5 = require('js-md5');

export const Login = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();

    const [ input, setInput ] = useState({
        'email': '',
        'password':''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async () => {
        const response = await axios({
            method: 'get',
            url: `https://readam.vercel.app/user/findEmail/${ input.email }`
        });

        if(response.data === null){
            alert('El correo electronico es invalido');
            return;
        }

        if(response.data.email !== input.email || response.data.password !== md5(input.password)){
            alert('La contraseña es incorrecta, favor de rectificarla.');
            return;
        }
             
        cookie.set('email', input.email);
        navigate('/feed');
    }

    useEffect(() => {
        if( cookie.get('email') !== undefined ){
            navigate('/feed')
        }
    },[])
    
    return (
        <div>
            <center>
                <div>
                    <h1>Login</h1> <br/>
                    <input type = 'text' placeholder = 'email' name = 'email' onChange = { handleChange }/> <br/>
                    <input type = 'password' placeholder = 'password' name = 'password' onChange = { handleChange }/> <br/>
                    <input type = 'button' value = 'Iniciar sesion' onClick = { handleClick }/> <br/>
                    <a href='/recover'> Forgot your password? </a>
                </div>
            </center> 
        </div>
    );
}