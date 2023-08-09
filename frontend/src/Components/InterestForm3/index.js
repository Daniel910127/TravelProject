import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from '../../contexts/SessionContext';
import './interest.css'

import {
  ParkOutlined,
  HikingOutlined,
  EmojiNatureOutlined,
  YardOutlined,
  ColorLensOutlined,
  MuseumOutlined,
  LandscapeOutlined,
  StorefrontOutlined,
  TempleBuddhistOutlined,
  Shop2Outlined,
  TempleHinduOutlined,
  FactoryOutlined,
  AttractionsOutlined,
} from "@mui/icons-material";

function Interest() {
  const { a_Id, m_Id, a_Account, a_Level, logout } = useSession();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    m_Id:'',
    si_pg: '',
    si_os: '',
    si_tp: '',
    si_ee: '',
    si_ff: '',
    si_la: '',
    si_le: '',
    si_ns: '',
    si_np: '',
    si_rt: '',
    si_se: '',
    si_ha: '',
    si_tf: ''
  });

  useEffect(() => {
    axios
      .post('http://127.0.0.1:8000/api/interest/', { m_Id })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
        setFormData({
            m_Id: response.data.m_Id,
            si_pg: response.data.si_pg,
            si_os: response.data.si_os,
            si_tp: response.data.si_tp,
            si_ee: response.data.si_ee,
            si_ff: response.data.si_ff,
            si_la: response.data.si_la,
            si_le: response.data.si_le,
            si_ns: response.data.si_ns,
            si_np: response.data.si_np,
            si_rt: response.data.si_rt,
            si_se: response.data.si_se,
            si_ha: response.data.si_ha,
            si_tf: response.data.si_tf,
        });
      })
      .catch(error => console.error(error));
  }, []);

  const handleInputChange = event => {
    setEditing(true)
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
      .post('http://127.0.0.1:8000/api/interest-update/', formData)
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => console.error(error));
      setEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="interest">
        <h1 >個人興趣</h1>
        <input
        name="m_Id"
        type="hidden"
        value={formData.m_Id}
                />
        <div className="personal-interest">
          <div>
                <div>
                  <ParkOutlined className="icon" />
                <label>公園綠地</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_pg"
                value={formData.si_pg}
                onChange={handleInputChange}
                
                />
            <span>{formData.si_pg}</span>
            </div>
            
          </div>
          <div>
                <div>
                  <HikingOutlined className="icon" />
                <label>戶外運動</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_os"
                value={formData.si_os}
                onChange={handleInputChange}
                />
            <span>{formData.si_os}</span>
            </div>
          </div>
          <div>
                <div>
                  <AttractionsOutlined className="icon" />
                <label>主題園區</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_tp"
                value={formData.si_tp}
                onChange={handleInputChange}
                />
            <span>{formData.si_tp}</span>
            </div>
          </div>
          <div>
                <div>
                  <EmojiNatureOutlined className="icon" />
                <label>生態教育</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_ee"
                value={formData.si_ee}
                onChange={handleInputChange}
                />
            <span>{formData.si_ee}</span>
            </div>
          </div>
          <div>
                <div>
                  <YardOutlined className="icon" />
                <label>休閒農漁</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_ff"
                value={formData.si_ff}
                onChange={handleInputChange}
                />
            <span>{formData.si_ff}</span>
            </div>
          </div>
          <div>
                <div>
                  <ColorLensOutlined className="icon" />
                <label>在地藝文</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_la"
                value={formData.si_la}
                onChange={handleInputChange}
                />
            <span>{formData.si_la}</span>
            </div>
          </div>
          <div>
                <div>
                  <MuseumOutlined className="icon" />
                <label>地方展館</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_le"
                value={formData.si_le}
                onChange={handleInputChange}
                />
            <span>{formData.si_le}</span>
            </div>
          </div>
          <div>
                <div>
                  <LandscapeOutlined className="icon" />
                <label>自然景觀</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_ns"
                value={formData.si_ns}
                onChange={handleInputChange}
                />
            <span>{formData.si_ns}</span>
            </div>
          </div>
          <div>
                <div>
                  <StorefrontOutlined className="icon" />
                <label>夜市夜遊</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_np"
                value={formData.si_np}
                onChange={handleInputChange}
                />
            <span>{formData.si_np}</span>
            </div>
          </div>
          <div>
                <div>
                  <TempleBuddhistOutlined className="icon" />
                <label>宗教廟宇</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_rt"
                value={formData.si_rt}
                onChange={handleInputChange}
                />
            <span>{formData.si_rt}</span>
            </div>
          </div>
          <div>
                <div>
                  <Shop2Outlined  className="icon" />
                <label>消費娛樂</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_se"
                value={formData.si_se}
                onChange={handleInputChange}
                />
            <span>{formData.si_se}</span>
            </div>
          </div>
          <div>
                <div>
                  <TempleHinduOutlined className="icon" />
                <label>歷史古蹟</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_ha"
                value={formData.si_ha}
                onChange={handleInputChange}
                />
            <span>{formData.si_ha}</span>
            </div>
          </div>
          <div>
                <div>
                  <FactoryOutlined className="icon" />
                <label>觀光工廠</label>
              <input
                type="range"
                min="0"
                max="10"
                name="si_tf"
                value={formData.si_tf}
                onChange={handleInputChange}
                />
            <span>{formData.si_tf}</span>
            </div>
          </div>
        <div className="button-container">
          {editing ? (
            <button className='button' type="submit">儲存</button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      </div>
    </form>
  );
}

export default Interest;
