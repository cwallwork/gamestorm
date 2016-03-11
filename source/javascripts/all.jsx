import React from "react";
import ReactDOM from "react-dom";

class Boilerplate extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Boilerplate';
    }
    render() {
        return <div>Boilerplate</div>;
    }
}

ReactDOM.render(<Boilerplate/>, document.getElementById('root'));