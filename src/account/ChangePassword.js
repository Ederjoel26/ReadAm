import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ChangePassword = () => {

    const cookie = new Cookies();
    const navigate = useNavigate();

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

    const handleClick = async() => {
        if( input.password !== input.rePassword){
            alert('Las contraseñas no son iguales, favor de rectificar.');
            return;
        }

        const user = await axios({
            method: 'get',
            url: `https://readam.vercel.app/user/findEmail/${ cookie.get('emailRecover')}`
        });

        await axios({
            method:'put',
            url:`https://readam.vercel.app/user/update/${ cookie.get('emailRecover')}`,
            data:{
                userName: user.data.userName,
                email: user.data.email,
                password: input.password,
                imgPerfilAddress: user.data.imgPerfilAddress,
                imgBackgroundAddress: user.data.imgBackgroundAddress
            }
        });

        alert('Cambio de contraseña hecho perfectamente');
        cookie.remove('emailRecover');
        navigate('/login');
    }

    useEffect(() => {
        if(cookie.get('email') !== undefined){
            navigate('/feed');
        }
    },[])

    return (
        <div>
            <input type='text' placeholder='Nueva contraseña' name='password' onChange={ handleChange }/>
            <input type='text' placeholder='Confirmar contraseña' name='rePassword' onChange={ handleChange }/>
            <input type='button' value='Cambiar contraseña' onClick={ handleClick }/>
        </div>
    );
}