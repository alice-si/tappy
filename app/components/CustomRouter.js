import React, {Component} from 'react'
import CustomNFCReader from './CustomNFCReader'
import HomeScreen from './HomeScreen'
import KittyKeySelect from './KittyKeySelect'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ACTIONS from '../modules/actions'
import {BackHandler} from 'react-native'

class CustomRouter extends Component { 

    componentDidMount() {
        const {currentPage, handleBackButtonPress} = this.props
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            handleBackButtonPress(currentPage)
            return true;
        });
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.props.handleBackButtonPress);
    }
  
    
    render () {
        const { currentPage } = this.props

        switch(currentPage) {
            case 'home': 
                return <HomeScreen />

            case 'nfcReader':
                return <CustomNFCReader />

            case 'kittyKeySelect':
                return <KittyKeySelect />
                
            default:
                return <HomeScreen />
        }
    }
}

CustomRouter.propTypes = {
    currentPage: PropTypes.string.isRequired,
    handleBackButtonPress: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    currentPage: state.currentPage,
})

const mapDispatchToProps = dispatch => ({
    updateCurrentPage: page => dispatch(ACTIONS.updateCurrentPage(page)), 
    handleBackButtonPress: currentPage => dispatch(ACTIONS.handleBackButtonPress(currentPage))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomRouter)
