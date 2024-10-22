const Filter = ({ filterSelected }) => {

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filterSelected} />
    </div>
  )
}

export default Filter