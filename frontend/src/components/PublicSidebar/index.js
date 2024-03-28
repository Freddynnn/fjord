import './index.scss'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEye, faFilm, faGear, faMusic, faHome, faTv, faUser, faList, faPlusCircle, faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const PublicSidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <div >FJ</div>
        </Link>
        

        <nav>
            
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="login-link"  to="/login">
                <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="register-link"  to="/register">
                <FontAwesomeIcon icon={faPlusCircle} />
            </NavLink>

            <NavLink exact="true" activeclassname="active"  className="about-link"  to="/about">
                <FontAwesomeIcon icon={faInfoCircle} />
            </NavLink>
            
            
        </nav>

        <ul>
            <li>
                <NavLink exact="true" activeclassname="active"  className="settings-link"  to="/settings">
                    <FontAwesomeIcon icon={faGear} className='icon'/>
                </NavLink>
            </li>
        </ul>
    </div>

)

export default PublicSidebar;