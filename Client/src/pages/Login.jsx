import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../images/logoalb.png';
import { Link } from "react-router-dom";
import { CiLogin, CiBookmarkCheck } from "react-icons/ci";

axios.defaults.baseURL = 'http://localhost:8000'; // Setează baza URL pentru axios
axios.defaults.withCredentials = true; // Permite trimiterea cookie-urilor

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate('/dashboard');
        toast.success('Te-ai logat cu succes!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Eroare la autentificare. Te rugăm să încerci din nou.');
    }
  };

  return (
    <section className='sectionLogin'>
      <img src={Logo} alt="Logo" className='logoDigitalOptions' />
      <div className='sectionIntro'>
        <div className='sectionIntroLogin'><CiLogin className='iconAutentification'/>Autentificare</div>
        <Link className='linkReg' to='/register'><div className='sectionIntroRegister'><CiBookmarkCheck className='iconAutentification' />Inregistrare</div></Link>
      </div>
      <div className='formLogin user-box'>
        <form action="" onSubmit={loginUser} className='formLoginClasses'>
          <h1 className='autentification'>Autentificare</h1>
          <label htmlFor="" className='textEmail'>Adresa de email</label>
          <input className='inputEmail' type="text" placeholder='' value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>
          <label htmlFor="" className='textPassword'>Parola</label>
          <input className='inputEmail' type="password" placeholder='' value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}/>
          <button className="submit">Logheaza-te</button>
          <p className='textWithRegister'>Ai uitat parola?<Link className='linkReg' to='/register'></Link></p>
        </form>
      </div>
    </section>
  );
}
