import { combineReducers } from 'redux'
import appstate from './appreducers'

const combinedapp = combineReducers({
  appstate
})

export default combinedapp