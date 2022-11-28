import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export const RecoverPassword = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    
    const [ input, setInput ] = useState({
        'email': '',
        'token': ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleClick = async () => {
        const recovercode = await axios({
            method:'post',
            url: 'https://readam.vercel.app/user/sendMailRecover',
            data: {
                email: input.email
            }
        });
        cookie.set('recover', recovercode.data);
    }

    const handleClickValidate = () => {
        if(input.token !== cookie.get('recover')){
            alert('El codigo es incorrecto, favor de verificarlo');
            return;
        }

        cookie.remove('recover');
        cookie.set('emailRecover', input.email);
        navigate('/change-pass');
    }

    useEffect(() => {
        if( cookie.get('email') !== undefined ){
            navigate('/feed')
        }
    });

    return (
        <div>
            <center>
                <h1>Recuperacion de token</h1>
                <input type='text' placeholder='email' name='email' require='true' onChange={ handleChange }/> <br/>
                <input type='button' value = 'Mandar token' onClick={ handleClick }/> <br/>
                <input type ='text' name='token' placeholder='Paste your code here' require='true' onChange={ handleChange }/> <br/>
                <input type='button' value = 'Validar token' onClick={ handleClickValidate }/>
            </center>
        </div>
    );
}