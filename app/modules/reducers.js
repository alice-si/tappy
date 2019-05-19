import ACTIONS from './actions'
import _ from 'lodash'


const defaultState = {
    currentPage: 'nfcReader',
    nfcTagId: {},
}

const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case ACTIONS.Types.UPDATE_CURRENT_PAGE: {            
            let newState = _.cloneDeep(state)
            newState.currentPage = action.payload
            return newState
        }
        
        case ACTIONS.Types.SET_NFC_TAG_ID: {
            let newState = _.cloneDeep(state)
            newState.nfcTagId = action.payload
            return newState
        }

        default:
            return state
    }
}

export default reducer
