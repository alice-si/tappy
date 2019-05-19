import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#6610f2',
    },
    logo: {
        width: "60%",
        height: "60%",
        marginBottom: "5%"
    },
    buttonContainer: {
        width: "80%",
        // height: 100,
        marginTop: 10,
    },
    button: {
        fontSize: 20

    }
})

class HomeScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Tappy</Text>
                <Image
                    source={logo}
                    style={styles.logo}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            this.props.updateCurrentAction('load')
                            this.props.updateCurrentPage('nfcReader')
                        }}
                        title="LOAD"
                        color="#1a8fe3"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            this.props.updateCurrentAction('unload')
                            this.props.updateCurrentPage('nfcReader')
                        }}
                        title="UNLOAD"
                        color="#1a8fe3"
                    />
                </View>
 
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

export default connect(
    null,
    mapDispatchToProps
)(HomeScreen)
