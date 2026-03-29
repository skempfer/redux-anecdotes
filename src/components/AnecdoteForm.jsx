import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: anecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`You created '${anecdote.content}'`, 5)
    }
  })

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (!content.trim()) {
      return
    }

    newAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
