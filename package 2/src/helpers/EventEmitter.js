export const SESSION_TIME_OUT = 'SESSION_TIME_OUT'
export const API_TIMEOUT = 'ECONNABORTED '
export const COMPONENT_RESIZE = 'COMPONENT_RESIZE'
export const DROPDOWN_RESET_POSITION = 'DROPDOWN_RESET_POSITION'
export const CALENDAR_RESET_POSITION = 'CALENDAR_RESET_POSITION'
export const FULL_COMPONENT = 'FULL_COMPONENT'
export const CLOSE_FULL_COMPONENT = 'CLOSE_FULL_COMPONENT'
export const CALC_TEXT_ELLIPSIS = 'CALC_TEXT_ELLIPSIS'
export const SHOW_POPUP_ERROR = 'SHOW_POPUP_ERROR'

class EventEmitter {
  events = {}

  dispatch = (event, data = null) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].forEach((callback) => {
      callback(data)
    })
  }

  subscribe = (event, callback) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  unsubscribe = (event, callback) => {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event] = this.events[event].filter((func) => func !== callback)
  }
}

const eventEmitter = new EventEmitter()
export default eventEmitter
