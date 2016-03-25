import React                      from 'react';
import R                          from 'ramda';

class Actors extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Actors';
    }
    render() {
        const cardEl = R.map((card) => {
          return(
              <div key={card.id} className="actor_card">
                {card.actor}
              </div>
            )
        })

        return ( 
        <div className="actor_cards" onClick={this.handleCardClick}>
          {cardEl(this.props.cards)}
        </div>
        )
    }
}

export default Actors;
