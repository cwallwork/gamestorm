import React                      from 'react';
import ReactDOM                   from 'react-dom';
import R                          from 'ramda';
import Game                       from './game.jsx';


class Gamestorm extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Gamestorm';
        this.tools = require('tools.json').tools;
        this.actors = require('actors.json').actors;
        this.challenges = require('challenges.js').challenges;
        this.state = {
          tools: this.tools,
          actors: this.actors,
          challenges: this.challenges 
        }
    }
    render() {
        const mapWithIndex = R.addIndex(R.map);
        const toolsEl = mapWithIndex((tool,index) => { return <div key={index}>{tool}</div>});
        
        return (
                  <div>
                    <Game tools={this.state.tools} actors={this.state.actors} challenges={this.state.challenges}/>
                  </div>
                )
    }
}

export default Gamestorm;



ReactDOM.render(<Gamestorm/>, document.getElementById('root'));