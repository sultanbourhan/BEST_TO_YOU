import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import "./My_company.css"
import StarRating from "../StarRating/StarRating";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import Loading from '../Loading/Loading';

import img_hero1 from "../../image/hero1.jpg";

export default function My_company() {

  const Navigate = useNavigate()

    const [loading, setloading] = useState(true);

    const [cookies] = useCookies(["token"]);
    const [company, setCompany] = useState(null)
    const [companyNot, setCompanyNot] = useState("")

    const [advercompany, setadvercompany] = useState([])
    



useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_my`,{
        headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
    })
    .then(res => {
        setCompany(res.data.data)
        console.log(res.data.data)
        Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_advertisements_my/${res.data.data ? res.data.data._id: null}`,{
            headers: {
                Authorization: `Bearer ${cookies.token}`,
              },
        })
        .then(res => {
            // setloading(true)
            setadvercompany(res.data.data)
            setloading(false)
        })
        .catch(error => {
            console.error('Error fetching data', error);
            setloading(false)
        });
        setloading(false)
    })
    .catch(error => {
        console.error('Error fetching data', error.response.data.message);

        setCompanyNot(error.response.data.message)

        setloading(false)
    });
}, []);

// ==============================================





if(loading){
    return (
      <Loading/>
    )
  }


  return (
    <div class="company shit">

      {
        company? 
        <div class="container">

     
        <div class="profilcom">
          <div class="test">
            <div class="info">
              <div class="infosection">
                <h1>
                    Informtion:
                    <FontAwesomeIcon onClick={()=> Navigate("/update_company_me")} style={{marginLeft: "20px", cursor:"pointer" , color: "#2196F3" ,fontSize:"25px"}} icon={faPenToSquare} />
                </h1>
                <ul>
                    <li>Email : {company ? company.email : "N/A"}</li>
                    <li>Phone : {company ? company.phone : "N/A"}</li>
                    <li>Country : {company ? company.Country : "N/A"}</li>
                    <li>City : {company ? company.city : "N/A"}</li>
                    <li>Street : {company ? company.street : "N/A"}</li>
                    <li>Ratings Quantity : {company ? company.ratingsQuantity : "0"}</li>
                    <li>Category : Damascus</li>
                    {/* <li>Subscription type : {company ? company.subscription?.type : "N/A"}</li> */}
                    <li>Subscription date : {company ? company.subscription?.startDate : "N/A"}</li>
                    <li>Expiry date : {company ? company.subscription?.endDate : "N/A"}</li>
                </ul>
              </div>
              <div class="icon">
                <div class="stars">
                    <StarRating rating={company ? company.ratingsAverage : 0} />
                </div>
                <div class="media">
                <a href={company ? company.facebook : ""}>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                  </a>
                  <a href={company ? company.linkedIn : ""}>
                    <FontAwesomeIcon className="faLinkedin" icon={faLinkedin} />
                  </a>
                  <a href={company ? company.instagram : ""}>
                    <FontAwesomeIcon className="faInstagram" icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>
            <img src={company && company.companyImage ? `http://${company.companyImage}` : "defaultImage.jpg"} 
            alt="" />
            <img
              className="img_lo"
              src={company && company.logoImage ? `http://${company.logoImage}` : "defaultLogo.jpg"}
              alt="Company Logo"
            />
          </div>
        </div>
        <div className='dec_com'>
          <div class="dec">
            <h1>Description:</h1>
            <p>
            {company ? company.description : "No Description Available"}
            </p>
          </div>
          <div class="dec">
           <div className='scrol'>
              <div className='comment'>
                  <img src={img_hero1}/>
                  <div className='commint_text'>
                    <p>sltan budhyn</p>
                    <span>dfskhfs dfujvj difuodvj ifusidjv iujfdkv oifhdklsnv ikfvvikdvm </span>
                  </div>
              </div>
              <div className='comment'>
                  <img src={img_hero1}/>
                  <div className='commint_text'>
                    <p>sltan budhyn</p>
                    <span>dfskhfs dfujvj difuodvj ifusidjv iujfdkv oifhdklsnv ikfvvikdvm </span>
                  </div>
              </div>
              <div className='comment'>
                  <img src={img_hero1}/>
                  <div className='commint_text'>
                    <p>sltan budhyn</p>
                    <span>dfskhfs dfujvj difuodvj ifusidjv iujfdkv oifhdklsnv ikfvvikdvm </span>
                  </div>
              </div>
              <div className='comment'>
                  <img src={img_hero1}/>
                  <div className='commint_text'>
                    <p>sltan budhyn</p>
                    <span>dfskhfs dfujvj difuodvj ifusidjv iujfdkv oifhdklsnv ikfvvikdvm </span>
                  </div>
              </div>
              <div className='comment'>
                  <img src={img_hero1}/>
                  <div className='commint_text'>
                    <p>sltan budhyn</p>
                    <span>dfskhfs dfujvj difuodvj ifusidjv iujfdkv oifhdklsnv ikfvvikdvm </span>
                  </div>
              </div>
             

           </div>
          </div>
        </div>
        <div class="add">

          <h1>My advercompany</h1>

            {
                advercompany ? advercompany.map((adv)=>{
                    return(
                        <div class="adver" key={adv._id}>
                            <div class="company">
                                <img src={adv.Company ? `http://${adv.Company.logoImage}`: ""} alt="" />
                                <div class="name">
                                    <h1>{adv.Company ? adv.Company.name : null}</h1>
                                    <span>{adv.createdAt ? adv.createdAt : null}</span>
                                </div>
                            </div>
                            <div class="advercompany">
                                <div class="des">
                                    <h2>{adv.title ? adv.title : null}</h2>
                                    <p>
                                        {adv.description ? adv.description : null}
                                    </p>
                                </div>
                                <div class="imagescomapny">
                                    {adv.Image ? adv.Image.map((img , index)=>{
                                        return(
                                            <img key={index} src={`http://${img}`} alt="Advertisement" />
                                        )
                                    }) : null}
                                </div>
                                <div class="likes">
                                    <p><i class="fas fa-thumbs-up"></i>
                                    like</p>
                                    <span>Likes {adv.likes ? adv.likes.length : 0}</span>
                                </div>
                            </div>
                        </div>
                    )
                }) : null
            }

        </div>
      </div>
        : 
        <div>
          <h2 style={{textAlign: "center"}}>{companyNot}</h2>
        </div>
      }
      
      
    </div>
  )
}
