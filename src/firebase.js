import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
         getAuth, 
         signInWithEmailAndPassword, 
         signOut} from "firebase/auth";
import { collection,
         addDoc, 
         getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBoyyiV7x3KSc6Wsn-vDlcfN0Ft4iYwbsc",
  authDomain: "netflix-clone-e7652.firebaseapp.com",
  projectId: "netflix-clone-e7652",
  storageBucket: "netflix-clone-e7652.appspot.com",
  messagingSenderId: "699254253939",
  appId: "1:699254253939:web:97f262876effb81c24bd06"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local ",
        email,
    })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout=async()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}