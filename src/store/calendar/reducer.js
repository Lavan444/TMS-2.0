import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_PAGE_DATA,
} from "./actionTypes"

const INIT_STATE = {
  events: [],
  categories: [],
  error: {},
  pagination: {
    first: 0,
    rows: 10,
    totalRecords: 20,
  },
}

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      }
    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
      }

    case ADD_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(event =>
          event.id.toString() === action.payload.id.toString()
            ? { event, ...action.payload }
            : event
        ),
      }

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(
          event => event.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case SET_PAGE_DATA:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          first: action.payload.first,
          rows: action.payload.rows,
          totalRecords: action.payload.totalRecords,
        },
      }
    default:
      return state
  }
}

export default Calendar
