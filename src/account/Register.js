import { useState, useEffect, useRef} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
    
    const cookie = new Cookies();
    const navigate = useNavigate();
    const disabled = useRef(false);
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    const [ input, setInput ] = useState({
        'name': '',
        'surname': '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        disabled.current.disabled = true;
    
        const validationCode = await axios({
            method:'post',
            url: 'https://readam.vercel.app/user/sendMail',
            data: {
                email: input.email
            }
        });

        cookie.set('code', validationCode.data);
        cookie.set('validationName', input.name);
        cookie.set('validationSurname', input.surname)
        cookie.set('validationEmail', input.email);
        cookie.set('validationPass', input.password);
        cookie.set('validationUserName', input.userName);

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
                    <input type= 'text' required={true} placeholder = 'Nombre' require='true' name = 'name' onChange = { handleChange }/> <br/>
                    <input type= 'text' required={true} placeholder="Apellido" require='true' name = 'surname' onChange = { handleChange }/> <br/>
                    <input type = 'text' required={true} placeholder="Correo" require='true' name = 'email' onChange = { handleChange }/> <br/>
                    <input type = 'password' required={true} placeholder="Contraseña" require='true' name = 'password' onChange = { handleChange }/> <br/>
                    <input type = 'text' required={true} placeholder="Nombre de usuario" require='true' name = 'userName' onChange = { handleChange }/> <br/>
                    <input type = 'submit' ref={ disabled } value='Registrarse' require='true'/>
                </form>
            </center>
        </div>
    );
}