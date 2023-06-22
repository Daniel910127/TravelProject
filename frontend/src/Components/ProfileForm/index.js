import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; 
import { useSession } from '../../contexts/SessionContext';

function Profile() {
  const { a_Id, m_Id, a_Account, a_Level, logout } = useSession();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    m_Id: '',
    m_Name: '',
    m_Gender: '',
    m_Email: '',
    m_Phone: ''
  });

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/api/member/', { m_Id })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
        setFormData({
          m_Id: response.data.m_Id,
          m_Name: response.data.m_Name,
          m_Gender: response.data.m_Gender,
          m_Email: response.data.m_Email,
          m_Phone: response.data.m_Phone
        });
      })
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
// const handleEmailChange = event => {
//     setFormData({
//       ...formData,
//       m_Email: event.target.value
//     });
//   };
  
  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/api/member-update/', formData)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => console.error(error));
      setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile">
        <h1>個人檔案</h1>
        <div className="personal-info">
          <div>
            <label>會員編號:</label>
            {editing ? (
              <span>{formData.m_Id}</span>
            ) : (
              <span>{user && m_Id}</span>
            )}
          </div>
          <div>
            <label>會員帳號:</label>
            <span>{a_Account}</span>
          </div>
          <div>
            <label>會員姓名:</label>
            {editing ? (
              <input
                type="text"
                name="m_Name"
                value={formData.m_Name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user && user.m_Name}</span>
            )}
          </div>
          <div>
            <label>會員性別:</label>
            {editing ? (
              <input
                type="text"
                name="m_Gender"
                value={formData.m_Gender}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user && user.m_Gender}</span>
            )}
          </div>
          <div>
            <label>會員信箱:</label>
            {editing ? (
              <input
                type="text"
                name="m_Email"
                value={formData.m_Email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user && user.m_Email}</span>
            )}
          </div>
          <div>
            <label>會員電話:</label>
            {editing ? (
              <input
                type="text"
                name="m_Phone"
                value={formData.m_Phone}
                onChange={handleInputChange}
              />
            ) : (
              <span>{user && user.m_Phone}</span>
            )}
          </div>
        </div>
        <div className="button-container">
          {editing ? (
            <button className='button' type="submit">儲存</button>
          ) : (
            <label className='button' onClick={() => setEditing(!editing)}>編輯</label>
          )}
        </div>
      </div>
    </form>
  );
}

export default Profile;
