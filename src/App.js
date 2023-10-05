import React, { Component } from 'react'
import './App.css'
import KeyPad from './KeyPad'
import Animate from './Animate'

// Initialise state
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialled: '',
      correctNum: false,
      onCall: false,
    }
  }

  // Limit screen display to 65 characters
  // White space fills the screen while empty
  getMaxDisplay = () => {
    const fullDisplay = this.state.dialled +
    "                                                                 ";
    return fullDisplay.slice(0, 65)
  }

  // Retrieve audio elements from DOM
  getCall69 = () => {
    return document.getElementById("call-69")
  }
  getWrongNum = () => {
    return document.getElementById("wrong-num")
  }

  // Update dialled state with buttons which have been clicked
  handleClick = event => {
		const {value} = event.target;
    const liveDial = this.state.dialled;
    this.setState(() => ({
      dialled: liveDial + value,
    }))
	}

  // Called when phone button is clicked
  handleCall = () => {
    // Update onCall state to indicate call is in progress
    this.setState(() => ({
      onCall: true
    }));
    // Check dialled number matches correct numbers
    if ((this.state.dialled === "101") ||
        (this.state.dialled === "5042336371") ||
        (this.state.dialled === "+15042336371") ||
        (this.state.dialled === "07401201351") ||
        (this.state.dialled === "+447401201351")) {
      // Play audio message if number is correct
      this.setState(() => ({
        correctNum: true,
        dialled: "ON CALL..."
      }))
      this.getCall69().play();
      this.animate();
    } else {
      // Play audio error if number is incorrect
      this.getWrongNum().play();
      this.setState(() => ({
        dialled: "WRONG NUMBER..."
      }))
    }
  }

  // ASCII animation runs when call 69 is played
  animate = Animate

  // Called when cancel button is clicked or audio ends
  clearDial = () => {
    this.setState(() => ({
      dialled: '',
      correctNum: false,
      onCall: false
    }))
    this.getCall69().load()
    this.getWrongNum().load()
  }

  // Reset the phone when the audio finishes playing
  getCallEnded = event => {
    const {id} = event.target;
    const audio = document.getElementById(id)
    if (audio.ended) {
      this.clearDial()
    }
  }

  render() {
    return (
      <main className="App">
        <pre id="ascii-box"
          style={this.state.correctNum ? {display: "block"} : {display: "none"}}></pre>

        <div id="phone">
          <p>           <span className="phone-background" id="phone-aerial">.-.</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p>           <span className="phone-background">| |</span></p>
          <p className="phone-background" id="phone-top"> _.--"""""""--;_</p>
          <p className="phone-background">//             \\</p>
          <p className="phone-background">||   .-"""-.   ||</p>
          <p className="phone-background">||  /  ...  \  ||</p>
          <p className="phone-background">|| |  :::::  | ||</p>
          <p className="phone-background">||  \  '''  /  ||</p>
          <p className="phone-background">||   '-...-'   ||</p>
          <p className="phone-background">|/.-----------.\|</p>
          <p className="phone-background">||{this.getMaxDisplay().slice(0,13)}||</p>
          <p className="phone-background">||{this.getMaxDisplay().slice(13,26)}||</p>
          <p className="phone-background">||{this.getMaxDisplay().slice(26,39)}||</p>
          <p className="phone-background">||{this.getMaxDisplay().slice(39,52)}||</p>
          <p className="phone-background">|\{this.getMaxDisplay().slice(52,65)}/|</p>
          <p className="phone-background">| `'""""""""""` |</p>
          <p className="phone-background">|
            <button id="call" onClick={this.handleCall}>&#91; {this.state.onCall ? "♫" : "📞"} &#93;</button>
            &ensp;&ensp;&ensp;&ensp;&ensp;
            <button id="clear" onClick={this.clearDial}>&#91; &#x274c; &#93;</button>
          |</p>
          <KeyPad handleClick={this.handleClick} />
          <p className="phone-background">|____ _____ ____|</p>
          <p className="phone-background">|==== ===== ====|</p>
          <p className="phone-background">|====  ___  ====|</p>
          <p className="phone-background">|   .'`   `'.   |</p>
          <p className="phone-background">|  /  .:::.  \  |</p>
          <p className="phone-background">\ ' &#123;SLIGOIL&#125; ' /</p>
          <p className="phone-background" id="phone-bottom"> `--.........--'</p>
        </div>
        <audio id="call-69" onEnded={this.getCallEnded} >
          <source src="/audio/call-69.mp3" />
        </audio>
        <audio id="wrong-num" onEnded={this.getCallEnded}>
          <source src="/audio/wrong-number.mp3" />
        </audio>
      </main>
    )
  }
}

export default App
