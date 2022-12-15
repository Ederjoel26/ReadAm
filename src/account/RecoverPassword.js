import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

export const RecoverPassword = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const hiddenBtn = useRef(true);
    const disabled = useRef(false);
    const email = useRef(null);
    const token = useRef(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        token.current.hidden = false;
        hiddenBtn.current.hidden = false;
        disabled.current.disabled = true;
        
        const recovercode = await axios({
            method:'post',
            url: 'https://apireadamblog-production.up.railway.app/user/sendMailRecover',
            data: {
                email: email.current.value
            }
        });

        cookie.set('recover', recovercode.data);
    }

    const handleSubmitValidate = (e) => {
        e.preventDefault();

        if(token.current.value !== cookie.get('recover')){
            alert('El codigo es incorrecto, favor de verificarlo');
            return;
        }

        cookie.remove('recover');
        cookie.set('emailRecover', email.current.value);
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
                    <input type='text' ref={ email } required={true} placeholder='Correo' name='email' require='true'/> <br/>
                    <input type='submit' ref={ disabled } value = 'Mandar token'/> <br/>
                </form>
                <form onSubmit={ handleSubmitValidate }>
                    <input type ='text ' required={true} hidden ref={ token } name='token' placeholder='Pega tu código aquí.' require='true'/> <br/>
                    <input type='submit' hidden ref={ hiddenBtn } value = 'Validar token'/>
                </form>
            </center>
        </div>
    );
}