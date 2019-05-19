const Types = {
    SET_NFC_TAG_ID: 'SET_NFC_TAG_ID',
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
    UPDATE_CURRENT_ACTION: 'UPDATE_CURRENT_ACTION',
}

const updateCurrentPage = page => ({
    type: Types.UPDATE_CURRENT_PAGE,
    payload: page,
})

const setNFCTagId = id => ({
    type: Types.SET_NFC_TAG_ID, 
    payload: id
})

const updateCurrentAction = action => ({
    type: Types.UPDATE_CURRENT_ACTION,
    payload: action
})

export default {
    Types,
    updateCurrentPage,
    setNFCTagId,
    updateCurrentAction,
}