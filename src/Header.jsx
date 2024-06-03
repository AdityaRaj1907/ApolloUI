// Header.js
import React from 'react';
import './Header.css'; // Import Header CSS file
import Cerebriuimages from './images/thumbnail_CerebriuNameIcon-84x84px.png'; // Import Cerebriu logo image
import Cerebriulogo from './images/thumbnail_CerebriuIcon-84x84px.png'

function Header() {
  return (
    <header className='apollo-header'>
      <table className="header-table">
        <tbody>
          <tr>
            <td style={{width:"33vw"}} className="apollo-admin">
              <a>Apollo Admin</a>
            </td>
            <td style={{width:"33vw"}}  className="logo-container">
            <span style={{display:'flex', flexDirection:'column', alignItems:"center"}}>
              
              <img src={Cerebriuimages} alt="Cerebriu Logo" className="cerebriu-logoname" />
              <p className="contact-info">For Cerebriu personnel, if in doubt please contact Cerebriu</p>
              </span>
            </td>
            <td style={{width:"33vw"}} ></td>
          </tr>
        </tbody>
      </table>
    </header>
  );
}

export default Header;
