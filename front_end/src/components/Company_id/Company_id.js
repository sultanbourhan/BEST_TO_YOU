import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import StarRating from "../StarRating/StarRating";
import "./Company_id.css";

import Loading from "../Loading/Loading";

import img_hero1 from "../../image/hero1.jpg";

import { useCookies } from "react-cookie";

export default function Company_id() {
  const { id } = useParams();

  // حالات الـ state للمعلومات
  const [company, setCompany] = useState(null); // قيم مبدئية لـ company كـ null
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // تحميل البيانات من الخادم
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companyResponse = await Axios.get(
          `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_id/${id}`
        );
        setCompany(companyResponse.data.data);
        console.log(companyResponse.data.data);

        const adsResponse = await Axios.get(
          `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_all_company_advertisements_id/${id}`
        );
        setAdvertisements(adsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // اعادة تحميل البيانات عند تغيير id

  // معالجة حدث النقر على التقييم
  const handleClick = (value) => {
    setRating(value);
  };

  // معالجة حدث التفاعل مع النجوم
  const handleMouseEnter = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  // ===============================================================

  const [cookies] = useCookies(["token"]);
  const [comments, setcomments] = useState("");
  const [commentserr, setcommentserr] = useState("");

  const create_comment = (id) => {
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/create_company_comments/${id}`,
      {
        comment : comments
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => {
        if(error.response.data.message){
          setcommentserr(error.response.data.message)
        }

        if(error.response.data.errors){
          setcommentserr(error.response.data.errors[0].msg)
          // error.response.data.errors[0]
        }
      });
  };

  // -----------------------------------------------------------

  // التحقق من حالة تحميل البيانات
  if (loading) {
    return <Loading />; // عرض شاشة التحميل
  }

  return (
    <div className="company">
      <div className="container">
        <div className="profilcom">
          <div className="test">
            <div className="info">
              <div className="infosection">
                <h1>{company ? company.name : "No Company Name"}</h1>
                <h2>Information:</h2>
                <ul>
                  <li>Email : {company ? company.email : "N/A"}</li>
                  <li>Phone : {company ? company.phone : "N/A"}</li>
                  <li>Country : {company ? company.Country : "N/A"}</li>
                  <li>City : {company ? company.city : "N/A"}</li>
                  <li>Street : {company ? company.street : "N/A"}</li>
                  <li>
                    Ratings Quantity : {company ? company.ratingsQuantity : "0"}
                  </li>
                  <li>Category : Damascus</li>
                  {/* <li>Subscription Type : {company ? company.type : "N/A"}</li> */}
                  <li>
                    Time Type : {company ? company.subscription?.type : "N/A"}
                  </li>
                </ul>
              </div>
              <div className="icon">
                <div className="stars">
                  <StarRating rating={company ? company.ratingsAverage : 0} />
                </div>
                <div className="media">
                  <a href={company ? company.facebook : ""}>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                  </a>
                  <a href={company ? company.linkedIn : ""}>
                    <FontAwesomeIcon className="faLinkedin" icon={faLinkedin} />
                  </a>
                  <a href={company ? company.instagram : ""}>
                    <FontAwesomeIcon
                      className="faInstagram"
                      icon={faInstagram}
                    />
                  </a>
                </div>
              </div>
            </div>
            <img
              src={
                company && company.companyImage
                  ? `http://${company.companyImage}`
                  : "defaultImage.jpg"
              }
              alt="Company Image"
            />
            <img
              className="img_lo"
              src={
                company && company.logoImage
                  ? `http://${company.logoImage}`
                  : "defaultLogo.jpg"
              }
              alt="Company Logo"
            />
          </div>
        </div>

        <div className="dec_com">
          <div class="dec">
            <h1>Description:</h1>
            <p>{company ? company.description : "No Description Available"}</p>
          </div>
          <div class="dec">
            <StarRating rating={4} />
            <div className="scrol">
              {
                company? company.comments.map((comm)=>{
                  return(
                    <div className="comment">
                      <img src={comm.user_comment ? `http://${comm.user_comment.profilImage}` : ""} />
                      <div className="commint_text">
                        <p>{comm.user_comment ? comm.user_comment.name : null}</p>
                        <span>
                          {comm.comment ? comm.comment : null}
                        </span>
                      </div>
                    </div>
                  )
                }) : null
              }
              
            </div>
            <div className="create_comment">
              <img src={img_hero1} />
              <input
                type="text"
                placeholder="Write a comment"
                value={comments}
                onChange={(e) => setcomments(e.target.value)}
              />
              <FontAwesomeIcon
                onClick={(id)=> create_comment(company._id)}
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  right: "30px",
                  top: "30px",
                  cursor: "pointer",
                }}
                icon={faPaperPlane}
              />
              <p>{commentserr}</p>
            </div>
          </div>
        </div>

        <div className="add">
          {advertisements.map((adv, index) => (
            <div key={index} className="adver">
              <div className="company">
                <img
                  src={
                    company ? `http://${company.logoImage}` : "defaultLogo.jpg"
                  }
                  alt="Company Logo"
                />
                <div className="name">
                  <h1>{company ? company.name : "No Company Name"}</h1>
                  <span>{adv.createdAt ? adv.createdAt : "No Date"}</span>
                </div>
              </div>
              <div className="advercompany">
                <div className="des">
                  <h2>{adv.title ? adv.title : "No Title"}</h2>
                  <p>{adv.description ? adv.description : "No Description"}</p>
                </div>
                <div className="imagescomapny">
                  {adv.Image && adv.Image.length > 0 ? (
                    adv.Image.map((img, index) => (
                      <img
                        key={index}
                        src={`http://${img}`}
                        alt="Advertisement"
                      />
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="likes">
                  <p>
                    <i className="fas fa-thumbs-up"></i> Like
                  </p>
                  <span>Likes {adv.likes ? adv.likes.length : 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
