import { Outlet } from 'react-router-dom';
import {Sidebar, PublicSidebar} from '..';
import './index.scss'

const Layout = ( {isLoggedIn}) => {
    return (
        <div className='App'>
            
            {isLoggedIn ? <Sidebar /> : <PublicSidebar />}
            <div className='page'>
                <Outlet/>
            </div>
        </div>
    )
}   

export default Layout;