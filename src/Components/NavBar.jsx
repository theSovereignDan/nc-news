import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import { useContext } from 'react';
function NavBar() {
    const {user} = useContext(UserContext)
    const {setUser} = useContext(UserContext)

    function logOut(event) {
        event.preventDefault()

        setUser("")
    }

    return (<div className = "navbar">
        <Link to="/"><button>All Articles</button></Link>
        <Link to="/topics"> <button>Topics</button></Link>
        {user ? <button onClick={logOut}className="rightButton">Log Out</button> : <Link to="/signin"><button className="rightButton">Log In</button></Link>}
    </div>)
}
export default NavBar