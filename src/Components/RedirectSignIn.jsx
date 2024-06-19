import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function RedirectSignin() {
    const navigate = useNavigate();

    useEffect(()=> {
        navigate("/signin")
    })

}

export default RedirectSignin