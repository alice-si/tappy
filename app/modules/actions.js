const Types = {
    SET_NFC_TAG_ID: 'SET_NFC_TAG_ID',
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
}

const updateCurrentPage = page => ({
    type: Types.UPDATE_CURRENT_PAGE,
    payload: page,
})

const setNFCTagId = id => ({
    type: Types.SET_NFC_TAG_ID, 
    payload: id
})

export default {
    Types,
    updateCurrentPage,
    setNFCTagId,
}