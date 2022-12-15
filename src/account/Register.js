import { useState, useEffect, useRef} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const disabled = useRef(false);
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const name = useRef(null);
    const surname = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirm = useRef(null);
    const userName = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validatePassword.test(password.current.value) ) {
            alert('La contraseña debe de contener letras mayusculas, minusculas, numeros, caracteres especiales y que tenga de 8 a 15 caracteres.');
            return;
        }

        if(password.current.value !== confirm.current.value){
            alert('Las contraseñas no coninciden.');
            return;
        }

        const response = await axios({
            method: 'get',
            url: `https://apireadamblog-production.up.railway.app/user/findEmail/${ email.current.value }`
        });

        if(response.data !== null ){
            alert('El correo electronico introducido ya se ha utilizado anteriormente en otra cuenta, favor de utilizar otro correo.')
            return;
        }   

        disabled.current.disabled = true;
    
        const validationCode = await axios({
            method:'post',
            url: 'https://apireadamblog-production.up.railway.app/user/sendMail',
            data: {
                email: email.current.value
            }
        });

        cookie.set('code', validationCode.data);
        cookie.set('validationName', name.current.value);
        cookie.set('validationSurname', surname.current.value)
        cookie.set('validationEmail', email.current.value);
        cookie.set('validationPass', password.current.value);
        cookie.set('validationUserName', userName.current.value);

        alert('Hemos enviado un codigo a tu correo.');
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
                <form onSubmit={ handleSubmit }>
                    <h1>Registrarse</h1>
                    <input type= 'text' required={true} placeholder = 'Nombre' name = 'name' ref={ name }/> <br/>
                    <input type= 'text' required={true} placeholder="Apellido" name = 'surname' ref={ surname }/> <br/>
                    <input type = 'text' required={true} placeholder="Correo" name = 'email' ref={ email }/> <br/>
                    <input type = 'password' required={true} placeholder="Contraseña" name = 'password' ref={ password }/> <br/>
                    <input type = 'password' required={true} placeholder="Confirmar contraseña" name = 'confirm' ref={ confirm }/>
                    <input type = 'text' required={true} placeholder="Nombre de usuario" name = 'userName' ref={ userName }/> <br/>
                    <input type = 'submit' ref={ disabled } value='Registrarse' require='true'/>
                </form>
            </center>
        </div>
    );
}