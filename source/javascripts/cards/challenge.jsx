import React                      from 'react';
import R                          from 'ramda';
import Impact                     from './Impact.jsx';

class Challenge extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Challenge';
        this.updateImpact = this.updateImpact.bind(this);
    }

    checkSelected(index) {
      return this.props.slotSelected === index ? "challenge_button selected" : "challenge_button";
    }

    handleSlotClick(index) {
      this.props.handleSlotClick(index);
    }

    updateImpact(value, index){
      this.props.updateImpact(value, index);
    }

    render() {

        let challengeMap = (card) => card.map(makeChalEls);
        
        const makeChalEls = (element,index) => {
          if(typeof element === "string"){
            return element;
          }
          else if (element.type === 'impact'){
            return <Impact key={index} updateImpact={this.updateImpact} slotIndex={index} impact={element.value} card={element}/>
          }
          else {
            return (
                <span cardId={element.id} className={this.checkSelected(index)} onClick={(e) => this.handleSlotClick(index)} key={index}>{element.text}({element.type})</span>
              )
          }
        }

        return (
              <div>
                {challengeMap(this.props.card)}
              </div>
              )
    }
}

export default Challenge;
