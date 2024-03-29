import './index.scss'
import {Link, NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faFilm, faGear, faMusic, faHome, faTv, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <div >FJ</div>
        </Link>
        

        <nav>
            
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} />
            </NavLink>
            {/* <NavLink exact="true" activeclassname="active"  className="books-link"  to="/shows">
                <FontAwesomeIcon icon={faEye} />
            </NavLink> */}
            {/* <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faList} />
            </NavLink> */}
            {/* <NavLink exact="true" activeclassname="active"  className="new-link"  to="/new">
                <FontAwesomeIcon icon={faStar} />
            </NavLink> */}
            <NavLink exact="true" activeclassname="active"  className="movies-link"  to="/movies">
                <FontAwesomeIcon icon={faFilm} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="shows-link"  to="/shows">
                <FontAwesomeIcon icon={faTv} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="books-link"  to="/books">
                <FontAwesomeIcon icon={faBook} />
            </NavLink>
            <NavLink exact="true" activeclassname="active"  className="music-link"  to="/music">
                <FontAwesomeIcon icon={faMusic} />
            </NavLink>

            <NavLink exact="true" activeclassname="active"  className="new-link"  to="/new">
                <FontAwesomeIcon icon={faPlusCircle} />
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

export default Sidebar;