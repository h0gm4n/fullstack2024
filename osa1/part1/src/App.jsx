const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
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
      <Header course={course} />
      <Content></Content>
      <Total exercises={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App