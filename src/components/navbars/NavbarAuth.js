import React,{useState, useEffect,useContext} from 'react';
import logo from '../../images/navlogo.png'
import LoginContext from '../../contexts/LoginContext';
import {Link} from "react-router-dom";


function NavbarAuth(){
    const {loginpage, setloginpage} = useContext(LoginContext);
    const [navbg,setNavbg] = useState(false)

    async function showLogin(){
      if(loginpage){
        setloginpage(false)
      }else{
        setloginpage(true)
      }
    }
    
    useEffect(() => {
    }, [loginpage]);

    // function for the navbar to darken on scroll
    const changeNav = ()=>{
      if(window.scrollY >= 80){
        setNavbg(true)
      }else{
        setNavbg(false)
      }
    }

    window.addEventListener('scroll',changeNav)


    return (

      <div className={navbg ? "navbar bg-base-100 navbar-auth active lg:justify-between" : "navbar bg-base-100 navbar-auth lg:justify-between" }>
        <div className="p-7 w-screen justify-between">
          <Link to="/">
            <img src={logo} alt="..."className="w-48" />
          </Link>
          <ul className="menu menu-horizontal">
          {loginpage ? (<div className='btn bg-black blue2' onClick={showLogin}>Go Back</div>) : (<div className={navbg ?  "btn text-black blue2 orbitron":"btn bg-black text-blue2 blue2-border hover-item-sm orbitron" } onClick={showLogin}>Investor Login</div>)}
        </ul>
            
        </div>

        
      </div>
          

    )
}
export default NavbarAuth