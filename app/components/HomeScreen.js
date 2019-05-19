import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'
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
        justifyContent: 'center',
        backgroundColor: '#6610f2',
    },
    logo: {
        width: 200,
        height: 350,
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
            </View>
        )
    }
}

export default HomeScreen
