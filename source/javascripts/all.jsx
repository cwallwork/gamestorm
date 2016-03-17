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
            'apiKey': 'pub-un.gamestorm--OzEG9_jYxgytLt1wF85ciULS9pb4rHw2YSnL8Cxsrn7tk9eddOx2LJPi80SpoSaWtyZJOKbQc8UPN21vk2_hxw'
          }),
          signedUp: false,
          errors: "",
          windowMobile: window.matchMedia("(max-width: 1000px)"),
          mobile: window.matchMedia("(max-width: 1000px)").matches
        };
    }

    handleSignup(formData){
      let payload = {};
      payload.email = formData.email;
      formData.affiliation !== "" ? payload.tags = {affiliation: formData.affiliation} : null;
      let names = this.separateNames(formData.name);
      _.merge(payload,names);
      this.sendData(payload);
    }

    separateNames(name){
        var nameArr = name.split(" ");
        let givenName = nameArr[0];

        if (nameArr.length > 1) {
          var familyName = "";

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
      payload.tags = payload.tags || {};
      payload.tags.send_email = 0 ;

      this.state.groundwork.supporters.create(payload)
      .then(function(response){
        console.log(response);
        this.setState({signedUp: true});
        this.setState({errors: ""});
      }.bind(this))
      .catch(function(response){
        console.log(response);
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
        return <img className="cards_image" src="/images/gamestorm.gif"/>
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
                    <div className="text_content">
                      <div className="top_paragraph">
                        <img src="/images/gamestormlogo.png"/>
                        <h2>Solving the Refugee Crisis.</h2>
                        <h3>There&#39;s a game for that.</h3>
                        <p>
                          Complex problems require creative solutions. We are looking to tap minds from the technology, design, media and innovation sectors. 
                        </p>
                      </div>
                        <img className="cards_image" src="/images/gamestorm.gif"/>
                      <div className="bottom_paragraph">
                        <h3>Big imaginations wanted.</h3>
                        <p>
                          Let’s play a game and challenge other smart people to take on the global refugee crisis, too.
                        </p>
                        <p>
                          No experience working with refugees or humanitarian crises required.
                        </p>
                        <h2>You in?</h2>
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
            email: "",
            affiliation: ""
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
        email: this.state.email,
        affiliation: this.state.affiliation
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
                  <label>Affiliation</label>
                  <input type="text" value={this.state.affiliation} onChange={this.update.bind(this,"affiliation")}/>
                  <button onClick={(e) => {this.handleForm(e)}}>Submit</button>
                </form>
              </div>
              );
    }
}

export default Signup;


ReactDOM.render(<Gamestorm/>, document.getElementById('root'));