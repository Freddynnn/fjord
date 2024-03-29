import './index.scss'

const Settings = ( {user, logout}) => {
    
    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                   COMING SOON !!!
                </h1>
                <p>
                    We're workin on it  =P     
                </p>

                <button onClick={logout}>logOut</button>
            </div>

        </div>
    );
}   

export default Settings;