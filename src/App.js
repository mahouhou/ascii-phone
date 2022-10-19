import React, { Component } from 'react';
import './App.css';
// import { run } from './run';
// import * as program from './coordinates_xy';

// Generate key pad from numbers 1-9, 0, # and +
const KeyPad = function({handleClick}) {
  let numberList = [];
  let symbolList = ["+",0,"#"];
  for (let i = 1; i < 10; i++) {
    numberList.push(i);
  }
  const Keys1 = numberList.slice(0,3).map((num) => (
    <button
      onClick={handleClick}
      // onKeyDown={handleKeyPress}
      key={num}
      value={num}
      id={`b${num}`}>
        |_{num}_|
    </button>
  ))
  const Keys2 = numberList.slice(3,6).map((num) => (
    <button
      onClick={handleClick}
      // onKeyDown={handleKeyPress}
      key={num}
      value={num}
      id={`b${num}`}>
        |_{num}_|
    </button>
  ))
  const Keys3 = numberList.slice(6,9).map((num) => (
    <button
      onClick={handleClick}
      // onKeyDown={handleKeyPress}
      key={num}
      value={num}
      id={`b${num}`}>
        |_{num}_|
    </button>
  ))
  const Keys4 = symbolList.map((sym) => (
    <button
      onClick={handleClick}
      // onKeyDown={handleKeyPress}
      key={sym == "+" ? "plus" : (sym == "#" ? "hash" : 0)}
      value={sym}
      id={`b${sym == "+" ? "plus" : (sym == "#" ? "hash" : 0)}`}>
        |_{sym}_|
    </button>
  ))
  const KeyBreak = <p className="phone-background">&#124;.---..---..---.&#124;</p>
  return <>
  {KeyBreak}
  <p className="phone-background">&#124;{Keys1}&#124;</p>
  {KeyBreak}
  <p className="phone-background">&#124;{Keys2}&#124;</p>
  {KeyBreak}
  <p className="phone-background">&#124;{Keys3}&#124;</p>
  {KeyBreak}
  <p className="phone-background">&#124;{Keys4}&#124;</p>
  </>;
}

