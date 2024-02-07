import './App.scss';
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Movies from './components/Media/Movies';
import Shows from './components/Media/Shows';
import Music from './components/Media/Music';
import Books from './components/Media/Books';
import Settings from './components/Settings';
import NewEntry from './components/NewEntry';
import Search from './components/Search';


function App() {



  return (
    <>
    <Routes>
      <Route path = "/" element = {<Layout/>}>
        <Route index  element = {<Home/>} />
        <Route path='/about'  element = {<About/>} />
        <Route path='/contact'  element = {<Contact/>} />
        <Route path='/movies'  element = {<Movies/>} />
        <Route path='/shows'  element = {<Shows/>} />
        <Route path='/music'  element = {<Music/>} />
        <Route path='/books'  element = {<Books/>} />
        <Route path='/settings'  element = {<Settings/>} />
        <Route path='/new-entry'  element = {<NewEntry/>} />
        <Route path='/search'  element = {<Search/>} />
      </Route>
      
    </Routes>
    
    </>
    
  );
}

export default App;
