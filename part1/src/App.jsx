import { useState } from "react";

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  let [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
   
  const [selected, setSelected] = useState(0)

  const nextQuote = () =>{

    setSelected(Math.floor(Math.random() * anecdotes.length));
    votes[selected];
  } 
  const points = () => {
    let copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }
  
  let max = Math.max(...votes);
  let indexOfMax = votes.indexOf(max);
  console.log(indexOfMax);
  return (
    <div>
      <p>{typeof selected === typeof '' ? selected : anecdotes[selected] }</p>
      <p>has {votes[selected]} Votes</p>
      <button onClick={points}>Vote</button>
      <button onClick={nextQuote}>Next Anecdotes</button>

      <h1>Anecdotes With Most Votes</h1>
      <p>{anecdotes[indexOfMax]}</p>
      <p>has { max } Votes</p>
    </div>
  )
}

export default App;

// const Button = (props) => <button onClick={props.feedback}>{props.text}</button>  
// const StatisticLine = (props) => {
//   return (
//    <div>
//     <table>
//       <thead></thead>
//       <tbody>
//         <tr>
//           <td width={80+'px'}>{props.text}</td>
//           <td width={80+'px'}>{props.value}</td>
//         </tr>
//       </tbody>
//     </table>
//    </div> 
//   )
// }
// const Statistics = ({good, neutral, bad, totalFeedback, average, positive}) => {
//   if(totalFeedback === 0)
//   {
//     return (
//       <div>
//         <h4>No Feedback Given!</h4>
//       </div>
//     )
//   }
//   return (

//     <div>
//       <h1>Statistics</h1>

//       <StatisticLine text="Good" value={good} />
//       <StatisticLine text="Neutral" value={neutral} />
//       <StatisticLine text="Bad" value={bad} />
//       <StatisticLine text="All" value={totalFeedback} />
//       <StatisticLine text="Average" value={average+'%'} />
//       <StatisticLine text="Positive" value={positive + '%'} />
//     </div>
//   );
// }

// const App = () => {
//   const [good, setGood] = useState(0);
//   const [neutral, setNeutral] = useState(0);
//   const [bad, setBad] = useState(0);
//   const [totalFeedback, setTotalFeedback] = useState(0);
//   const [average, setAverage] = useState(0);
//   const [positive, setPositive] = useState(0);

//   const handleGood = () => {
//     let updatedGood = good + 1;
//     let total = updatedGood + neutral + bad;
//     let averageGood = (updatedGood - bad)/total;
    
//     setGood(updatedGood);
//     setTotalFeedback(updatedGood + neutral + bad);
//     setAverage(averageGood);
//     setPositive((updatedGood / total) * 100);
//   }
//   const handleNeutral = () => {
//     let updatedNeutral = neutral + 1;
//     let total = good + updatedNeutral + bad;
//     let avgNeutral = (good - bad)/total;

//     setNeutral(updatedNeutral);
//     setTotalFeedback(good + updatedNeutral + bad);
//     setAverage(avgNeutral);
//     setPositive((good / total) * 100);
//   }
//   const handleBad = () => {
//     let updatedBad = bad + 1;
//     let total = good + neutral + updatedBad;
//     let avgBad = (good - updatedBad)/total;

//     setBad(updatedBad);
//     setTotalFeedback(good + neutral + updatedBad);
//     setAverage(avgBad);
//     setPositive((good / total) * 100);
//   }
//   return (
//     <div>
//       <h1>Give Feedback!</h1>

//       <Button feedback={handleGood} text="Good" />
//       <Button feedback={handleNeutral} text="Neutral" />
//       <Button feedback={handleBad} text="Bad" />

//       <Statistics good={good} neutral={neutral} bad={bad} totalFeedback={totalFeedback} average={average} positive={positive} />
//     </div>
//   );
// }

// export default App;

