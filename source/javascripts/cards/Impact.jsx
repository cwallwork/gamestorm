import React from 'react';

class Impact extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Impact';
        this.update = this.update.bind(this);
    }

    update(event) {
      this.props.updateImpact(event.target.value, this.props.slotIndex);
    }

    render() {
        return (
          <div className="input_slot">
            <input type="text" onChange={(e)=> this.update(e)} value={this.props.impact}/><span>(Impact)</span>
          </div>
        )
    }
}

export default Impact;
