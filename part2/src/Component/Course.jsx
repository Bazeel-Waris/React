const Header = ({courseName}) => {
    return(
      <div>
        <h1>{courseName}</h1>
      </div>
    )
  };
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({content}) => { 
    return (
      <div>
        { 
          content.map(part => <Part key={part.id} part={part}/> ) 
        }
      </div>
    )
  }
  
  const Total = ({total}) => {
    let result = total.reduce((sum, item) => {
      return sum + item.exercises;
    }, 0)
    return (
      <b>
        Total Of {result} Exercises
      </b>
    );
  }
  
  const Course = ({courses}) => {
    let r = courses.map(course => {
      return (
        <div>
          <Header courseName={course.name} />
          <Content content={course.parts}/>
          <Total total={course.parts}/>
        </div>
      )
    })
    return (
      <div>
  
        {
          courses.map(course => {
            return (
              <div key={course.id}>
                <Header courseName={course.name} />
                <Content content={course.parts}/>
                <Total total={course.parts}/>
              </div>
            )
          })
        }
          
      </div>
    )
  }

export default Course;