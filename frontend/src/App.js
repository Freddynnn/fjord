import './App.scss';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import { About, Contact, Home, Settings } from './components';
import { Books, Book, Movies, Movie, Music, Release, Shows, Show, EditEntry, Search, Watchlist } from './components/Media';
import { Login, Register } from './components/Users';
import { Layout, Protected } from './components/UI';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const logIn = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);

    // Redirect to the previously saved location or home
    const from = location.state?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };



  return (
    <>
    <Routes>
      <Route path = "/" element = {<Layout isLoggedIn={isLoggedIn}/>}>
        {/* public routes */}
        <Route index  element = {<Home isLoggedIn={isLoggedIn}/>} />
        <Route path='/about'  element = {<About/>} />
        <Route path='/contact'  element = {<Contact/>} />
        <Route path='/settings' element = {<Settings user={user} logOut={logOut}/>}/>

        {/* login routes */}
        <Route path="/login" element={ isLoggedIn 
          ? <Navigate to="/" replace /> 
          : <Login logIn={logIn} />}
        />
        <Route path="/register" element={<Register />} />


        {/* protected routes */}
        <Route path='/movies'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Movies user={user}/>
            </Protected>
          } 
        />
        <Route path="/movies/movie/:id" 
          element={
            <Protected isLoggedIn={isLoggedIn}>    
              <Movie user={user}/>
            </Protected>
          } 
        />

        <Route path='/shows'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Shows user={user}/>
            </Protected>
          } 
        />
        <Route path="/shows/show/:id" 
          element={
            <Protected isLoggedIn={isLoggedIn}>    
              <Show user={user}/>
            </Protected>
          } 
        />


        <Route path='/music'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Music user={user}/>
            </Protected>
          } 
        />

        <Route path="/music/release/:id" 
          element={
            <Protected isLoggedIn={isLoggedIn}>    
              <Release user={user}/>
            </Protected>
          } 
        />
        <Route path='/books'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Books user={user}/>
            </Protected>
          } 
        />

        <Route path="/books/book/:id" 
          element={
            <Protected isLoggedIn={isLoggedIn}>    
              <Book user={user}/>
            </Protected>
          } 
        />
        
        <Route path='/new'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <EditEntry user={user}/>
            </Protected>
          } 
        />
        <Route path='/search'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Search user={user}/>
            </Protected>
          } 
        />
        <Route path='/watchlist'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Watchlist user={user}/>
            </Protected>
          } 
        />
          
        {/* <Route path='/movies'  element = {<Movies/>} />
        <Route path='/shows'  element = {<Shows/>} />
        <Route path='/music'  element = {<Music/>} />
        <Route path='/books'  element = {<Books/>} />
        <Route path='/settings'  element = {<Settings/>} />
        <Route path='/new'  element = {<NewEntry/>} />
        <Route path='/search'  element = {<Search/>} /> */}
      </Route>
      
    </Routes>
    
    </>
    
  );
}

export default App;
