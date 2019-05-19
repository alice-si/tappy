import React, {Component} from 'react'
import NFCReader from './NFCReader'
import HomeScreen from './HomeScreen'
import KittyKeySelect from './KittyKeySelect'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ACTIONS from '../modules/actions'

class CustomRouter extends Component {
    render () {
        const { currentPage } = this.props
        switch(currentPage) {
            case 'home': 
                return <HomeScreen />

            case 'nfcReader':
                return <NFCReader />

            case 'kittyKeySelect':
                return <KittyKeySelect />
                
            default:
                return <HomeScreen />
        }
    }
}

CustomRouter.propTypes = {
    currentPage: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    currentPage: state.currentPage,
})

const mapDispatchToProps = dispatch => ({
    updateCurrentPage: page => dispatch(ACTIONS.updateCurrentPage(page)),  
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomRouter)
