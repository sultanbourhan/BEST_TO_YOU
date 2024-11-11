import React, { useEffect , useState} from 'react';
import "./Signin.css";

import Axios from "axios";

import { useCookies } from "react-cookie"

import { useNavigate } from "react-router-dom"

import img_back1 from "../../image/hero-shape-2.svg";

import login_img from "../../image/login.svg";
import sign_img from "../../image/sign.svg";

export default function Signin() {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".signin");

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
      
      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    } else {
      console.error('Elements not found!');
    }
  }, []); // تأكد من وضع مصفوفة التبعية فارغة لتشغيلها مرة واحدة عند التحميل

    //----------------------------------------------------------

    const Navigate = useNavigate()

    const [Cook , setCookies] = useCookies("token")

    const [emailup, setemailup] = useState("")
    const [passwordup, setpasswordup] = useState("")

    const [erroremailup, errorsetemailup] = useState("")
    const [errorpasswordup, errorsetpasswordup] = useState("")

    const [errorup, errorsetup] = useState("")

    const login = async (e) => {
        e.preventDefault();
        await Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/login`, {
            email : emailup,
            password : passwordup
        })
          .then((res) => {
            console.log('استجابة الخادم:', res.data);

            setemailup("")
            setpasswordup("")

            errorsetemailup("")
            errorsetpasswordup("")

            errorsetup("")

            setCookies("token",res.data.token)
            window.localStorage.setItem("user" , JSON.stringify(res.data.data) )

            Navigate("/")

          })
          .catch((error) => {
            console.log(error)

            const errors =error.response.data.errors

                if(errors !== undefined){
                    errors.map((err)=>{

                        if(err.path === 'email'){
                            const e_error = errors.filter((e)=> e.path ===  'email')
                            errorsetemailup(e_error[0].msg)
                        }
        
                        if(err.path === 'password'){
                            const p_error = errors.filter((e)=> e.path ===  'password')
                            errorsetpasswordup(p_error[0].msg)
                        }
                        })

                        errorsetup("")
            
                }else{
                    errorsetup(error.response.data.message)
                    errorsetemailup("")
                    errorsetpasswordup("")
                }
            }
        );
      };


      // ----------------------------------------------


    const [emailin, setemailin] = useState("")
    const [passwordin, setpasswordin] = useState("")
    const [namein, setnamein] = useState("")
    const [passwordConfirmin, setpasswordConfirmin] = useState("")

    const [erroremailin, errorsetemailin] = useState("")
    const [errorpasswordin, errorsetpasswordin] = useState("")
    const [errornamein, errorsetnamein] = useState("")
    const [errorpasswordConfirmin, errorsetpasswordConfirmin] = useState("")

    const [errorin, errorsetin] = useState("")

    const Signup = async (e) => {
      e.preventDefault();
      await Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/sign_up`, {
          name :namein,
          email : emailin,
          password : passwordin,
          passwordConfirm : passwordConfirmin
      })
        .then((res) => {
          console.log('استجابة الخادم:', res.data);

          setemailin("")
          setpasswordin("")
          setnamein("")
          setpasswordConfirmin("")

          errorsetemailin("")
          errorsetpasswordin("")
          errorsetnamein("")
          errorsetpasswordConfirmin("")

          setCookies("token",res.data.token)
          window.localStorage.setItem("user" , JSON.stringify(res.data.data) )

          Navigate("/")

        })
        .catch((error) => {
          console.log(error.response.data.errors)

          const errors =error.response.data.errors

          if(errors !== undefined){
            errors.map((err)=>{

                if(err.path === 'email'){
                    const e_error = errors.filter((e)=> e.path ===  'email')
                    errorsetemailin(e_error[0].msg)
                }

                if(err.path === 'password'){
                    const p_error = errors.filter((e)=> e.path ===  'password')
                    errorsetpasswordin(p_error[0].msg)
                }

                if(err.path === 'name'){
                    const p_error = errors.filter((e)=> e.path ===  'name')
                    errorsetnamein(p_error[0].msg)
                }

                if(err.path === 'passwordConfirm'){
                    const p_error = errors.filter((e)=> e.path ===  'passwordConfirm')
                    errorsetpasswordConfirmin(p_error[0].msg)
                }
                })

                errorsetup("")
    
        }else{
            errorsetup(error.response.data.message)
            errorsetemailup("")
            errorsetpasswordup("")
        }

        }
      );
    };

  return (
    <div className="signin">
        <img className='back1' src={img_back1}/>
      <div className="forms-container">
        <div className="signin-signup">

          <div className="sign-in-form form">
            <h2 className="title">Log in</h2>
            <p>{errorup}</p>
            <div className="input-field">
                <p>{erroremailup}</p>
                <span className="material-symbols-outlined">
                person
                </span>
              <input type="email" placeholder="Email" value={emailup} onChange={(e)=>setemailup(e.target.value)}/>
            </div>
            <div className="input-field">
            <p>{errorpasswordup}</p>
            <span className="material-symbols-outlined">
                lock
            </span>
              <input type="password" placeholder="Password" value={passwordup} onChange={(e)=>setpasswordup(e.target.value)}/>
            </div>
            <input onClick={login} type="submit" value="Login" className="btn solid" />
          </div>

          <div className="sign-up-form form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <p>{errornamein}</p>
            <span className="material-symbols-outlined">
                person
            </span>
              <input type="text" placeholder="Username" value={namein} onChange={(e)=>setnamein(e.target.value)}/>
            </div>
            <div className="input-field">
            <p>{erroremailin}</p>
            <span className="material-symbols-outlined">
                mail
            </span>
              <input type="email" placeholder="Email" value={emailin} onChange={(e)=>setemailin(e.target.value)}/>
            </div>
            <div className="input-field">
            <p>{errorpasswordin}</p>
              <span className="material-symbols-outlined">
                  lock
              </span>
              <input type="password" placeholder="Password" value={passwordin} onChange={(e)=>setpasswordin(e.target.value)}/>
            </div>
            <div className="input-field">
            <p>{errorpasswordConfirmin}</p>
              <span class="material-symbols-outlined">
                lock_reset
              </span>
              <input type="password" placeholder="Password Confirm" value={passwordConfirmin} onChange={(e)=>setpasswordConfirmin(e.target.value)}/>
            </div>
            <input onClick={Signup} type="submit" className="btn" value="Sign up" />
          </div>

        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome to B2U</h3>
            <p>
            Welcome to B2U, your ultimate business directory! Connect 
            with top companies and discover unparalleled services. Don't have an account? 
            Create one and unlock endless opportunities.
            </p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={login_img} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome to B2U</h3>
            <p>
            Gain access to exclusive business insights and connect with 
            top-tier companies. Whether you're looking to expand your network 
            or explore new opportunities, our platform is designed to help you succeed. 
            Sign in now to start your journey with B2U.
            </p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src={sign_img} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
