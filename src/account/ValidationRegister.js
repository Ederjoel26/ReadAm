import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const ValidationRegister = () => {

    const cookie = new Cookies();
    const navigate = useNavigate();
    const disabled = useRef(false);

    const [ input, setInput ] = useState({
        'validationCode': ''
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(input.validationCode !== cookie.get('code')){
            alert('El codigo es incorrecto, favor de verificarlo.');
            return;
        }

        cookie.remove('code');

        disabled.current.disabled = true;

        navigate('/configurations-blog');
    }

    useEffect( () => {

        if( cookie.get('email') !== undefined ){
            navigate('/feed')
        }

        if(Notification.permission !== 'granted'){
            Notification.requestPermission();
        }
    }, []);

    return (
        <div>
            <center>
                <form onSubmit={ handleSubmit }>
                    <h1>Verificacion de correo</h1>
                    <input type = 'text' required={true} name = "validationCode" placeholder = "Pega tu código aquí"  onChange={ handleChange }/> <br/>
                    <input type = 'submit' ref={ disabled } value='Verificar'/>
                </form>
            </center>
        </div>
    );
}