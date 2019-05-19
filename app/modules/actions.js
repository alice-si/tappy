const Types = {
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
}

const updateCurrentPage = page => ({
    type: Types.UPDATE_CURRENT_PAGE,
    payload: page,
})

export default {
    Types,
    updateCurrentPage,
}