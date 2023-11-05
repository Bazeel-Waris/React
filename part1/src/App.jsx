
const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
};

const Part = (props) => {
  // console.log(props.part)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}
const Content = (props) => {
  // console.log(props.content.parts[0])
  return (
    <div>
      <Part part={props.content.parts[0]}  />
      <Part part={props.content.parts[1]}  />
      <Part part={props.content.parts[2]}  />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number Of Exercises : {props.total.parts[0].exercises + props.total.parts[1].exercises + props.total.parts[2].exercises}</p>
  );
} 

function App() {
  const course = {
    name: 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
      {
        name : 'Using props to pass data',
        exercises : 7
      },
      {
        name : 'State of a component',
        exercises : 14
      }
    ] 
}
  return (
    <div>
      <Header course={course}/>
      <Content content={course}/>
      <Total total={course} />
    </div>
  )
}

export default App;
