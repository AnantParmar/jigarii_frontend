import { useState } from "react";
import QuoteContext from "./quoteContext";
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
            credentials: 'include',
        };
        fetch('https://backend-kappa-murex.vercel.app/api/auth/getUser',requestOptions)
        .then(async (response)=>{
            const resPonse = await response.json();
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
            body: JSON.stringify({ val: updateValue, docId: docId,uid:uid }),
            credentials: 'include', 
            
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
    const getQuotes = async () => {
        setLoading(true)
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
    // const userSetPersistence = async ()=>{
    //     try {
    //         await setPersistence(auth, browserLocalPersistence);
    //         console.log("setted persistence");
    //         console.log(auth.currentUser)
    //         checkPersistence();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // } 
    // const checkPersistence = ()=>{
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //           setUser(user)
    //           getLikedCount(user)
    //           console.log('Persisted user:', user);
    //         } else {
    //           console.log('No persisted user');
    //         }
    //     })
    // } 
    return (
        <QuoteContext.Provider value={{user,data,imgURL,quotes,loading, setUser,setData,getUser,setImgURL,getQuotes,updateLikeCount,getLikedCount}}>
            {props.children}
        </QuoteContext.Provider>
    )
}

export default QuoteState;