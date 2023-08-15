import { useState } from "react";
import QuoteContext from "./quoteContext";
import { auth,app } from "../../config";
import { signInWithCustomToken } from "firebase/auth";
const CryptoJS = require("crypto-js");
const QuoteState = (props)=> {

    const [user, setUser] = useState('');
    const [data, setData] = useState('');
    const [imgURL,setImgURL] = useState('');
    const [loading,setLoading] = useState(false);
    const quotesInitial = [];
    const [quotes, setQuotes] = useState(quotesInitial)
    const getUser = (uid) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('https://backend-kappa-murex.vercel.app/api/auth/getUser',requestOptions)
        .then(async (response)=>{
            const resPonse = await response.json();
            
            // setUser(resPonse.user)
        })
        .catch((error)=>{
        })
    }
    const updateLikeCount= (likeCount,updateValue,docId,uid)=> {
        const val = likeCount + updateValue;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            // credentials: "include",
            body: JSON.stringify({ val: updateValue, docId: docId,uid:uid }) 
            
        };
        fetch('https://backend-kappa-murex.vercel.app/api/quote/updateLikeCount',requestOptions)
        .then(async (response)=>{
            const resPonse = await response.json();
            return resPonse.result;
            
            // setUser(resPonse.user)
        })
        .catch((error)=>{
        })
    }
    const getLikedCount =  async (uid)=>{
        const response = await fetch(`https://backend-kappa-murex.vercel.app/api/quote/getLikedCount`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: uid}),
            credentials: 'include',
          });
          
        const json = await response.json();
        setData(json)
    }
    const setLoginedUser = (token)=>{
        signInWithCustomToken(auth, token)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            setUser(user)
            console.log(user.uid)
            user && user.photoURL && setImgURL(user.photoURL)
            getLikedCount(user.uid)
        })
        .catch((error) => {
            
            console.log(error)
        });

    }
    const getQuotes = async () => {
        setLoading(true)
        // const response = await fetch(`https://backend-kappa-murex.vercel.app/api/quote/getQuotes`, {
        const response = await fetch(`https://backend-kappa-murex.vercel.app/api/quote/getQuotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          });
          
        const json = await response.json();
        setLoading(false)
        setQuotes(json)

    }
    const getCookie=(cookieName)=> {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
        }
    }
    
    return '';
    }
    const encryptData = (data)=>{
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_ENERGY).toString();
        return ciphertext;
    }
    const decryptData = (ciphertext)=>{
        var bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SECRET_ENERGY);
        var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    }
    return (
        <QuoteContext.Provider value={{user,data,imgURL,quotes,loading, setUser,setData,getUser,setImgURL,getQuotes,updateLikeCount,setLoginedUser,getCookie,encryptData,decryptData}}>
            {props.children}
        </QuoteContext.Provider>
    )
}

export default QuoteState;