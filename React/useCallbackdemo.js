import React, {useState,useMemo} from 'react';
  
function App() {
  const [number, setNumber] = useState(0)
  const squaredNum = useMemo(()=> {
    return squareNum(number);
  }, [number])
  const [counter, setCounter] = useState(0);
  
  const onChangeHandler = (e) => {
    setNumber(e.target.value);
  }
    
  const counterHander = () => {
    setCounter(counter + 1);
  }
  return (
    <div className="App">
      <input type="number" placeholder="Enter a number"
          value={number} onChange={onChangeHandler}>
      </input>
        
      <div>OUTPUT: {squaredNum}</div>
      <button onClick= {counterHander}>Counter ++</button>
      <div>Counter : {counter}</div>
    </div>
  );
}
function squareNum(number){
  console.log("Squaring will be done!");
  return Math.pow(number, 2);
}
  
export default App;