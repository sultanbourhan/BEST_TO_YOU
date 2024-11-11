import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
import Axios from "axios";
import "./Get_user.css";

export default function Get_user() {
  const [user, setuser] = useState([]);
  const [cookies] = useCookies(['token']);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [user_searsh, setuser_searsh] = useState("");

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user?name=${user_searsh}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setuser(res.data.data);
        console.log(res.data.data)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [user_searsh]);

  const deleteUser = () => {
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user/${idToDelete}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setuser(prevUsers => prevUsers.filter(u => u._id !== idToDelete));
        setDeleteVisible(false);
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  const openDeleteModal = (id) => {
    setIdToDelete(id);
    setDeleteVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteVisible(false);
  };

  return (
    <div className='Get_user'>
      <div className='h2_s'>
        <h2>Users list</h2>
        <div className="coolinput">
          <label htmlFor="input" className="text">Search:</label>
          <input type="text" onChange={(e)=>setuser_searsh(e.target.value)} placeholder="Search" className="input" />
        </div>
      </div>

      <div className='all_user'>
        {user.map((u) => (
          <div className='user1' key={u._id}>
            <div><img src={`http://${u.profilImage}`} alt="User" /></div>
            <p>{u.name}</p>
            <p>{u.email}</p>
            <p>{u.phone}</p>
            <p>{u.role}</p>
            <p>
              <FontAwesomeIcon 
                icon={faTrashCan} 
                onClick={() => openDeleteModal(u._id)} 
              />
            </p>
          </div>
        ))}
      </div>

      {deleteVisible && (
        <div className='delete' style={{ display: 'flex' }}>
          <div className='del'>
            <p>Do you really want to delete this company?</p>
            <div className='but_del'>
              <button onClick={deleteUser}>Delete</button>
              <button onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
