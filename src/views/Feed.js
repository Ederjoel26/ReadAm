import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Feed = () => {

    const cookie = new Cookies();
    const navigate = useNavigate();

    const handleClick = () => {
        cookie.remove('email');
        navigate('/login');
    }

    useEffect(() => {
        if(cookie.get('email') === undefined){
            navigate('/login');
        }
    }, [])

    return (
        <div>
            <center>
                <h1>Este es el feed</h1>
                <input type = 'button' value = 'Log out' onClick = { handleClick } />
            </center>
        </div>
    );
}