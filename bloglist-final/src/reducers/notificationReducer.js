const initialState = {
  message: null,
  type: null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

let timeoutId

export const setNotification = (notification, time ) => {
  return async dispatch => {
    dispatch({
      type:'SET_NOTIFICATION',
      notification
    })

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch({
        type:'REMOVE_NOTIFICATION'
      })
    }, time*1000)
  }
}

export default reducer