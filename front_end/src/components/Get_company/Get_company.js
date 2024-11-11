import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "./Get_company.css";
import StarRating from '../StarRating/StarRating';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from '../Loading/Loading';

export default function Get_company() {
  const [company, setcompany] = useState([]);
  const [id_company, setid_company] = useState();
  const [cookies] = useCookies(['token']);
  const delete_but = useRef(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setloading] = useState(true);

  console.log(process.env.REACT_APP_BASE_URL);
  const Navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company`)
      .then(res => {
        setcompany(res.data.data);
        console.log(res.data.data);
        setloading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const delete_company = () => {
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/delete_company_id/${id_company}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setDeleteVisible(false);
        setcompany(prevCompanies => prevCompanies.filter(company => company._id !== id_company)); // تحديث الحالة
      })
      .catch(error => {
        console.error('Error deleting data', error);
      });
  };

  const open_delete = (id) => {
    setDeleteVisible(true);
    setid_company(id);
  };

  const clos_delete = () => {
    setDeleteVisible(false);
  };

  if(loading){
    return (
      <Loading/>
    )
  }

  return (
    <div className='Get_company'>
      <h2>Companies List</h2>

      <div className='delete' ref={delete_but} style={{ display: deleteVisible ? 'flex' : 'none' }}>
        <div className='del'>
          <p>Do you really want to delete this company?</p>
          <div className='but_del'>
            <button onClick={delete_company}>Delete</button>
            <button onClick={clos_delete}>Cancel</button>
          </div>
        </div>
      </div>

      {company.map((com) => (
        <div className='Get_company_cart' key={com._id}>
          <div className='user_company'>
            <img src={`http://${com.user?.profilImage || ''}`} alt=""/>
            <span>
              <p>{com.user?.name || 'Unknown'}</p>
              <p>{com.user?.email || 'Unknown'}</p>
            </span>
          </div>
          <div className='img_company'>
            <img src={`http://${com.logoImage || ''}`} alt="Company Logo"/>
            <img src={`http://${com.companyImage || ''}`} alt="Company"/>
          </div>
          <div className='text_company'>
            <h2>{com.name || 'Unnamed Company'}</h2>
            <p>{com.description || 'No description available'}</p>
            <p>Phone : <span>{com.phone || 'N/A'}</span></p>
            <p>Ratings Quantity : <span>{com.ratingsQuantity || 'N/A'}</span></p>
            <p>Categorey : <span>{com.categorey?.name || 'No category'}</span></p>
            <StarRating rating={com.ratingsAverage || 0} />
          </div>
          <div className='icon_company'>
            <FontAwesomeIcon onClick={() => Navigate(`/admin/update_company/${com._id}`)} icon={faPenToSquare} />
            <FontAwesomeIcon onClick={() => open_delete(com._id)} icon={faTrashCan} />
          </div>
          <div className='type'>
            <p>Type : {com.type}</p>
            <h3>Subscription</h3>
            <p>Type : {com.subscription.type}</p>
            <p>Start Date : {com.subscription.startDate}</p>
            <p>End Date : {com.subscription.endDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
