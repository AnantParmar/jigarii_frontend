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
    const setLoginedUser = ()=>{

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
          const customToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('customtoken='))
            .split('=')[1];
        console.log(customToken)
        const json = await response.json();
        setLoading(false)
        setQuotes(json)

    }
    return (
        <QuoteContext.Provider value={{user,data,imgURL,quotes,loading, setUser,setData,getUser,setImgURL,getQuotes,updateLikeCount,setLoginedUser}}>
            {props.children}
        </QuoteContext.Provider>
    )
}

export default QuoteState;