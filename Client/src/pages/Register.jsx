import { useState } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'
import Logo from '../../images/logoalb.png'
import {Link} from "react-router-dom"
import { CiLogin } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const registerUser = async (e) =>{
    e.preventDefault();
    const {name, email, phone, password} = data
    try{
      const {data} =await axios.post('/register',{
        name, email, phone, password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Cont creat cu SUCCES!')
        navigate('/login')
      }
    }catch(error){
      console.log(error)
    }
  }

  
  return (
    <section className='sectionLogin'>
          <img src={Logo} alt="Logo" className='logoDigitalOptions' />
    <div className='sectionIntro'>
      <Link className='linkReg' to='/login'><div className='sectionIntroRegister2'><CiLogin className='iconAutentification'/>Autentificare</div></Link>
      <div className='sectionIntroLogin2'><CiBookmarkCheck className='iconAutentification' />Inregistrare</div>
    </div>
    <div className='formLogin user-box'>
      <form onSubmit={registerUser}>
      <h1 className='autentification'>Inregistrare</h1>
        <label className='textEmail'>Nume</label>
        <input className='inputEmail' type="text" placeholder='' value={data.name} onChange={(e)=> setData({...data, name: e.target.value})}/>
        <label className='textEmail'>Numar de telefon</label>
        <input className='inputEmail' type="text" placeholder='' value={data.phone} onChange={(e)=> setData({...data, phone: e.target.value})}/>
        <label htmlFor="" className='textPassword'>Email</label>
        <input className='inputEmail' type="email" placeholder='' value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>
        <label className='textPassword' htmlFor="">Parola</label>
        <input className='inputEmail' type="password" placeholder='' value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}/>
        <button className="submit">Inregistreaza-te</button>
      </form>
    </div>
    </section>
  )
}
