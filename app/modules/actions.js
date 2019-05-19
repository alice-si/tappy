const Types = {
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
    UPDATE_CURRENT_ACTION: 'UPDATE_CURRENT_ACTION',
}

const updateCurrentPage = page => ({
    type: Types.UPDATE_CURRENT_PAGE,
    payload: page,
})

const updateCurrentAction = action => ({
    type: Types.UPDATE_CURRENT_ACTION,
    payload: action
})

export default {
    Types,
    updateCurrentPage,
    updateCurrentAction,
}