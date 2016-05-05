import React                      from 'react';
import R                          from 'ramda';

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Tools';
    }

    handleCard(toolId) {
      const filterFn = (card) => card.id == toolId;
      const card = R.filter(filterFn, this.props.cards);
      this.props.handleCard(card[0]);
    }

    render() {
        const cardEl = R.map((card) => {
          return(
              <div key={card.id} className="tool_card" onClick={(e) => this.handleCard(card.id)}>
                {card.text}
              </div>
            )
        })

        return ( 
        <div className="tool_cards">
          {cardEl(this.props.cards)}
        </div>
        )
    }
}

export default Tools;