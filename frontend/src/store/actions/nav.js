import * as actionTypes from "./actionTypes";

export const openAddChatPopup = () => {
  return {
    type: actionTypes.OPEN_ADD_CHAT_POPUP
  };
};

export const closeAddChatPopup = () => {
  return {
    type: actionTypes.CLOSE_ADD_CHAT_POPUP
  };
};
