import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const ConfigurationsBlog = () => {
    const cookie = new Cookies();
    const navigate = useNavigate();

    const [ imgProfile, setImgProfile ] = useState(null); 
    const [ imgBackground, setImgBackground ] = useState(null);

    const uploadImgProfile = (e) => {
        setImgProfile(e);
    }

    const uploadImgBackground = (e) => {
        setImgBackground(e);
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

    const insertArchive = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('imgProfile', imgProfile);
        formData.append('imgBackground', imgBackground)

        const res = await axios({
            headers:{'Content-Type': 'multipart/form-data'},
            method:'post',
            url: 'https://apireadamblog-production.up.railway.app/user/addImage',
            data: formData
        });

        await axios({
            method: 'post',
            url: 'https://apireadamblog-production.up.railway.app/user/insert',
            data:
            {
                email: cookie.get('validationEmail'),
                password: cookie.get('validationPass'),
                userName: cookie.get('validationUserName'),
                name: cookie.get('validationName'),
                surname: cookie.get('validationSurname'),
                followers: [],
                categories: [],
                imgPerfilAddress: res.data.imgProfile,
                imgBackgroundAddress: res.data.imgBackground
            }
        });

        cookie.set('email', cookie.get('validationEmail'));
        makeNotification('¡Felicidades!, ahora formas parte de nuestra comunidad.', 'De parte del equipo de desarrolladores de ReadAm esperamos que tengas una buena experiencia usando nuestro blog :)');
        cookie.remove('validationName');
        cookie.remove('validationSurname');
        cookie.remove('validationEmail');
        cookie.remove('validationPass');
        cookie.remove('validationUserName');

        navigate('/feed');
    }

    return (
        <div>
            <center>
                <form onSubmit={ insertArchive }>
                    <h1> Configuraciones del blog </h1>
                    <h5>Foto de perfil: </h5> <br/>
                    <input type='file' accept='image/png, image/jpeg' onChange={(e) => uploadImgProfile(e.target.files[0])} /> <br/> 
                    <h5>Foto de portada: </h5> <br/>
                    <input type='file' accept='image/png, image/jpeg' onChange={(e) => uploadImgBackground(e.target.files[0])}/> <br/>
                    <input type='submit'/>
                </form>   
            </center>
            
        </div>
    );
}