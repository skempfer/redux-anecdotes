import { createContext, useContext, useReducer, useRef } from 'react'

const NotificationValueContext = createContext('')
const NotificationDispatchContext = createContext(null)

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'CLEAR_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const timeoutId = useRef(null)

  const setNotification = (message, seconds) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: message
    })

    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    timeoutId.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
    }, seconds * 1000)
  }

  return (
    <NotificationValueContext.Provider value={notification}>
      <NotificationDispatchContext.Provider value={setNotification}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationValueContext.Provider>
  )
}

export const useNotificationValue = () => useContext(NotificationValueContext)

export const useNotificationDispatch = () => useContext(NotificationDispatchContext)
