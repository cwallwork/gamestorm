import React                      from 'react';
import R                          from 'ramda';

class Actors extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Actors';
    }

    handleCard(actorId) {
      const filterFn = (card) => card.id == actorId;
      const card = R.filter(filterFn, this.props.cards);
      this.props.handleCard(card[0]);
    }

    render() {
        const cardEl = R.map((card) => {
          return(
              <div key={card.id} className="actor_card" onClick={(e) => this.handleCard(card.id)}>
                {card.text}
              </div>
            )
        })

        return ( 
        <div className="actor_cards">
          {cardEl(this.props.cards)}
        </div>
        )
    }
}

export default Actors;
