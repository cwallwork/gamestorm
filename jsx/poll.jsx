'use-strict'

var Poll = React.createClass({
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
          currentQuestion: 0
      };
  },

  update: function(){
    setState(function(previousState){
      currentQuestion: previousState.currentQuestion + 1
    });
  },

  makeQuestion: function(){
    console.log('making question');
  },

  introText: function(){
    return(
       <p className="intro-text" onClick={this.update.bind(this)}>
        How much do you know about the Refugee Crisis? Click to take the quiz.
      </p>
     )
  },

  render: function(){
    return(
      <div className="container">
        { this.state.currentQuestion === 0 ? introText() : makeQuestion()}
      </div>
      )
  }
})

ReactDOM.render(
  <Poll/>, document.getElementById('wrapper')
);