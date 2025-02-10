
export const ADD_CALL_HISTORY = "ADD_CALL_HISTORY"
export const SAVE_CONTACT = "SAVE_CONTACT"
export const DELETE_CONTACT = "DELETE_CONTACT"
export const ENABLE_DIAL_PAD = "ENABLE_DIAL_PAD"
export const ENABLE_DIAL_SCREEN = "ENABLE_DIAL_SCREEN"
export const DISPLAY_CONTACT_NUMBER = "DISPLAY_CONTACT_NUMBER"
export const FAVORTIES_CONTACT_LIST = "FAVORTIES_CONTACT_LIST"
export const ENABLE_SEARCH = "ENABLE_SEARCH"

export const addCallLog = (number, type, time,duration) => ({
  type: ADD_CALL_HISTORY,
  payload: { number, type, time,duration },
});
 
export const saveContact = (firstName, lastName, phone, email,favorites) => ({
  type: SAVE_CONTACT,
  payload: { firstName, lastName, phone, email,favorites },
});

export const favortiesContactList = (updatedContacts) => ({
    type: FAVORTIES_CONTACT_LIST,  
    payload: updatedContacts
});

export const deleteContact = (contactList) => ({
  type: DELETE_CONTACT,
  payload: contactList,
});


export const enableDialPad = (flag) => ({
  type: ENABLE_DIAL_PAD,
  payload: flag
});

export const enableDialScreen = (flag) => ({
  type: ENABLE_DIAL_SCREEN,
  payload: flag
});
export const enableSearch = (flag) => ({
  type: ENABLE_SEARCH,
  payload: flag
});


export const callingNumber = (contactNumber) => ({
  type: DISPLAY_CONTACT_NUMBER,
  payload: contactNumber
});

