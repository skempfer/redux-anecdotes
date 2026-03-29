export const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return response.json()
}

export const createAnecdote = async content => {
  const newAnecdote = {
    content,
    votes: 0
  }

  const response = await fetch('http://localhost:3001/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAnecdote)
  })

  return response.json()
}
