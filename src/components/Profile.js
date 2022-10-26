import React, {useState, useContext, useEffect} from 'react';
import Myparticle from './Particless.js';
import AdminNav from './navbars/Nav';
import { initializeApp } from 'firebase/app';
import { getAuth , onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc , setDoc, doc, getDocs, getDoc} from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";






function Profile() {
  const [name, setName] = useState('');
  const [bio,  setBio] = useState('');
  const [url2,  seturl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [uid, setUid] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyCFA3Sa14Uokttej7rC7VFGSIePenYB6ac",
    projectId: "igi2-8ba54",
    storageBucket: "gs://igi2-8ba54.appspot.com",
};
  async function userChange(){ 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUid(uid)
        console.log(uid)
        // ...
      } else {
        // User is signed out
        console.log("none")
      }
    });
  }
  async function profileChange(){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    try {
      const docRef = await setDoc(doc(db, "users", uid), {
        Name: name,
        bio: bio,
        img: url2,
        uid: uid,
      });
      console.log("Document written with ID: " + uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // function resetFields(){
  //   setName('')
  //   setBio('')
  // }

  async function updateProfile(){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage();
    const storageRef = ref(storage, uid);
    const imagesRef = ref(storageRef, 'profile.jpg');
    const fileName = 'profile.jpg';
    const spaceRef = ref(imagesRef, fileName);
    const file = document.getElementById("myimage").files[0];
    console.log("file is ", file)
    if(name.length > 2 && bio.length > 2 && bio.length < 10){
    uploadBytes(spaceRef, file).then((snapshot) => {
      console.log('Uploaded file!');
    });
    getDownloadURL(spaceRef).then((downloadURL) => {
      console.log('File available at', downloadURL);
      seturl(downloadURL)
    });
    setDone(true)
    setError('')
    // resetFields()
  }
  else{
    // display errors
    setDone(false)
    setError('All text fields required')
  }
  }

  async function getAllMembers(){
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

  }

  async function getCurrentProfile(){
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "users", uid);
    console.log("uid is ", uid);
    const docSnap = await getDoc(doc(db, "users", uid));
    if (!docSnap.data) {
      console.log('No such document!');
    } else {
      console.log('Document data:', docSnap.data());
      const profile = docSnap.data();
      setName(profile.Name)
      setBio(profile.bio)
      setSelectedImage(profile.url)
    }
  }

  async function removeProfile(){

  }

  useEffect(() => {
    userChange()
    //getAllMembers()
  }, []);
  useEffect(() => {
    getCurrentProfile()
  }, [uid]);
  useEffect(() => {
    profileChange()
  }, [url2]);

    return (
      <div className='section'>
        <Myparticle/>
        <AdminNav/>
          <div class="text-center h-32 text-3xl lg:text-left header">
            <h1 data-aos="fade-right" data-aos-duration="2500" className="lg:ml-20 lg:mt-8 text-[#9ca3af] orbitron underline decoration-[#34b2fd] underline-offset-4">Edit Profile</h1>
          </div>
          <div className='flex place-content-center'>
            <div className="card glass mb-8 mt-12 flex flex-col lg:flex-row blueshadow-hover ">
              <div className="card-body text-black flex flex-col">
                <div className='flex flex-row justify-center content-center'>
                  <div className='profile-empty mt-2'>
                    {/* show image uploaded   */}
                    {selectedImage &&(
                        <img alt="Not Found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    )}
                 </div>
                </div>
                {/* show errors underneath image spot */}
                 {error.length>1 &&(
                   <p className='danger text-center'>{error}</p> 
                )}
              </div>
              <div className="card-body text-black flex flex-col justify-center mr-0">
                <div className='form-group flex flex-col mr-0 text-white mt-2 orbitron'>
                  <label>Name</label>
                  <input className="text-slate-500 mt-2 input w-full max-w-xs mr-0" value={name} type="text"  name="name" onChange={e => setName(e.target.value)}/>
                </div>
                <div className='form-group flex flex-col text-white mt-2 orbitron'>
                  <label>Bio</label>
                  <input placeholder="Tell us about yourself" className="text-slate-500 mt-2 input w-full max-w-xs" value={bio} type="text" name="bio" onChange={e => setBio(e.target.value)}/>
                </div>
                <div className='form-group flex flex-col text-white mt-2'>
                  <label className='mb-4 orbitron'>Upload a Profile Picture</label>
                  <input type="file" name="myImage" id="myimage" accept="image/*" multiple={false} onChange={(event) => {
                      console.log(event.target.files[0]);
                      setSelectedImage(event.target.files[0]);
                      }}/>
                </div>
                <div className='flex lg:flex-row justify-end'>
                  {/* if successful/submitted, show checkmark */}
                {done &&(
                  <button className='btn bg-[#047857] mr-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </button>
                )}
                  <button className='btn bg-black' type="submit" onClick={updateProfile} >Save </button>
                </div>
                
              </div>
            </div>
          </div>
    
      </div>
 
      );
}

  export default Profile;