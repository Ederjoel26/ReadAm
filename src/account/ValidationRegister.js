import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(input.validationCode !== cookie.get('code')){
            alert('El codigo es incorrecto, favor de verificarlo.');
            return;
        }

        cookie.remove('code');

        disabled.current.disabled = true;
        
        await axios({
            method: 'post',
            url: 'https://readam.vercel.app/user/insert',
            data: {
                email: cookie.get('validationEmail'),
                password: cookie.get('validationPass'),
                userName: cookie.get('validationUserName'),
                name: cookie.get('validationName'),
                surname: cookie.get('validationSurname'),
                followers: [],
                categories: [],
                imgPerfilAddress: '',
                imgBackgroundAddress: ''
            }
        });

        cookie.set('email', cookie.get('validationEmail'));
        makeNotification('¡Felicidades!, ahora formas parte de nuestra comunidad.', 'De parte del equipo de desarrolladores de ReadAm esperamos que tengas una buena experiencia usando nuestro blog :)');
        cookie.remove('validationName');
        cookie.remove('validationSurname');
        cookie.remove('validationEmail');
        cookie.remove('validationPass');
        cookie.remove('validationUserName');

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