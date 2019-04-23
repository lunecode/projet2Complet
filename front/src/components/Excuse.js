import React from 'react'
import "./Excuse.css"


const Excuse = ({excuse}) => {
 return (
 <div className="frame">
 <div >"{excuse}"</div>
 <div className="copybutton">Copy</div>
 </div>
 )
 }

 export default Excuse