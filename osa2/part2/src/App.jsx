const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    <ul>
      {parts.map(part => <Part key={part.id} part={part}></Part>)}
    </ul>
  </>

const App = () => {

  const Course = () =>
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total sum={course.parts.map(part => part.exercises).reduce((sum, num) => sum + num)}></Total>
    </div>

  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 13,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App
