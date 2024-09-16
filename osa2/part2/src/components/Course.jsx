const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part => <Part key={part.id} part={part}></Part>)}
    </>

const Course = ({ course }) =>
    <div>
        <Header course={course.name}></Header>
        <Content parts={course.parts}></Content>
        <Total sum={course.parts.map(part => part.exercises).reduce((sum, num) => sum + num)}></Total>
    </div>

export default Course