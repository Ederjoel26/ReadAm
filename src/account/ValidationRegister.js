import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export const ValidationRegister = () => {

    const cookie = new Cookies();
    const navigate = useNavigate();

    const [ input, setInput ] = useState({
        'validationCode': ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async () => {
        if(input.validationCode !== cookie.get('code')){
            alert('El codigo es incorrecto, favor de verificarlo.');
            return;
        }

        cookie.remove('code');

        await axios({
            method: 'post',
            url: 'https://readam.vercel.app/user/insert',
            data: {
                email: cookie.get('validationEmail'),
                password: cookie.get('validationPass'),
                userName: cookie.get('validationUserName'),
                followers: [],
                imgPerfilAddress: '',
                imgBackgroundAddress: ''
            }
        });

        cookie.set('email', cookie.get('validationEmail'));
        alert('Felicidades, ahora eres uno de nuestros usuarios.');
        cookie.remove('validationEmail');
        cookie.remove('validationPass');
        cookie.remove('validationUserName');

        navigate('/feed');
    }


    useEffect( () => {
        if(cookie.get('code') === undefined){
            navigate('/register');
        }

        if( cookie.get('email') !== undefined ){
            navigate('/feed')
        }
    }, []);

    return (
        <div>
            <center>
                <h1>Verificacion de correo</h1>
                <input type = 'text' required name = "validationCode" placeholder = "Paste your code here"  onChange={ handleChange }/> <br/>
                <input type = 'button' value='Verificar' onClick={ handleClick }/>
            </center>
        </div>
    );
}