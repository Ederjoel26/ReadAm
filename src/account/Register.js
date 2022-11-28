import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    const [ input, setInput ] = useState({
        'email': '',
        'password':'',
        'userName': ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async () => {
        if( !validatePassword.test(input.password) ) {
            alert('La contraseña debe de contener letras mayusculas, minusculas, numeros, caracteres especiales y que tenga de 8 a 15 caracteres');
            return;
        }

        const response = await axios({
            method: 'get',
            url: `https://readam.vercel.app/user/findEmail/${ input.email }`
        });

        if( response.data !== null ){
            alert('El correo electronico introducido ya se ha utilizado anteriormente en otra cuenta, favor de utilizar otro correo.')
            return;
        }   
        
        const validationCode = await axios({
            method:'post',
            url: 'https://readam.vercel.app/user/sendMail',
            data: {
                email: input.email
            }
        });

        cookie.set('code', validationCode.data);
        cookie.set('validationEmail', input.email);
        cookie.set('validationPass', input.password);
        cookie.set('validationUserName', input.userName);
        navigate('/validation');
    }

    useEffect(() => {
        if(cookie.get('email') !== undefined){
            navigate('/feed');
        }
    },[])

    return (
        <div>
            <center>
                <h1>Registrarse</h1>
                <input type = 'text' placeholder="email" require='true' name = 'email' onChange = { handleChange }/> <br/>
                <input type = 'password' placeholder="password" require='true' name = 'password' onChange = { handleChange }/> <br/>
                <input type = 'text' placeholder="User name" require='true' name = 'userName' onChange = { handleChange }/> <br/>
                <input type = 'button' value='Registrarse' require='true' onClick = { handleClick }/>
            </center>
        </div>
    );
}