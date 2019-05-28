import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import {connect} from 'react-redux'
import ACTIONS from '../modules/actions'

const styles = StyleSheet.create({
  text: {
    fontSize: 25
  }
})

class StatusBar extends Component {

    getCurrentAction() {
      return this.props.currentAction
    }

    render() {
        return (
            <View>
                <Text style={styles.text}>to {this.getCurrentAction()}</Text>
            </View>
        )
    }
}


// const mapDispatchToProps = dispatch => ({
//     updateCurrentPage: page => {
//         dispatch(ACTIONS.updateCurrentPage(page))
//     },
//     updateCurrentAction: action => {
//         dispatch(ACTIONS.updateCurrentAction(action))
//     },
// })

const mapStateToProps = state => ({
    // currentPage: state.currentPage,
    currentAction: state.currentAction
})

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(StatusBar)
