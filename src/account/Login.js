import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const md5 = require('js-md5');

export const Login = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const disabled = useRef(false);

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

    const makeNotification = (title, body) => {
        if(Notification.permission !== 'granted'){
            Notification.requestPermission();
        }else{
            const notification = new Notification( title ,
            {
                icon: "https://th.bing.com/th/id/R.3291c1a14fb5181b93a66b20982e0e4e?rik=LBmnkdmjhjegow&riu=http%3a%2f%2fprofessionalhxh.weebly.com%2fuploads%2f4%2f5%2f7%2f8%2f45785219%2f7972827_orig.png&ehk=zaLl0TKkx0tKvvDgJyz72rmOmA2mSVZDkB7Vbxu%2bUWY%3d&risl=&pid=ImgRaw&r=0",
                body: body
            });
    
            notification.onclick = () =>{
                navigate('/feed');
            };
        }
    }

    const handleClick = async () => {
        if(input.email === '' || input.password === ''){
            alert('Favor de llenar todos los campos');
            return;
        }

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
        
        disabled.current.disabled = true;
        cookie.set('email', input.email);
        makeNotification('¡Qué bueno que regresaste!', 'Esperamos que sigas teniendo una gran experiencia.');
        navigate('/feed');
    }

    useEffect(() => {
        if( cookie.get('email') !== undefined ){
            navigate('/feed')
        }

        if(Notification.permission !== 'granted'){
            Notification.requestPermission();
        }
    },[])
    
    return (
        <div>
            <center>
                <div>
                    <h1>ReadAm</h1> <br/>
                    <input type = 'text' placeholder = 'email' name = 'email' onChange = { handleChange }/> <br/>
                    <input type = 'password' placeholder = 'password' name = 'password' onChange = { handleChange }/> <br/>
                    <input type = 'button' ref={ disabled } value = 'Iniciar sesion' onClick = { handleClick }/> <br/>
                    <a href='/recover'> ¿Has olvidado tu contraseña? </a> <br/>
                    <a href='/register'> ¿Aun no tienes una cuenta? Registrate aquí </a>
                </div>
            </center> 
        </div>
    );
}