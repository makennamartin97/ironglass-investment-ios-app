import React, {useState,useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Myparticle from './Particless.js';
import AdminNav from "./navbars/Nav";
import { initializeApp } from 'firebase/app';
import { getAuth , onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc , setDoc, doc, getDocs} from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const MembersPage = () => {
    const [members2,setMembers2] = useState([])
    let members = []
    //const members = [{firstname: 'Jake',lastname:'Hitzges', bio: 'CEO, lives on boat, only eats cheese and crackers', img: '../jake.png'},{firstname: 'Dardan',lastname:'Bela', bio: 'CMO, has a chris brown feature', img: '../dardan.png'},{firstname: 'Osaze',lastname:'Moore', bio: 'CTO, Dubstep Wagwan love weed', img: '../osaze.png'},{firstname: 'Makenna',lastname:'Martin', bio: 'Four loko queen, king cobra lover, coder', img: '../makenna.png'},{firstname: 'Jake',lastname:'Hitzges', bio: 'CEO, lives on boat, only eats cheese and crackers', img: '../jake.png'},{firstname: 'Dardan',lastname:'Bela', bio: 'CMO, has a chris brown feature', img: '../dardan.png'},{firstname: 'Dardan',lastname:'Bela', bio: 'CMO, has a chris brown feature', img: '../dardan.png'}]
    //const members2 =useState([])

    const firebaseConfig = {
        apiKey: "AIzaSyCFA3Sa14Uokttej7rC7VFGSIePenYB6ac",
        projectId: "igi2-8ba54",
        storageBucket: "gs://igi2-8ba54.appspot.com",
    };

    async function getAllMembers(){
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log('render')
          console.log(doc.id, " => ", doc.data());
          const data = doc.data();
          const full = {name: data.Name, bio: data.bio, img: data.img,uid:data.uid}
          members.push(full)
          console.log('members',members)
        });
        console.log(members2,'members state1')
        setMembers2(members)
    }

    useEffect(() => {
        AOS.init();
        AOS.refresh();
      }, []);

      useEffect(() => {
        getAllMembers();
      }, []);


    return(
        <div className="section members"> 
          <Myparticle/>
          <AdminNav/>

          <div class="text-center mb-12 text-xl lg:text-left header p-4 md:p-0">
            <h1 data-aos="fade-right" data-aos-duration="2500" className="lg:ml-20 lg:mt-8 text-[#9ca3af] orbitron underline decoration-[#34b2fd] underline-offset-8">Our Members</h1>
          </div>
   
          <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center lg:space-evenly' >
            {members2 && members2.map((m,i) => (
              <div className="card glass mb-8 hover-item w-50 m-9 md:m-3 mt-0 w-96 md:w-80 lg:w-80 lg:m-20 lg:mt-0 2xl:w-80" key={i}>
                <figure className="frame"><img src={m.img} alt="..."/></figure>
                <div className="card-body text-white">
                  <h4 className="card-title">{m.name}</h4>
                  <div className="card-actions">
                    <p>{m.bio}</p>
                  </div>
                </div>
              </div> 
              ))}
          </div> 
        </div>
       

    )
}

export default MembersPage;