import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback
} from 'react-native'

import {connect} from 'react-redux'
import ACTIONS from '../modules/actions'

import logo from '../img/logo/logo-only.png'

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#e32f52',
        fontFamily: 'Comfortaa',
        marginTop: '10%',
        marginBottom: '20%'  
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#6610f2',
    },
    button: {
        marginBottom: 30,
        width: 260,
        alignItems: 'center',
        backgroundColor: '#1a8fe3'
    },
    buttonText: {
        padding: '20%',
        color: 'white',
        fontSize: 30
    }
})

class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Tappy</Text>

                <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                        this.props.updateCurrentAction('load')
                        // this.props.updateCurrentPage('kittyKeySelect')
                        this.props.updateCurrentPage('nfcReader')
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOAD</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                        this.props.updateCurrentAction('unLoad')
                        // this.props.updateCurrentPage('kittyKeySelect')
                        this.props.updateCurrentPage('nfcReader')
                    }}
                >
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>UNLOAD</Text>
                    </View>
                </TouchableHighlight>
 
            </View>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateCurrentPage: page => {
        dispatch(ACTIONS.updateCurrentPage(page))
    },
    updateCurrentAction: action => {
        dispatch(ACTIONS.updateCurrentAction(action))
    },
})

const mapStateToProps = state => ({
    currentPage: state.currentPage,
    currentAction: state.currentAction
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