// Initialise state
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialled: '',
      correctNum: false,
      onCall: false
    }
  }

  animate = () => {
    const cols = 200
    const rows = 60
    const chars = 'Do the right thing.  '.split('')  
    const colors = ['red', 'blue']
    const NUM_FRAMES = 5500

    const target = document.querySelectorAll('pre')[0]
    // const functions = [baseline, a, b, c]
    const functions = [baseline]

    let frame = 0
    let step = 0
    let t0
    let fun

    fun = functions[step]

    const loop = (t) => {

      const af = requestAnimationFrame(loop)

      if (this.state.onCall == false) {
        cancelAnimationFrame(af);
      }

      if (frame == 0) t0 = performance.now();

      fun(target, frame)
      frame++

      if (frame == NUM_FRAMES) {
        const elapsed = performance.now() - t0

        frame = 0
        step++

        if (step < functions.length) {
          fun = functions[step]
        } else {
          cancelAnimationFrame(af)
        }
      }
    }

    requestAnimationFrame(loop)

    // ---------------------------------------------------------------------

    // Unstyled; should run at 60fps
    // Direct write to innerHTML
    function baseline(target, frame) {
      let html = ''
      for (let j=0; j<rows; j++) {
        for (let i=0; i<cols; i++) {
          const idx = (i + j * rows + frame) % chars.length
          html += chars[idx]
        }
        html += '<br>'
      }
      target.innerHTML = html
    }

    // ---------------------------------------------------------------------

    // Every char is wrapped in a span, same style
    // Direct write to innerHTML
    // function a(target, frame) {
    //   let html = ''
    //   for (let j=0; j<rows; j++) {
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame) % chars.length
    //       html += `<span>${chars[idx % chars.length]}</span>`
    //     }
    //     html += '<br>'
    //   }
    //   target.innerHTML = html
    // }

    // ---------------------------------------------------------------------

    // Every char is wrapped in a span, foreground and background change
    // Direct write to innerHTML
    // function b(target, frame) {
    //   let html = ''
    //   for (let j=0; j<rows; j++) {
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame)
    //       const style = `color:${colors[idx % colors.length]};background-color:${colors[(idx+1) % colors.length]};`
    //       html += `<span style="${style}">${chars[idx % chars.length]}</span>`
    //     }
    //     html += '<br>'
    //   }
    //   target.innerHTML = html
    // }

    // ---------------------------------------------------------------------

    // Direct write to innerHTML of each span
    // Re-use of <spans>
    // const r = new Array(rows).fill(null).map(function(e) {
    //   const span = document.createElement('span')
    //   span.style.display = 'block'
    //   return span
    // })

    // function c(target, frame) {
    //   if (frame == 0) {
    //     target.innerHTML = ''
    //     for (let j=0; j<rows; j++) {
    //       target.appendChild(r[j])
    //     }
    //   }

    //   for (let j=0; j<rows; j++) {
    //     let html = ''
    //     for (let i=0; i<cols; i++) {
    //       const idx = (i + j * rows + frame)
    //       const style = `color:${colors[idx % colors.length]};background-color:${colors[(idx+1) % colors.length]};`
    //       html += `<span style="${style}">${chars[idx % chars.length]}</span>`
    //     }
    //     r[j].innerHTML = html
    //   }
    // }
  }

  // Limit screen display to 65 characters
  // White space fills the screen while empty
  getMaxDisplay = () => {
    const fullDisplay = this.state.dialled + "                                                                 ";
    const maxDisplay = fullDisplay.slice(0, 65);
    return maxDisplay;
  }

  getCall69 = () => {
    const call69 = document.getElementById("call-69");
    return call69;
  }

  getWrongNum = () => {
    const wrongNum = document.getElementById("wrong-num");
    return wrongNum;
  }

  // Reset the phone when the audio finishes playing
  getCallEnded = event => {
    const {id} = event.target;
    const audio = document.getElementById(id);
    if (audio.ended) {
      this.clearDial()
    }
  }

  // Update dialled state with buttons which have been clicked
  handleClick = event => {
		const {value} = event.target;
    const liveDial = this.state.dialled;
    this.setState(() => ({
      dialled: liveDial + value,
    }));
	}

  // Update dialled state with keyboard keys that have been pressed
  // handleKeyPress = event => {
	// 	const {value} = event.target;
  //   console.log(value);
  //   // const liveDial = this.state.dialled;
	// 	// if (typeof value == "number") {
  //   //   this.setState((prevState, props) => ({
  //   //     ...prevState,
  //   //     dialled: liveDial + value,
  //   //   }));
	// 	// }
	// }

  // Update onCall state to indicate call is in progress
  // Check dialled number matches correct numbers
  // Play audio message if number is correct
  // Play audio error if number is incorrect
  handleCall = event => {
    // const {value} = event.target;
    this.setState(() => ({
      onCall: true
    }));
    if ((this.state.dialled === "101") ||
        (this.state.dialled === "5042336371") ||
        (this.state.dialled === "+15042336371") ||
        (this.state.dialled === "07401201351") ||
        (this.state.dialled === "+447401201351")) {
      this.setState(() => ({
        correctNum: true,
        dialled: "ON CALL..."
      }))
      this.getCall69().play();
      this.animate();
    } else {
      this.getWrongNum().play();
      this.setState(() => ({
        dialled: "WRONG NUMBER..."
      }))
    }
  }

  clearDial = () => {
    this.setState(() => ({
      dialled: '',
      correctNum: false,
      onCall: false
    }))
    this.getCall69().load();
    this.getWrongNum().load();
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
        {/* <div>
          <p>           .-.</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p>           | |</p>
          <p> _.--"""""""--;_</p>
          <p>//             \\</p>
          <p>||   .-"""-.   ||</p>
          <p>||  /  ...  \  ||</p>
          <p>|| |  :::::  | ||</p>
          <p>||  \  '''  /  ||</p>
          <p>||   '-...-'   ||</p>
          <p>|/.-----------.\|</p>
          <p>||             ||</p>
          <p>||             ||</p>
          <p>||             ||</p>
          <p>||             ||</p>
          <p>|\             /|</p>
          <p>| `'""""""""""` |</p>
          <p>|&#91;CALL&#93;   &#91;STOP&#93;|</p>
          <p>|.---..---..---.|</p>
          <p>||_1_||_2_||_3_||</p>
          <p>|.---..---..---.|</p>
          <p>||_4_||_5_||_6_||</p>
          <p>|.---..---..---.|</p>
          <p>||_7_||_8_||_9_||</p>
          <p>|.---..---..---.|</p>
          <p>||_*_||_0_||_#_||</p>
          <p>|____ _____ ____|</p>
          <p>|==== ===== ====|</p>
          <p>|====  ___  ====|</p>
          <p>|   .'`   `'.   |</p>
          <p>|  /  .:::.  \  |</p>
          <p>\ ' &#123;SLIGOIL&#125; ' /</p>
          <p> `--.........--'</p>
        </div> */}
        <audio id="call-69" onEnded={this.getCallEnded} >
          <source src="/audio/call-69.mp3" />
        </audio>
        <audio id="wrong-num" onEnded={this.getCallEnded}>
          <source src="/audio/wrong-number.mp3" />
        </audio>
      </main>
    );
  }
}

export default App;
