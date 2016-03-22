import React                      from 'react';
import ReactDOM                   from 'react-dom';
import R                          from "ramda";


class Gamestorm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Gamestorm';
        this.state = {
          
        }
    }
    render() {
        return <div>Gamestorm</div>;
    }
}

export default Gamestorm;



ReactDOM.render(<Gamestorm/>, document.getElementById('root'));