import React from 'react'
import './Radiov2.css'

const Radio = ({func}) => {
    return(
        <div className="normal-container">
            <div className="smile-rating-container">
                <div className="smile-rating-toggle-container">
                    <form className="submit-rating">
                        <input id="transport"  name="satisfaction" type="radio" onChange={func}/> 
                        <input id="funny" name="satisfaction" type="radio" onChange={func} /> 
                        <label htmlFor="transport" className="rating-label rating-label-transport">Sérieux</label>
                        <div className="smile-rating-toggle"></div>

                        <div className="rating-eye rating-eye-left"></div>
                        <div className="rating-eye rating-eye-right"></div>

                        <div className="mouth rating-eye-bad-mouth"></div>

                        <div className="toggle-rating-pill"></div>
                        <label htmlFor="funny" className="rating-label rating-label-funny">Insolite</label>
                    </form>
                </div>
            </div>
        </div>



    )
}



export default Radio