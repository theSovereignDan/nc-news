import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function RedirectLanding() {
    const navigate = useNavigate();

    useEffect(()=> {
        navigate("/")
    })

}

export default RedirectLanding