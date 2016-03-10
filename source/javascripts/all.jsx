import React from "react";
import ReactDOM from "react-dom";

window.testColor = {};

window.testColor.setColor = function(){
  let color = querystring.parse().col;
  if(color === "r"){
    testColor.colName = "red";
    testColor.hex = "#dd2e2e";
  }
  else {
    testColor.colName = "green";
    testColor.hex = "#39bf28"
  }
}();

const Poll = React.createClass({
  getInitialState() {
    let color = this.setColor();
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
          },
          color: testColor
      };
  },

  setColor: function(){
   
  },

  nextQ: function(){
    let currQcount = this.state.currentQuestion;
    this.setState({
      currentQuestion: ++currQcount 
    });
  },

  handleAnswer: function(answer){
    let newAnswers = this.state.answers;
    newAnswers.push(answer);
    this.setState({
      answers: newAnswers
    });
    this.nextQ();
  },

  makeQuestion: function(){
    if(this.state.currentQuestion < this.state.questions.length){
      return <QuestionList handleAnswer={this.handleAnswer} question={this.state.questions[this.state.currentQuestion]} qNumber={this.state.currentQuestion +1} color={this.state.color.hex}/>
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
    data.tags.color = this.state.color.colName;
    this.state.gw.supporters.create(data)
    .then(function(response) {console.log(response)})
    .catch(function(response) {console.log(response)});
  },

  introText: function(){
    return(
      <div className="intro-text">
        <p>Together, we can make sure out values are heard loud and clear.</p>
        <p>Share your thoughts in our public opinion poll today.</p>
        <p>This is your chance to ensure your voice  is heard and send a clear message that refugees must continue to be supported around the world 
          as they flee unspeakable terrors.</p>
         <button className="intro-button" style={{background: this.state.color.hex}} onClick={this.nextQ}>
          Click here to complete the poll.
        </button>
      </div>
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
  getInitialState: function(){
    return {
      otherAnswer: ""
    }
  },

  otherChange: function(e){
    this.setState({otherAnswer: e.target.value});
  },

  handleAnswer: function(answer){
    this.props.handleAnswer(answer);
  },

  handleOther: function(event){
    this.handleAnswer(this.state.otherAnswer);
    this.setState({otherAnswer: ""});
  },

  render: function(){
    let question = this.props.question;
    let answers = this.props.question.answers;
    return(
      <div className="question-container">
        <div className="q-number" style={{borderLeft: "6px solid" + this.props.color}}>Q{this.props.qNumber + "."}</div><div className="question"><p>{question.q}</p>
          {
            answers.map(function(answer,index){
              if (answer !== "Other"){
                return <div key={index} className="answer-button" onClick={this.handleAnswer.bind(this, answer)}>{answer}</div>
              }
              else{
                return ( 
                  <div key={index} className="other-answer">{answer}
                    <input onChange={this.otherChange} value={this.state.otherAnswer}/>
                    <button onClick={this.handleOther} data-value={this.state.otherAnswer}>Submit</button>
                  </div>
                )
              }
            },this)
          }
        </div>
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
<div className="wrapper">
  <div className="poll">
    <div className="header" style={{background: testColor.hex}}>
      <span><h1>ACT NOW</h1><img className="arrowdown" src="/images/arrow.png"/></span><span><h1>SPEAK UP</h1><img className="arrowup" src="/images/arrow.png"/></span>
    </div>
    <Poll/>
  </div>
  <footer className="site-footer" style={{background: testColor.hex}} >Powered by <a href="http://unrefugees.org" target="_blank"><img src="/images/U4Ulogo.png"/></a></footer>
</div>
, document.getElementById('root')
);





