import React                      from 'react';
import R                          from 'ramda';
import shuffle                    from 'lodash.shuffle';
import Challenge                  from './cards/challenge.jsx';
import Actors                     from './cards/actors.jsx';
import Tools                      from './cards/tools.jsx';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Game';
        this.actors = this.props.actors;
        this.tools = this.props.tools;

        this.challenges = this.props.challenges;
        this.newGame = this.newGame.bind(this);
        this.addCard = this.addCard.bind(this);

        this.mapWithIndex = R.addIndex(R.map);

        this.state = {
          currentGame: {
            challenge: [],
            tools: [],
            actors: [] 

          },
          gameInProgress: false,
          actorSelected: [],
          toolSelected: []
        }
    }

    get3Cards(cards){
      return shuffle(cards).slice(0,3);
    }

    get1Card(cards){
      return shuffle(cards)[0];
    }

    addCard(slotIdx, card, challenge) {
      if (challenge.challenge[slotIdx].type === card.type && !challenge.challenge[slotIdx].id){
        const setSlotFn = (element,index) => index == slotIdx ? card : element;
        let newChallenge = this.mapWithIndex(setSlotFn, challenge.challenge);
        return newChallenge;
      }
      else {
        return challenge;
      }
    }

    newGame() {
      let newActors = this.get3Cards(this.actors);
      let newTools =  this.get3Cards(this.tools);
      let newChallenge = makeChallenge(this.get1Card(this.challenges));

      let newGame = {
        challengeId: newChallenge.id,
        challenge: newChallenge.challenge,
        tools: newTools,
        actors: newActors
      };

      this.setState({
        currentGame: newGame,
        gameInProgress: true
      });
    }

    render() {
        let game = this.state.currentGame;

        const startButton = <button className="start_button" onClick={this.newGame}>START</button>

        return (
                <div>
                  <div className="challenge">
                  <h2>Challenge:</h2>
                    <Challenge card={game.challenge} />
                  </div>
                  <div className="actors">
                    <h4>Your Actor Cards</h4>
                    <Actors cards={game.actors}/>
                  </div>
                  <div className="tools">
                    <h4>Your Tool Cards</h4>
                    <Tools cards={game.tools}/>
                  </div>
                  {this.state.gameInProgress? null : startButton}
                </div>
                );
    }
}

export default Game;
