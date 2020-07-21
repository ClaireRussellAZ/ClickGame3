import React, { Component } from "react";
import cards from "./cards.json";
import Card from "./components/Card";
import Score from "./components/Score";


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    cards,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    clickedanimals: [],
  };

  clickedImage = (id) => {
    let clickedanimals = this.state.clickedanimals;
    let score = this.state.score;
    let topScore = this.state.topScore;
    this.setState({
      showAlert: 0,
    });

    if (clickedanimals.indexOf(id) === -1) {
      clickedanimals.push(id);
      console.log(clickedanimals);
      //run the score function
      this.handleIncrement();
      //reshuffle function after each click
      this.makeShuffle();
    } else if (this.state.score === 12) {
      
      this.setState({
        showSuccess: 1,
        score: 0,
        clickedanimals: [],
      });
    } else {
      
      this.setState({
        score: 0,
        clickedanimals: [],
      });
      console.log("Duplicate");
      this.setState({
        showAlert: 1,
      });
    }
    if (score > topScore) {
      this.setState({
        topScore: score,
      });
    }
  };
  
  handleIncrement = () => {
    this.setState({ score: this.state.score + 1 });
  };

  //images
  makeShuffle = () => {
    this.setState({ roses: shuffle(cards) });
  };

  //time
  render() {
    return (
      <div className="container">
        <Score
          title="Pet the Animals"
          score={this.state.score}
          topScore={this.state.topScore}
        />

        <div className="row">
          {this.state.cards.map((cards) => (
            <Card
              key={cards.id}
              id={cards.id}
              variety={cards.variety}
              img={cards.image}
              clickedImage={this.clickedImage}
            />
          ))}

          <div
            className="alert alert-dark"
            style={{ opacity: this.state.showAlert }}
          >
            Animal has been pet.
          </div>
          <div
            className="alert alert-success"
            style={{ opacity: this.state.showSuccess }}
          >
            YAY!.
          </div>
        </div>
      </div>
    );
  }
}
export default App;
