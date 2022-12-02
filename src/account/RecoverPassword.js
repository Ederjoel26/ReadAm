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

    const handleSubmit = async (e) => {
        e.preventDefault();

        hiddenTxt.current.hidden = false;
        hiddenBtn.current.hidden = false;
        disabled.current.disabled = true;
        
        const recovercode = await axios({
            method:'post',
            url: 'https://apireadamblog-production.up.railway.app/user/sendMailRecover',
            data: {
                email: input.email
            }
        });

        cookie.set('recover', recovercode.data);
    }

    const handleSubmitValidate = (e) => {
        e.preventDefault();

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
                <form onSubmit={ handleSubmit }>
                    <h1>Recuperacion de Contraseña</h1>
                    <input type='text' required={true} placeholder='Correo' name='email' require='true' onChange={ handleChange }/> <br/>
                    <input type='submit' ref={ disabled } value = 'Mandar token'/> <br/>
                </form>
                <form onSubmit={ handleSubmitValidate }>
                    <input type ='text ' required={true} hidden ref={ hiddenTxt } name='token' placeholder='Pega tu código aquí.' require='true' onChange={ handleChange }/> <br/>
                    <input type='submit' hidden ref={ hiddenBtn } value = 'Validar token'/>
                </form>
            </center>
        </div>
    );
}