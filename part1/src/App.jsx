import { useState } from "react";

const Button = (props) => <button onClick={props.feedback}>{props.text}</button>  
const StatisticLine = (props) => {
  return (
   <div>
    <table>
      <thead></thead>
      <tbody>
        <tr>
          <td width={80+'px'}>{props.text}</td>
          <td width={80+'px'}>{props.value}</td>
        </tr>
      </tbody>
    </table>
   </div> 
  )
}
const Statistics = ({good, neutral, bad, totalFeedback, average, positive}) => {
  if(totalFeedback === 0)
  {
    return (
      <div>
        <h4>No Feedback Given!</h4>
      </div>
    )
  }
  return (

    <div>
      <h1>Statistics</h1>
      
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={totalFeedback} />
      <StatisticLine text="Average" value={average+'%'} />
      <StatisticLine text="Positive" value={positive + '%'} />
    </div>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    let updatedGood = good + 1;
    let total = updatedGood + neutral + bad;
    let averageGood = (updatedGood - bad)/total;
    
    setGood(updatedGood);
    setTotalFeedback(updatedGood + neutral + bad);
    setAverage(averageGood);
    setPositive((updatedGood / total) * 100);
  }
  const handleNeutral = () => {
    let updatedNeutral = neutral + 1;
    let total = good + updatedNeutral + bad;
    let avgNeutral = (good - bad)/total;

    setNeutral(updatedNeutral);
    setTotalFeedback(good + updatedNeutral + bad);
    setAverage(avgNeutral);
    setPositive((good / total) * 100);
  }
  const handleBad = () => {
    let updatedBad = bad + 1;
    let total = good + neutral + updatedBad;
    let avgBad = (good - updatedBad)/total;

    setBad(updatedBad);
    setTotalFeedback(good + neutral + updatedBad);
    setAverage(avgBad);
    setPositive((good / total) * 100);
  }
  return (
    <div>
      <h1>Give Feedback!</h1>

      <Button feedback={handleGood} text="Good" />
      <Button feedback={handleNeutral} text="Neutral" />
      <Button feedback={handleBad} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} totalFeedback={totalFeedback} average={average} positive={positive} />
    </div>
  );
}

export default App;