import Myparticle from './Particless.js';
import React,{useState, useEffect} from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth , signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { collection, addDoc , setDoc, doc, getDoc} from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import fetch from 'node-fetch';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import AdminNav from "./navbars/Nav";
import Dash from './Dash.js';
import Chart from "react-apexcharts";


function Dashboard(props) {
  const {currentUser,setCurrentUser} = props;
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [key2, setKey] = useState('');
  const [secret2, setsecret] = useState('');
  const [passphrase2, setPassphrase] = useState('');
  const [uid, setUid] = useState('');
  const cb_access_passphrase = 'y44o1nbxir';
  const secret3 = 'CTJ5mZ4+X8nn0YtteRIldgFouEAE/6K1z+odBs6rSscdSle2OHZWbAHZ4XNV1X2E1anSRstUe5DLprxP+TCN+Q==';
  const cb_access_key = '4cc5e34d71a8699bd6c96be03f0cbd2e';
  const firebaseConfig = {
        apiKey: "AIzaSyCFA3Sa14Uokttej7rC7VFGSIePenYB6ac",
        projectId: "igi2-8ba54",
        storageBucket: "gs://igi2-8ba54.appspot.com",
    };

  async function getUser(){
    console.log('curruser',currentUser)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
          setUser(user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUid(uid)
        setEmail(user.email)
        console.log("User UID is ", uid)
      } else {
        // User is signed out
        console.log("none")
      }
    });
  }

  async function getPort(){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    //const docRef = doc(db, "portfolios", "vmZjSajSUCaRV2ouXS4bIRqjTVz2");
    const docSnap = await getDoc(doc(db, 'portfolios', uid));

    if (docSnap.exists()) {
      let data;
      console.log("Document data:", docSnap.data());
      setKey(docSnap.data().key)
      setPassphrase(docSnap.data().passphrase)
      setsecret(docSnap.data().secret)

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function setDoc(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    try {
      const docRef = await setDoc(doc(db, "portfolios", uid), {
        passphrase: cb_access_passphrase,
        secret: secret2,
        key: cb_access_key,
      });

      console.log("Document written with ID: " + uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function getPort2(){
    // import crypto library
    var crypto = require('stream-browserify');
    //var crypto2 = require('crypto-browserify');
    //var buffer = require('crypto-browserify')
    var Buffer = require('safe-buffer').Buffer;
    const fetch = require('node-fetch');
    const url = 'https://api.exchange.coinbase.com/accounts';

    // create the json request object
    var cb_access_timestamp = Date.now() / 1000; // in ms
    var cb_access_passphrase = 'y44o1nbxir';
    var secret = 'CTJ5mZ4+X8nn0YtteRIldgFouEAE/6K1z+odBs6rSscdSle2OHZWbAHZ4XNV1X2E1anSRstUe5DLprxP+TCN+Q==';
    var cb_access_key = '4cc5e34d71a8699bd6c96be03f0cbd2e'
    var requestPath = '/accounts';
    var body = '';
    var method = 'GET';

    // create the prehash string by concatenating required parts
    var message = cb_access_timestamp + method + requestPath;

    // decode the base64 secret
    var key = new Buffer(secret2, 'base64');
    //console.log("key", key)
    var CryptoJS = require("crypto-js");
    var hmac = CryptoJS.HmacSHA1(message, secret);

    // create a sha256 hmac with the secret
    //var hmac = createHmac('sha256', key);

    // sign the require message with the hmac and base64 encode the result
    //var cb_access_sign = hmac.update(message).digest('base64');

    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'cb-access-key': key2,
          'cb-access-passphrase': passphrase2,
          'cb-access-sign': hmac,
          'cb-access-timestamp': cb_access_timestamp
        }
      };
      
      fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
  }

  async function getPort3(){
    const response = await fetch('http://localhost:3004/portfolio');

    if (response.ok) {
        const data = await response.json();
        console.log("data", data)
    } else {
        // add your action when response is not ok
    }
    //.then((res) => (res))
  }
  
  useEffect(() => {
    getUser()
    console.log('email',email)
    console.log('user',user)
    
    //getPort()
  }, [email,user]);

  useEffect(() => {
    getPort()
    //setDoc()
  }, [uid]);

  useEffect(() => {
    getPort3()
    //setDoc()
  }, [secret2]);


    return (
      <div className="section"> 
        <Myparticle/>
          <AdminNav/>
          <div className='flex flex-row min-w-full place-content-center'>
            <div className="card block text-white gradient-border">
              <h3 className='m-5 zz orbitron'>Welcome, {email} </h3>
              <Dash/>
          </div>
        </div>
      </div>
    );
}


export default Dashboard;