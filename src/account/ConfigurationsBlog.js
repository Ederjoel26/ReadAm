import axios from "axios";
import { useState } from "react";

export const ConfigurationsBlog = () => {
    const [ imgProfile, setImgProfile ] = useState(null); 
    const [ imgBackground, setImgBackground ] = useState(null);

    const uploadImgProfile = (e) => {
        setImgProfile(e);
    }

    const uploadImgBackground = (e) => {
        setImgBackground(e);
    }

    const insertArchive = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('imgProfile', imgProfile);
        formData.append("imgPerfilAddress",imgProfile.name)
        
        const res = await axios({
            method:'post',
            url: 'http://read-am.vercel.app/user/addImageProfile',
            data: formData
        });
        console.log(res)
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