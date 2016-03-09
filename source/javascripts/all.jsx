import React from "react";
import ReactDOM from "react-dom";

const Poll = React.createClass({
  getInitialState() {
      return {
          questions: [

              { 
                id: 1,
                q: "Do you support the efforts of organizations like the UN Refugee Agency to serve people around the world who have been forced to flee their homes due to war, persecution and threats",
                answers:[ "Yes","No","I don't know"],
              },
              { 
                id: 2,
                q: "Do you support or oppose the following statement?  The United States government and businesses can do more to develop innovative ways of solving the refugee crisis?",
                answers:["Strongly oppose","Somewhat oppose","Neither support nor oppose","Somewhat support","Strongly support"]
              },
              {
                id: 3,
                q: "Do you support the following statement? The US can increase the amount of money budgeted to help refugees and communities in countries that are hosting a large number of refugees.",
                answers:["Strongly oppose","Somewhat oppose","Neither support nor oppose","Somewhat support","Strongly support"]
              },
              {
                id: 4,
                q: "What types of actions are you willing to take to help refugees around the world?",
                answers:["Advocacy", "Donate", "Attend an event", "Buy a product", "Other"],
              },
              { 
                id: 5,
                q: "What types of groups are you currently connected with in your community?",
                answers: ["Community group", "Religious group", "Recreational sports league", "Business/trade association", "Other"]
              }
            ],
          currentQuestion: -1,
          answers: [],
          gw: new Groundwork ({ 'api_url': 'https://api.thegroundwork.com',
            'oauth_client_id': 'pub-un-test.caeet--l5KRHVi1lzqT3mwtfOvRffZa28dKyOEzWFOc_c7NZJwDrOYT5n9lcMlG0.kg7QN9cpeKpe4x2ymN6M54AWLJbw'
          }),
          queries: querystring.parse() || {},
          supporterData: {
            source: "CAEET poll",
            tags: {
              "send_email": 0
            }
          }
      };
  },

  nextQ: function(){
    let currQcount = this.state.currentQuestion;
    this.setState({
      currentQuestion: ++currQcount 
    });
  },

  handleAnswer: function(index){
    let answer = this.state.questions[this.state.currentQuestion].answers[index];
    let newAnswers = this.state.answers;
    newAnswers.push(answer);
    this.setState({
      answers: newAnswers
    });
    this.nextQ();
  },

  makeQuestion: function(){
    if(this.state.currentQuestion < this.state.questions.length){
      return <QuestionList handleAnswer={this.handleAnswer} question={this.state.questions[this.state.currentQuestion]}/>
    }
    else {
      return this.endQuiz();
    }
  },

  endQuiz: function(){
      this.sendData();
      return <Thanks addZip={this.addZip} hasZip={this.haszip()} />
  },

  addZip: function(zip){
    let supDat = this.state.supporterData;
    supDat.postalCode = zip;
    this.setState({
      supporterData: supDat
    })
  },

  haszip: function(){
    return this.state.queries.haz ? true : false;
  },

  sendData: function(){
    let data = this.state.supporterData;
    this.state.queries.uid ? data.externalId = this.state.queries.uid : null;
    data.tags.answers = this.state.answers;
    this.state.gw.supporters.create(data)
    .then(function(response) {console.log(response)})
    .catch(function(response) {console.log(response)});
  },

  introText: function(){
    return(
       <p className="intro-text" onClick={this.nextQ}>
        How much do you know about the Refugee Crisis? Click to take the quiz.
      </p>
     )
  },

  render: function(){
    return(
      <div className="container">
        { this.state.currentQuestion === -1 ? this.introText() : this.makeQuestion()}
      </div>
      )
  }
})

const QuestionList = React.createClass({

  handleClick: function(index,event){
    this.props.handleAnswer(index);
  },

  render: function(){
    let question = this.props.question;
    let answers = this.props.question.answers;
    return(
      <div className="question">{question.q}
        {
          answers.map(function(answer,index){
          return <div key={index} className="answer-button" onClick={this.handleClick.bind(this, index)}>{answer}</div>
          },this)
        }
      </div>
    )
  }
})

const Thanks = React.createClass({
  getInitialState: function(){
    return {
      zip: "Enter Zip"
    }
  },

  addZip: function(zip){
    this.props.addZip(zip);
  },

  zipChange: function(event){
    this.setState({zip: event.target.value});
  },

  zipForm: function(){   
    return (
      <div className="zip-form">
        <p className="zip-ask">Enter your zip code to be kept up-to-date on poll results in your area</p>
        <input type="text" required maxLength="5" value={this.state.zip} onChange={this.zipChange}/>
        <button onClick={this.addZip.bind(this,this.state.zip)}>Submit</button>
      </div>
    )
  },

  render: function(){
    return (
      <div className="thanks">Thanks for taking the poll
        { this.props.hasZip !== true ? this.zipForm() : null }
      </div>
    )
  }
})

ReactDOM.render(
  <Poll/>, document.getElementById('root')
);