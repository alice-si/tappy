import { BackHandler } from 'react-native'
const Types = {
    SET_NFC_TAG_ID: 'SET_NFC_TAG_ID',
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
    UPDATE_CURRENT_ACTION: 'UPDATE_CURRENT_ACTION',
    HANDLE_BACK_BUTTON_PRESS: 'HANDLE_BACK_BUTTON_PRESS',
}

const updateCurrentPage = page => ({
    type: Types.UPDATE_CURRENT_PAGE,
    payload: page,
})

const setNFCTagId = id => ({
    type: Types.SET_NFC_TAG_ID, 
    payload: id,
})

const updateCurrentAction = action => ({
    type: Types.UPDATE_CURRENT_ACTION,
    payload: action
})

const handleBackButtonPress = currentPage => {
    var nextPage = 'home'
    if (currentPage === 'kittyKeySelect') {
            nextPage = 'nfcReader'
    } else if (currentPage === 'home') {
        BackHandler.exitApp()
    }
    return dispatch => {
        dispatch(updateCurrentPage(nextPage))
    }
}

export default {
    Types,
    updateCurrentPage,
    setNFCTagId,
    updateCurrentAction,
    handleBackButtonPress,
}