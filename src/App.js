import './App.css';
import React,{useState, useEffect,Suspense} from 'react'
import {
  Route,
  Routes,
} from "react-router-dom";
import MembersPage from './components/MembersPage';
import Main from './components/Main';
import Calendly from './components/Calendly';
import Events from './components/Events.js';
import Profile from './components/Profile.js';
import LoginContext from './contexts/LoginContext';
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from './components/Dashboard.js';
import { APP_STATIC_PATH } from './Routes2';
import {Link} from "react-router-dom";

function App() {
  const [loginpage, setloginpage] = useState(false)
  const [dashpage, setdashpage] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [isOpen]);

  return (
    <LoginContext.Provider value={{loginpage, setloginpage, dashpage, setdashpage, isOpen, setOpen}}>
        <div className="App">
          <Routes>
            <Route path={APP_STATIC_PATH.Main} element={<Main/>}/>
            <Route path={APP_STATIC_PATH.Calendly} element={<Calendly/>}/>
            <Route path={APP_STATIC_PATH.Dashboard} element={<Dashboard/>}/>
            <Route path={APP_STATIC_PATH.Profile} element={<Profile/>}/>
            <Route path={APP_STATIC_PATH.Members} element={<MembersPage/>}/>
            <Route path={APP_STATIC_PATH.Events} element={<Events/>}/>
          </Routes>
          {/* dropdown menu state passed down through context */}
          {isOpen && (<div id="nav-menu" data-aos="slide-right" data-aos-duration="500">
            <ul tabIndex={0}>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/dashboard" onClick={()=>setOpen(false)}>Dashboard</Link></li>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/calendly" onClick={()=>setOpen(false)}>Calendly</Link></li>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/events" onClick={()=>setOpen(false)}>Events</Link></li>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/members" onClick={()=>setOpen(false)}>Members</Link></li>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/profile" onClick={()=>setOpen(false)}>Settings</Link></li>
                    <li><Link className="mr-3 text-blue2 bg-black" to="/" onClick={()=>setOpen(false)}>Logout</Link></li>
                </ul>
            </div>)}
            
    </div>
    </LoginContext.Provider>
  );
}

export default App;
