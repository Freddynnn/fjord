import './App.scss';
import {Routes, Route, Navigate} from 'react-router-dom';
import { useState } from "react";
import { About, Contact, Home, Settings} from './components';

import {Books, Book, Movies, Movie, Music, Release, Shows, Show, NewEntry, Search} from './components/Media'
import {Login, Register} from './components/Users'
import {Layout, Protected} from './components/UI'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  //state for userdata to display when logged in
  const [user, setUser] = useState(null); 

  const logIn = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setUser(null);
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
        <Route path='/shows'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Shows user={user}/>
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
        <Route path='/books'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <Books user={user}/>
            </Protected>
          } 
        />
        
        <Route path='/new'  
          element = {
            <Protected isLoggedIn={isLoggedIn}>
              <NewEntry user={user}/>
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
