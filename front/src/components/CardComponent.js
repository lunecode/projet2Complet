import React, { Component } from 'react';
import "./CardComponent.css";
import { Collapse } from 'react-collapse';
import Excuse from "./Excuse";
import DetailsAlert from "./DetailsAlert";
import CardCTA from './CardCTA'

class CardComponent extends Component {
  
  render() {

    const cardClasses = this.props.dataTitle + ' cardComponent';

    return (
      <div className={cardClasses}>

        <div className='headerCard' onClick={this.props.toToggle}>

          <img
            src={this.props.titleImage}
            alt="title img"
          />
          <h2>{this.props.dataTitle}</h2>

        </div>


        <Collapse isOpened={this.props.isOpen} className="collapse">

          <DetailsAlert
            picture={this.props.dataLogo}
            details={this.props.details}
            lastTime={this.props.dataLastTime}
            time={this.props.dataTime}
            issue={this.props.dataIssue}
          />

          <Excuse excuse={this.props.dataExcuse} />

          <div className="Card-CTA">
            <i
              className={"fas fa-chevron-left left-arrow"}
              onClick={this.props.toPrevious}
            />

            <CardCTA dataCopy={this.props.dataExcuse} />

            <i
              className={"fas fa-chevron-right right-arrow"}
              onClick={this.props.toNext}
            />

          </div>
        </Collapse>
      </div>

    )
  }
}

//     render () {
//     return (
    
//     <div className={this.state.comp}>
//           <div className="logoTitleContainer">
//             <img
//               src="https://www.retif.eu/media/image/400x/picto-028-pole-de-correspondance-ou-gare-routiere-pvc-fond-blanc-125x125mm_01.jpg"
//               alt="title img"
//             />
//             <h2>{this.props.dataTitle}</h2>
//           <i className={"fas fa-chevron-down down-arrow"} onClick={this.toToggle}/>
//           </div>
//           <Collapse isOpened={this.state.open} className="collapse">
//       <div className="CardWrapper">
//         <button className="back-btn" onClick={this.props.goBack}>
//           <i className="fas fa-arrow-left back-logo" />Retour
//         </button>
//         <div>
//           <DetailsAlert
//             picture={this.props.dataLogo}
//             details="Détails de l'incident"
//             lastTime={this.props.dataLastTime}
//             time={this.props.dataTime}
//             issue={this.props.dataIssue}
//           />
//           <Excuse excuse={this.props.dataExcuse} />
//           <div className="Card-CTA">
//             <i
//               className={"fas fa-chevron-left left-arrow"}
//               onClick={this.props.toPrevious}
//             />
//             <CardCTA dataCopy={this.props.dataExcuse} />
//             <i
//               className={"fas fa-chevron-right right-arrow"}
//               onClick={this.props.toNext}
//               />
//           </div>
//         </div>
        
//       </div>
//               </Collapse>
//               </div>
//     );
//     }
// }
export default CardComponent;