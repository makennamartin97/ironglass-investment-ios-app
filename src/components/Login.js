import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword} from "firebase/auth";
import React,{useState, useEffect} from 'react';
import { Navigate,Link } from "react-router-dom";


//login card component
function Login(props) {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState('')
  const [login, setlogin] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  async function submitLogin (e){
    e.preventDefault()

    const firebaseConfig = {
        apiKey: "AIzaSyCFA3Sa14Uokttej7rC7VFGSIePenYB6ac",
        projectId: "igi2-8ba54",
        storageBucket: "gs://igi2-8ba54.appspot.com",
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
   
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('user',user);
        setUser(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        alert(errorMessage)
      });
    }

    const onChangeHandler = (field, val)=> {
      if(field === "username"){
        setEmail(val);
      }
      if(field === "password"){
        setPassword(val);
      }
    }

    useEffect(()=>{

    },[error])

    return (
      <div className="login flex flex-col content-center">
        <div className="card glass mb-8 w-96">
          <form>
            <div className="card-body text-black">
              <h1 className="card-title">Sign in</h1>
              <input type="email" placeholder="Email or Phone" id="username" className="text-slate-500 mt-2 input w-full max-w-xs" onChange={(e) => {onChangeHandler("username",e.target.value)}}/>
                    
              {user && (
                <Navigate to="/dashboard" replace={true} />
              )}
              <input type="password" placeholder="Password" id="password" className="text-slate-500 mt-4 input w-full max-w-xs" onChange={(e) => {onChangeHandler("password",e.target.value)}}/>
              <button onClick={submitLogin } type="submit"  className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm mt-3 font-medium text-white ">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-gold3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
              {/* if error show error in red*/}
              {error && <p className='danger'>{error}</p>}
            </div>
          </form>
        </div> 
      </div>
    );
}
  
  export default Login;