import React,{useContext,useEffect} from 'react';
import Myparticle from './Particless.js';
import LoginContext from '../contexts/LoginContext';
import Login from './Login.js';
import AuthNav from './navbars/NavbarAuth';
import { useLocation, Route,Router, Routes,Redirect } from "react-router-dom";
import Routes2 from "../Routes2.js";
import logo from '../images/navlogo.png'



//main page for login

function Main() {

  // state for whether to show login or title page
    const {loginpage, setloginpage} = useContext(LoginContext);

    async function showLogin(){
      if(loginpage){
        setloginpage(false)
      }else{
        setloginpage(true)
      }
      console.log(loginpage,'show login card')
    }
  
    useEffect(() => {

    }, [loginpage]);



  
    return (
        <div className='mainpage'>
          <Myparticle/>
          <AuthNav/>
          <div className='section'>
            {loginpage ? (<Login/>) : (
            <div className='text flex flex-col content-between'>
              <div className='flex flex-row text-center place-content-center lg:place-content-start min-w-full md:p-9'>
                <p data-aos="fade-right" data-aos-duration="2300" className="glitch"><span aria-hidden="true"></span>BYTE THE GLASS</p>
              </div>
              <div className='flex flex-row min-w-full text-center place-content-center lg:place-content-end md:p-9'>
                <p data-aos="fade-right" data-aos-delay="350" data-aos-duration="2500" className="glitch"><span aria-hidden="true"></span>BUILD THE FUTURE</p>
              </div>
            </div>
            )} 
          </div>
          
        </div>
    );
  }
  
  export default Main;