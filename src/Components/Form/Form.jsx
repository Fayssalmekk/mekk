import React from "react";
import "./Form.css";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.Language = this.props.language;
    this.state = {
      err: "",
      name: "",
      email: "",
      phoneNumber: "",
      question: ""
    }
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePhoneNumber = this.changePhoneNumber.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeName(e){
    this.setState({
        name: e.target.value
    })
}
changeEmail(e){
    this.setState({
        email: e.target.value
    })
}
changePhoneNumber(e){
    this.setState({
        phoneNumber: e.target.value
    })
}
changeQuestion(e){
    this.setState({
        question: e.target.value
    })
}

onSubmit(e){
    e.preventDefault()

   var question={
        name: this.state.name,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        question: this.state.question,
    }
    axios.post('http://localhost:8080/api/question', question)
        .then(res =>
            this.setState({
                err: res.data
            })
            
        )

}

  render() {
    return (
      <div className="row">
        <div className="container mt-5 mb-5" id="feedback-form1">
          <h2 className="header">Still have a question ?</h2>
          <div>
            <form method="POST" onSubmit={this.onSubmit}>
            <input type="text" name="name" placeholder="Nom Complet"onChange={this.changeName} ></input>
              <input type="email" name="email" placeholder="Email" onChange={this.changeEmail}></input>
              <input type="text" name="phoneNumber" placeholder="Télé" onChange={this.changePhoneNumber}></input>
              <div> Votre question :</div>
              <input type="text" name="Question" placeholder="" className="textera" onChange={this.changeQuestion}></input>
              <button type="submit">Envoyer</button>
            </form>
            <p>{this.state.err} </p>
          </div>
        </div>
      </div>
    );
  }
  };

  export default Form;