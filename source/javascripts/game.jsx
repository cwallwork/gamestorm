import React                      from 'react';
import Update                     from 'react-addons-update';
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
        this.handleSlotClick = this.handleSlotClick.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
        this.updateImpact = this.updateImpact.bind(this);

        this.state = {
          currentGame: {
            challenge: [],
            tools: [],
            actors: [],
          },
          gameInProgress: false,
          cardSelected: {},
          slotSelected: null
        }
    }

    updateImpact(value, index){
      let newGame = R.clone(this.state.currentGame);
      newGame.challenge[index].value = value;
      this.setState({currentGame: newGame});
    }

    // Slice random cards at start of game
    get3Cards(cards){
      return shuffle(cards).slice(0,3);
    }

    get1Card(cards){
      return shuffle(cards)[0];
    }

    //Add selected card to selected slot
    addCard(slotIdx, card, challenge) {
      let newGame = R.clone(this.state.currentGame);

      if (challenge[slotIdx].type === card.type ) {
        
        const setSlotFn = (element,index) => index === slotIdx ? card : element;
        let newChallenge = this.mapWithIndex(setSlotFn, challenge);
        
        newGame = R.merge(newGame,this.returnUserCard(slotIdx, this.removeCardFromHand(card))); 
        newGame = R.mergeAll([newGame, {challenge: newChallenge}]);
      }
      return { currentGame: newGame };
    }

    //add and remove cards from selection
    selectCard(card) {
      return {cardSelected: card};
    }

    deselectCard() {
      return {cardSelected: {}};
    }

    //Select a slot in the challenge
    selectSlot(slotIdx) {
      if ( this.state.slotSelected !== slotIdx ){ return {slotSelected: slotIdx}};
    }

    //Deselect a slot in the challenge
    deselectSlot() {
      return { slotSelected: undefined };
    }
    


    //Remove a card from the hand when it is added to the challenge
    removeCardFromHand(cardToRemove) {
      const RejectById = R.reject((card) => card.id === cardToRemove.id);
      const handClone = R.clone(this.state.currentGame[cardToRemove.type + "s"]);

      const newHand = RejectById(handClone);
      const handName = (cardToRemove.type + "s");
         
      if (handName == "actors") {
        return {actors: newHand};
      }
      else if (handName == "tools") {
        return {tools: newHand};
      }
    }

    //Give the user back their card if it replaced by another card in the slot
    returnUserCard(slotIdx, hand) {
      const currentSlot = this.state.currentGame.challenge[slotIdx];
      
      if( hand.actors && currentSlot.id != undefined) {
        return {actors: R.append(currentSlot, hand.actors)};
      }
      else if( hand.tools && currentSlot.id != undefined) {
        return {tools: R.append(currentSlot, hand.tools)};
      }
      return hand;
    }


    makeChallenge(challenge) {
      return R.clone(challenge);
    }

    checkSelected(type) {
      if( (this.state.cardSelected.length !== 0) && (this.state.cardSelected.type === type)) {
        return this.state.cardSelected.id;
      }
    }

    //Handle user clicking on a slot in the challenge
    handleSlotClick(index) {
      const slot = this.state.slotSelected;
      const challenge = this.state.currentGame.challenge;
      
      let newState = R.clone(this.state);

      if (!R.isEmpty(this.state.cardSelected)){
        newState = R.merge(newState, this.addCard(index, this.state.cardSelected, challenge));
      }
      else if (index !== slot){
        newState = R.mergeAll([newState, this.deselectSlot(), this.selectSlot(index)]);
      }
      else {
        newState= R.merge(this.deselectSlot());
      }

      if(!R.equals(newState, this.state)){
        this.setState(newState);
      }
    }

    //Handle user clicking on an actor or tool card
    handleCardClick(card) {
      
      const selectedCard = !R.isEmpty(this.state.cardSelected) ? this.state.cardSelected : undefined; 
      const challenge = this.state.currentGame.challenge;
      let newState = R.clone(this.state);
      
      if(!R.isEmpty(this.state.slotSelected)){
        newState = R.merge(newState, this.addCard(this.state.slotSelected, card, challenge));
      }
      else if( (selectedCard) && (card.id == selectedCard.id) && (card.type == selectedCard.type) ) {
        newState = R.merge(newState, this.deselectCard());
      }
      else {
        newState = R.mergeAll([newState, this.deselectCard(), this.selectCard(card)]);
      }
      if(!R.equals(newState, this.state)) {
        this.setState(newState);
      }
    }

    //Start a new game
    newGame() {
      let newActors = R.map(R.assoc('type', 'actor'), this.get3Cards(this.actors));
      let newTools =  R.map(R.assoc('type', 'tool'), this.get3Cards(this.tools));
      let newChallenge = this.makeChallenge(this.get1Card(this.challenges));

      let newGame = {
        challengeId: newChallenge.id,
        challenge: newChallenge.challenge,
        tools: newTools,
        actors: newActors
      };

      this.setState({
        cardSelected: {},
        slotSelected: [],
        currentGame: newGame,
        gameInProgress: true
      });
    }

    render() {
        let game = this.state.currentGame;
        
        const startButton = <button className="start_button" onClick={this.newGame}>START</button>

        return (
                <div className="game_container">
                  <div className="challenge">
                  <h2>Challenge:</h2>
                    <Challenge handleSlotClick={this.handleSlotClick} slotSelected={this.state.slotSelected} updateImpact={this.updateImpact} card={game.challenge} />
                  </div>
                  <div className="cards">
                    <div className="actors">
                      <h4>Your Actor Cards</h4>
                      <Actors cardSelected={this.checkSelected("actor")} handleCard={this.handleCardClick} cards={game.actors}/>
                    </div>
                    <div className="tools">
                      <h4>Your Tool Cards</h4>
                      <Tools cardSelected={this.checkSelected("tool")} handleCard={this.handleCardClick} cards={game.tools}/>
                    </div>
                  </div>
                  {this.state.gameInProgress? null : startButton}
                </div>
                );
    }
}

export default Game;
