import {React, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/Signup.css'
import quoteContext from '../context/quotes/quoteContext'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useContext(quoteContext);

    const showPassword = (e) =>{
      e.preventDefault();
        const pwd = document.getElementById('password');
        const passShowBtn = document.getElementById('passShowBtn');
        if (pwd.type === "password") {
          pwd.type = "text";
          passShowBtn.classList.remove('fa-eye');
          passShowBtn.classList.add('fa-eye-slash');
        } else {
          pwd.type = "password";
          passShowBtn.classList.remove('fa-eye-slash');
          passShowBtn.classList.add('fa-eye');
        }
    }
    const onSignup = async (e) => {
      

      e.preventDefault();
      if(password!= repassword)
      {
        e.preventDefault();
        document.getElementById('repassword').style.border = "3px solid red"
        return document.getElementById('error').innerText = "password does not match"
      }
      else if(password.length<8)
      {
        e.preventDefault();
        return document.getElementById('error').innerText = "password is too short"
      }
       
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:name,email: email, password: password})
        };
        fetch('https://backend-kappa-murex.vercel.app/api/auth/signup', requestOptions)
        .then(async (response) => { 
          const data = await response.json();
          document.getElementById('msg').style.display = "block"
          // navigate('/login')
        })
        .catch((error)=>{
        })

    }

  return (
    <div id='signupMainDiv'>
      <h2 id='signupText'>SignUp Here</h2>
      <div id='signupFormDiv' className='formDiv'>
      <h4 id='note'>All fields are mandatory. Password should be atleast 8 characters long.</h4>
        <form id='signupForm' onSubmit={onSignup} encType='multipart/form-data'>
            <div id='nameDiv' className='signupInputDiv'>
                <label htmlFor='name'>Name</label>
                <input required type='text' name='name' id='name' value={name} onChange={e=> setName(e.target.value)} />
            </div> 
            
            <div id='emailDiv' className='signupInputDiv'>
                <label htmlFor='email'>Email</label>
                <input required type='text' name='email' id='email' value={email} onChange={e=> setEmail(e.target.value)} />
            </div>
            <div id='passwordDiv' className='signupInputDiv'>
                <label htmlFor='password'>Password</label>
                <input required type='password' name='password' id='password' value={password} onChange={(e)=>{ setPassword(e.target.value); password.length >= 7 ? e.target.style.border = "3px solid green":e.target.style.border = "3px solid red"}}/>
                <button onClick={showPassword}><i id="passShowBtn" className="fa-solid fa-eye"></i></button>
            </div>
            <div id='repasswordDiv' className='signupInputDiv'>
                <label htmlFor='repassword'>Re-enter Password</label>
                <input required type='password' name='repassword' id='repassword' value={repassword} onChange={e=> setRepassword(e.target.value)}/>
            </div>
            <h4 id='error'></h4>
            <div id='submitDiv'>
              <p id='msg'>Please Verify Email To Login</p>
              <h5 style={{margin: "10px 0px"}}>Already have Account? <span style={{color: 'blue', textDecoration: 'Underline', cursor: "pointer"}} onClick={()=>{navigate('/login')}}>Login</span></h5>
              <input disabled={!name||!email||!password||!repassword} type='submit' value={"Signup"}/>
            </div>
        </form>        

      </div>
    </div>
  )
}

export default Signup
