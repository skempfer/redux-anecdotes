import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../requests'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
    }
  })

  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase()

    return state.anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  })

  const vote = anecdote => {
    voteAnecdoteMutation.mutate(anecdote)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
