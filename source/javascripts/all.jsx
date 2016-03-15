import React                      from 'react';
import ReactDOM                   from 'react-dom';
import _                          from 'lodash';

class Gamestorm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSignup = this.handleSignup.bind(this);
        this.sendData = this.sendData.bind(this);
        this.displayName = 'Gamestorm';
        this.handleResize = this.handleResize.bind(this);
        this.state = {
          groundwork: new Groundwork ({ 'apiUrl': 'https://api.thegroundwork.com',
            'apiKey': 'pub-un-test.gamestorm--QJiwH1dUrmw1pKSLU4OQXWOZkHmwsDCcbGMc0lDMGqr8Zxm6FBKqZDRKnQL3fsc2dJQHxheTxt7_.mC1nCc8Tg'
          }),
          signedUp: false,
          errors: "",
          windowMobile: window.matchMedia("(max-width: 1500px)"),
          mobile: window.matchMedia("(max-width: 1500px)").matches
        };
    }

    handleSignup(formData){
      let payload = {};
      payload.email = formData.email;
      let names = this.separateNames(formData.name);
      _.merge(payload,names);
      this.sendData(payload);
    }

    separateNames(name){
        let nameArr = name.split(" ");
        let givenName = nameArr[0];

        if (nameArr.length > 1) {
          let familyName = "";

          for (let i = 1; i< nameArr.length; i++) {
            familyName = familyName + " " + nameArr[i];
          }
        }

        let names = {givenName: givenName};
          (typeof familyName !== 'undefined' && familyName !== null) ? names.familyName = familyName : null;
        return names;
    }

    sendData(payload){
      payload.source = "Gamestorm signup";
      payload.tags = { "send_email": 0 };

      this.state.groundwork.supporters.create(payload)
      .then(function(response){
        this.setState({signedUp: true});
        this.setState({errors: ""});
      }.bind(this))
      .catch(function(response){
        this.setState({errors: response.data.error.msg[0]})
      }.bind(this));
    }

   

    signUp(){
      return this.state.signedUp ? this.thanks() : this.signupForm();
    }

    errors(){
      if (this.state.errors){
        return <div className="error-mesage">{this.state.errors}</div>
      }
    }

    signupForm(){
      let errors = this.errors();
      return (
        <div className="signup-wrapper">
          {errors}
          <Signup submitForm={this.handleSignup}/>
        </div>
      )
    }

    thanks(){
      return <div>Thanks!</div>
    }

    getPic(size){
      if( (size === "small" && this.state.mobile === true) || (size === "large" && this.state.mobile === false)){
        return <img className="cards_image" src="/images/cards.png"/>
      }
    }

    handleResize(e){
      this.state.windowMobile.matches ? this.setState({mobile: true}) : this.setState({mobile: false});
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }

    render() {
      let signup = this.signUp();
      let picLeft = this.getPic("large");
      let picCenter = this.getPic("small");
        return (  
                  <div className="content">
                    {picLeft}
                    <div className="text_content">
                      <div className="top_paragraph">
                        <img src="/images/gamestormlogo.png"/>
                        <p>
                          We are looking for the smartest minds in technology, design, innovation, and media to host and ask others to participate in a GameStorm (that’s a game plus a brainstorm).
                        </p>
                      </div>
                        {picCenter}
                      <div className="bottom_paragraph">
                        <p>
                          Warning: This is not your average NGO or philanthropy brainstorm. This is a “game” plus “brainstorm” that challenges big imaginations, those with human-centered design experience, a hacker mentality and/or any other sort of skill or passion towards designing solutions to complex challenges to take on the global refugee crisis.
                        </p>
                        <p>
                          If this is up your alley and you would like the online version of the GameStorm when ready, leave your details below. 
                        </p>
                      </div>
                        {signup}
                    </div>
                  </div>
                );
    }
}

export default Gamestorm

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Signup';
        this.state = {
            name: "",
            email: ""
        }
    }

    update(field,e){
      let state = {};
      state[field] = e.target.value;
      this.setState(state);
    }

    handleForm(event){
      event.preventDefault();
      let formData = {
        name: this.state.name,
        email: this.state.email
      }
      this.props.submitForm(formData);
    }


    render() {
        return( 
              <div className="signup-form">
                <form>
                  <label>Email<span style={{color: "red"}}>*</span></label>
                  <input type="email" required value={this.state.email} onChange={this.update.bind(this,"email")}/>
                  <label>Name<span style={{color: "red"}}>*</span></label>
                  <input type="text" required value={this.state.name} onChange={this.update.bind(this,"name")}/>
                  <button onClick={(e) => {this.handleForm(e)}}>Submit</button>
                </form>
              </div>
              );
    }
}

export default Signup;


ReactDOM.render(<Gamestorm/>, document.getElementById('root'));