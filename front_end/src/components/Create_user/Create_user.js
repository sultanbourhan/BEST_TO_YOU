import React from 'react'

import "./Create_user.css"

import Axios from 'axios';

import { useNavigate } from 'react-router-dom';


import {useState} from 'react'
import { useCookies } from "react-cookie";


export default function Create_user() {

  const Navigate = useNavigate();

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setpassword] = useState("")
  const [passwordConfirm , setpasswordConfirm] = useState("")
  const [role , setrole] = useState("")
  const [phone , setphone] = useState("")

  const [Nameerr , setNameerr] = useState("")
  const [emailerr , setEmailerr] = useState("")
  const [passworderr , setpassworderr] = useState("")
  const [passwordConfirmerr , setpasswordConfirmerr] = useState("")
  const [roleerr , setroleerr] = useState("")
  const [phoneerr , setphoneerr] = useState("")

  const [cookies] = useCookies(["token"]);


  const handleSubmit = ()=>{
    Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user`,{
      name ,
      email ,
      password,
      passwordConfirmerr,
      passwordConfirm,
      role,
    }, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    }).then((res)=>{

      console.log(res)

      setName("");
      setEmail("");
      setpassword("");
      setpasswordConfirm("");
      setrole("");
      setphone("");


      setNameerr("");
      setEmailerr("");
      setpassworderr("");
      setpasswordConfirmerr("");
      setroleerr("");
      setphoneerr("");

      Navigate("/admin/get_user");


    }).catch((err)=>{

      setNameerr("");
      setEmailerr("");
      setpassworderr("");
      setpasswordConfirmerr("");
      setroleerr("");
      setphoneerr("");


      console.log(err.response.data.errors)

      const errors = err.response.data.errors

        errors.map((err)=>{
          
          if(err.path === 'name'){
            const e_error = errors.filter((e)=> e.path ===  'name')
            setNameerr(e_error[0].msg)
          }

          if(err.path === 'email'){
            const e_error = errors.filter((e)=> e.path ===  'email')
            setEmailerr(e_error[0].msg)
          }

          if(err.path === 'password'){
            const p_error = errors.filter((e)=> e.path ===  'password')
            setpassworderr(p_error[0].msg)
          }

          if(err.path === 'passwordConfirm'){
            const pc_error = errors.filter((e)=> e.path ===  'passwordConfirm')
            setpasswordConfirmerr(pc_error[0].msg)
          }

          if(err.path === 'role'){
            const pp_error = errors.filter((e)=> e.path ===  'role')
            setroleerr(pp_error[0].msg)
          }

          if(err.path === 'phone'){
            const pp_error = errors.filter((e)=> e.path ===  'phone')
            setphoneerr(pp_error[0].msg)
          }
        })



    })
    

  }

  return (
    <div className='Create_user'>
      <h2>Create User</h2>
        <div className='inputs'>

          <div className="coolinput">
            <p>{Nameerr}</p>
            <label htmlFor="name" className="text">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e)=> setName(e.target.value)}/>
              
          </div>

          <div className="coolinput">
          <p>{emailerr}</p>
            <label htmlFor="email" className="text">Email:</label>
            <input
              type="text"
              id="email"
              placeholder="Name"
              className="input"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}/>
          </div>


          <div className="coolinput">
          <p>{phoneerr}</p>
            <label htmlFor="phone" className="text">Phone:</label>
            <input
              type="number"
              id="phone"
              placeholder="Name"
              className="input no-spinners"
              value={phone}
              onChange={(e)=> setphone(e.target.value)}/>
          </div>

          <div className="coolinput">
          <p>{passworderr}</p>
            <label htmlFor="password" className="text">Password:</label>
            <input
              type="Password"
              id="password"
              placeholder="Name"
              className="input"
              value={password}
              onChange={(e)=> setpassword(e.target.value)}/>
          </div>

          <div className="coolinput">
          <p>{passwordConfirmerr}</p>
            <label htmlFor="passwordConfirm" className="text">PasswordConfirm:</label>
            <input
              type="Password"
              id="passwordConfirm"
              placeholder="Name"
              className="input"
              value={passwordConfirm}
              onChange={(e)=> setpasswordConfirm(e.target.value)}/>
          </div>

          <div className="coolinput">
          <p>{roleerr}</p>
              <label htmlFor="role" className="text">Role:</label>
              <select className="input" value={role} onChange={(e)=> setrole(e.target.value)}>  
                <option value="" hidden>Select role</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="employee">employee</option>
              </select>
            </div>

          {/* زر الإرسال */}
          <button onClick={handleSubmit} type="submit">Create</button>
        </div>
    </div>
  )
}
