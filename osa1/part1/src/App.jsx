const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <div>
        <h1>
          {props.course}
        </h1>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part={course.parts[0].name} exercise={course.parts[0].exercises} />
        <Part part={course.parts[1].name} exercise={course.parts[1].exercises} />
        <Part part={course.parts[2].name} exercise={course.parts[2].exercises} />
      </div>
    )
  }

  const Part = (props) => {
    return (
      <div>
        {props.part} {props.exercise}
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        {props.exercises}
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content></Content>
      <Total exercises={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App