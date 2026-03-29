import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.payload)

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, voteAnecdote, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await fetch('http://localhost:3001/anecdotes')
    const anecdotes = await response.json()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
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

    const createdAnecdote = await response.json()
    dispatch(appendAnecdote(createdAnecdote))
  }
}

export default anecdoteSlice.reducer
