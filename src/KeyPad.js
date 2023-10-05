// Generate key pad from numbers 1-9, 0, # and +
export default function KeyPad({handleClick}) {
    let numberList = [];
    let symbolList = ["+",0,"#"];
    for (let i = 1; i < 10; i++) {
      numberList.push(i);
    }
    const Keys1 = numberList.slice(0,3).map((num) => (
      <button
        onClick={handleClick}
        key={num}
        value={num}
        id={`b${num}`}>
          |_{num}_|
      </button>
    ))
    const Keys2 = numberList.slice(3,6).map((num) => (
      <button
        onClick={handleClick}
        key={num}
        value={num}
        id={`b${num}`}>
          |_{num}_|
      </button>
    ))
    const Keys3 = numberList.slice(6,9).map((num) => (
      <button
        onClick={handleClick}
        key={num}
        value={num}
        id={`b${num}`}>
          |_{num}_|
      </button>
    ))
    const Keys4 = symbolList.map((sym) => (
      <button
        onClick={handleClick}
        key={sym === "+" ? "plus" : (sym === "#" ? "hash" : 0)}
        value={sym}
        id={`b${sym === "+" ? "plus" : (sym === "#" ? "hash" : 0)}`}>
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