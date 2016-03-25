import React                      from 'react';
import R                          from 'ramda';

class Challenge extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Challenge';
    }
    render() {

        let challengeMap = (card) => card.map(makeChalEls);
        
        const makeChalEls = (element,index) => {
          if(typeof element === "string"){
            return element;
          }
          else {
            return (
                <span className="challenge_button" key={index}>({element.type})</span>
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
