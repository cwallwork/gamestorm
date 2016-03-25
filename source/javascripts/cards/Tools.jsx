import React                      from 'react';
import R                          from 'ramda';

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Tools';
    }
    render() {
        const cardEl = R.map((card) => {
          return(
              <div key={card.id} class="tool_card">
                {card.tool}
              </div>
            )
        })

        return ( 
        <div className="tool_cards" onClick={this.handleCardClick}>
          {cardEl(this.props.cards)}
        </div>
        )
    }
}

export default Tools;
