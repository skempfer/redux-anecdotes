import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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
    createAnecdote: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(content) {
        return {
          payload: asObject(content)
        }
      }
    }
  }
})

export const { setAnecdotes, voteAnecdote, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await fetch('http://localhost:3001/anecdotes')
    const anecdotes = await response.json()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
