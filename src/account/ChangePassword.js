import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ChangePassword = () => {

    const cookie = new Cookies();
    const navigate = useNavigate();
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    const [ input, setInput ] = useState({
        'password': '',
        'rePassword': ''
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!validatePassword.test(input.password) || !validatePassword.test(input.rePassword)){
            alert('La contraseña debe de contener letras mayusculas, minusculas, numeros, caracteres especiales y que tenga de 8 a 15 caracteres');
            return;
        }

        if(input.password !== input.rePassword){
            alert('Las contraseñas no son iguales, favor de rectificar.');
            return;
        }

        const user = await axios({
            method: 'get',
            url: `https://apireadamblog-production.up.railway.app/user/findEmail/${ cookie.get('emailRecover')}`
        });

        await axios({
            method:'put',
            url:`https://apireadamblog-production.up.railway.app/user/update/${ cookie.get('emailRecover')}`,
            data:{
                userName: user.data.userName,
                email: user.data.email,
                password: input.password,
                imgPerfilAddress: user.data.imgPerfilAddress,
                imgBackgroundAddress: user.data.imgBackgroundAddress
            }
        });

        makeNotification('Cambio de contraseña realizado correctamente.', 'Trata de ser más cuidadoso con tu contraseña :)')
        cookie.remove('emailRecover');
        navigate('/login');
    }

    useEffect(() => {
        if(cookie.get('email') !== undefined){
            navigate('/feed');
        }   

        if(cookie.get('emailRecover') === undefined){
            navigate('/login');
        }
    },[])

    return (
        <div>
            <center>
                <form onSubmit={ handleSubmit }>
                    <h1>Cambiar contraseña</h1>
                    <input type='password' required={true} placeholder='Nueva contraseña' name='password' onChange={ handleChange }/> <br/>
                    <input type='password' required={true} placeholder='Confirmar contraseña' name='rePassword' onChange={ handleChange }/> <br/>
                    <input type='submit' value='Cambiar contraseña'/>
                </form>                 
            </center>    
        </div>
    );
}