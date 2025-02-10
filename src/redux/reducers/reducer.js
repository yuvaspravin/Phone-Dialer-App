import { ADD_CALL_HISTORY, SAVE_CONTACT, DELETE_CONTACT, ENABLE_DIAL_PAD,ENABLE_DIAL_SCREEN ,DISPLAY_CONTACT_NUMBER,FAVORTIES_CONTACT_LIST,ENABLE_SEARCH} from '../action/index';

const initialState = {
  callHistory: [],
  contacts: [],
  isDialPadEnable: false,
  isDialScreenEnable: false,
  isSearchEnable: false,
  isContactNumber:{}
};

const rootReducer = (state = initialState, action) => {
  console.log("Action received:", action);
  switch(action.type) {
    case ADD_CALL_HISTORY:
      return { ...state, callHistory: [...state.callHistory, action.payload] };

    case SAVE_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
      
    case FAVORTIES_CONTACT_LIST:
      return { ...state, contacts: action.payload };
    
    case DELETE_CONTACT:
      return { ...state, contacts: action.payload };

    case ENABLE_DIAL_PAD:
      return { ...state, isDialPadEnable: action.payload};

    case ENABLE_DIAL_SCREEN:
      return { ...state, isDialScreenEnable: action.payload};

    case ENABLE_SEARCH:
      return { ...state, isSearchEnable: action.payload};
      
    case DISPLAY_CONTACT_NUMBER:
      return { ...state, isContactNumber: action.payload};

    default:
      return state;
  }
};

export default rootReducer;
