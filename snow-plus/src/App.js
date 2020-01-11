import React, { Component } from 'react';
import confirmationIcon from './images/ok.svg';
import './App.css';

class Submit extends Component {

  handleSubmit = () => {
    const xhr = new XMLHttpRequest();
    const url = 'http://dev.berminal.tech/snowplus/submit';
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        console.log(responseData);
        if (responseData.error && responseData.error.errCode !== 0) {
          alert(responseData.error.errMsg);
        } else {
          this.props.changeComponent({
            source: "Submit",
            emailAddress: document.getElementById("email").value,
          });
        }
      }
    };

    const data = JSON.stringify({
      'email': document.getElementById("email").value,
      'gender': document.getElementById("man").checked ? "M" : "F",
      'name': document.getElementById("name").value,
      'birthday': document.getElementById("date").value,
      'vendor_name': document.getElementById("vendor").value,
    });
    console.log(data);

    xhr.send(data);
  }

  render() {
    return (
      <div className="Submit">
        <p className="title">Special Gift for You!</p>
        <div className="content">
          <label>Name: </label>
          <input type="text" placeholder="Name" id="name" />
        </div>
        <div className="content">
          <label>Birthday: </label>
          <input type="date" placeholder="Date of Birth: MM/DD/YY" id="date" />
        </div>
        <div className="content">
          <label>Gender: </label>
          <label>male <input id="man" name="gender" type="radio" value="" /> </label>
          <label>female <input id="woman" name="gender" type="radio" value="" /> </label>
        </div>
        <div className="content">
          <label>Vendor: </label>
          <input type="text" id="vendor" placeholder="Vendor" />
        </div>
        <div className="content">
          <label>Email: </label>
          <input type="text" placeholder="Email Address" id="email" />
        </div>
        <div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Get Gift</button>
        </div>
      </div>
    )
  }
}

class Confirm extends Component {
  handleBack = () => {
    this.props.changeComponent({
      source: "Confirm",
    });
  }

  render() {
    return (
      <div className="Confirm">
        <img src={confirmationIcon} alt='confirmation' style={{ width: 50, height: 50 }}  />
        <h1>Thanks for submitting!</h1>
        <p>A confirmation email has been sent to:</p>
        <p>{this.props.emailAddress}</p>
        <p>Please follow the instruction in the email</p>
        <button type="submit" onClick={this.handleBack} className="btn btn-primary">Back to home</button>
      </div>
    )
  }
}

class App extends Component {
  state = {
    displaySubmit: true,
    emailAddress: "",
  };


  changeComponent = (action) => {
    if (action.source === 'Submit') {
      this.setState({
        displaySubmit: false,
        emailAddress: action.emailAddress,
       });
    } else if (action.source === 'Confirm') {
      this.setState({
        displaySubmit: true,
        emailAddress: "",
       });
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>SnowPlus Giveaway!</h1>
        </header>
        {
          this.state.displaySubmit ?
            <Submit changeComponent={action => this.changeComponent(action)} /> :
            <Confirm changeComponent={action => this.changeComponent(action)}
              emailAddress={this.state.emailAddress} />
        }
      </div>
    )
  }
}

export default App;
