import './index.scss';

const Settings = ({ user, logOut }) => {
    return (
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                   Welcome 
                   {user && ' ' + user.username}
                </h1>
                <p>
                    We're working on it =P     
                </p>

                <button onClick={logOut}>Log Out</button>
            </div>
        </div>
    );
};

export default Settings;
