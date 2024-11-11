import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Axios from "axios"
import StarRating from '../StarRating/StarRating'
import "./Companys.css"
import img_hero1 from "../../image/hero1.jpg"; // صورة افتراضية إذا لم تكن موجودة

import { useNavigate } from "react-router-dom";

import Loading from '../Loading/Loading';

export default function Companys() {
  const [company, setCompany] = useState([])

  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {

    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company`)
      .then(res => {
        setCompany(res.data.data);
        console.log(res.data.data)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [])


   // التحقق من حالة تحميل البيانات
   if (loading) {
    return <Loading/>; // عرض شاشة التحميل
  }

  return (
    <div className='companys' >

      <div className='cardss'>
        {
          company.length > 0 ? company.map((comp) => {
            // حماية ضد القيم الفارغة أو غير الصحيحة
            const logoImage = comp.logoImage ? `http://${comp.logoImage}` : img_hero1; // صورة افتراضية إذا كانت الصورة فارغة
            const companyImage = comp.companyImage ? `http://${comp.companyImage}` : img_hero1; // صورة افتراضية للشركة
            const categoryName = comp.categorey ? comp.categorey.name : "Unknown"; // إذا كانت الفئة فارغة
            const country = comp.Country || "Not Provided"; // إذا كان البلد غير موجود
            const city = comp.city || "Not Provided"; // إذا كانت المدينة غير موجودة
            const street = comp.street || "Not Provided"; // إذا كان الشارع غير موجود

            return (
              <div className="card" key={comp._id}>
                <div className='img'>
                  <img src={logoImage} alt={comp.name || 'Company Logo'} />
                </div>
                <div className="top-section" style={{ backgroundImage: `url(${companyImage})`, backgroundSize: "cover" }}>
                  <div className="border"></div>
                  <div className="icons">
                    <div className="logo">
                      B<span>2</span>U
                    </div>
                    <div className="social-media">
                      <FontAwesomeIcon className='i' icon={faFacebook} />
                      <FontAwesomeIcon className='i' icon={faLinkedin} />
                      <FontAwesomeIcon className='i' icon={faInstagram} />
                    </div>
                  </div>
                </div>
                <div className="bottom-section">
                  <span className="title">{comp.name}</span>
                  <StarRating rating={3} />
                  <p><span>Categorey : </span>{categoryName}</p>
                  <p><span>phone : </span>{comp.phone}</p>
                  <div className='address'>
                    <h3>Address</h3>
                    <p><span>Country : </span>{country}</p>
                    <p><span>city : </span>{city}</p>
                    <p><span>street : </span>{street}</p>
                  </div>
                  <button onClick={()=> Navigate(`/company_id/${comp._id}`)}>Visit Us</button>
                </div>
              </div>
            )
          }) : (
            <h1 >There are no companies currently.</h1> // رسالة في حالة عدم وجود بيانات
          )
        }
      </div>
    </div>
  )
}
