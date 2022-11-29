import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export const RecoverPassword = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const hiddenBtn = useRef(true);
    const hiddenTxt = useRef(true);
    const disabled = useRef(false);
    
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
        hiddenTxt.current.hidden = false;
        hiddenBtn.current.hidden = false;
        disabled.current.disabled = true;
        
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
            navigate('/feed');
        }
    });

    return (
        <div>
            <center>
                <h1>Recuperacion de token</h1>
                <input type='text' placeholder='Correo' name='email' require='true' onChange={ handleChange }/> <br/>
                <input type='button' ref={ disabled } value = 'Mandar token' onClick={ handleClick }/> <br/>
                <input type ='text ' hidden ref={ hiddenTxt } name='token' placeholder='Pega tu código aquí.' require='true' onChange={ handleChange }/> <br/>
                <input type='button' hidden ref={ hiddenBtn } value = 'Validar token' onClick={ handleClickValidate }/>
            </center>
        </div>
    );
}