import { useState, useRef } from "react";

export const ConfigurationsBlog = () => {

    const imgProfile = useRef(null);
    const imgBackground = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.dir(imgProfile.current.files[0]);
        console.dir(imgBackground.current.files[0]);

        const imgFrmProfile = new FormData();
        const imgFrmBackground = new FormData();

        imgFrmProfile.append('imgProfile', imgProfile.current.files[0]);
        imgFrmBackground.append('imgBackground', imgBackground.current.files[0]);
    
        console.dir(imgFrmProfile);
        console.dir(imgFrmBackground);
    }

    return (
        <div>
            <center>
                <form onSubmit={ handleSubmit }>
                    <h1> Configuraciones del blog </h1>
                    <h5>Foto de perfil: </h5> <br/>
                    <input type='file' ref={ imgProfile } accept='image/png, image/jpeg' /> <br/> 
                    <h5>Foto de portada: </h5> <br/>
                    <input type='file' ref={ imgBackground } accept='image/png, image/jpeg'/> <br/>
                    <input type='submit'/>
                </form>   
            </center>
            
        </div>
    );
}