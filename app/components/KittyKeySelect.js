import React, { Component } from 'react'
import {
    View,
    ListView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import Blockchain from '../blockchain'
import {connect} from 'react-redux'
import ACTIONS from '../modules/actions'

import kitty1 from '../img/kittykeys/aeon.png'
import kitty2 from '../img/kittykeys/catzy.png'
import kitty3 from '../img/kittykeys/draco.png'
import kitty4 from '../img/kittykeys/kitt-e.png'
import kitty5 from '../img/kittykeys/pizzaz.png'
import kitty6 from '../img/kittykeys/purremyAllaire.png'
import kitty7 from '../img/kittykeys/purrocious.png'
import kitty8 from '../img/kittykeys/Spacecat.png'
import kitty9 from '../img/kittykeys/Sparkles.png'

import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

let successSound = new Sound(require('../sounds/tada.wav'), error => console.warn(error));
let failureSound = new Sound(require('../sounds/sad.wav'), error => console.warn(error))

const playSuccess = () => {
  successSound.play((success) => {
    successSound = new Sound(require('../sounds/tada.wav'), error => console.warn(error));
  })
}

const playFailure = () => {
    failureSound.play((success) => {
        failureSound = new Sound(require('../sounds/sad.wav'), error => console.warn(error))
    })
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
let dataSource = ds.cloneWithRows([kitty1, kitty2, kitty3, kitty4, kitty5, kitty6, kitty7, kitty8, kitty9])

const styles = StyleSheet.create({
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kittyKeyTile: {
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#d6d7da',
    },
    kittyKeyImage: {
        width: 100,
        height: 100,
        margin: 20,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

class KittyKeySelect extends Component {

    renderKittyKey(keyNumber, props) {
        return (
            <View style={styles.kittyKeyTile}>
                <TouchableOpacity onPress={() => {
                    let blockchainMethod;
                    if (this.props.currentAction == 'load') {
                        blockchainMethod = Blockchain.load
                    } else if ((this.props.currentAction == 'unLoad')) {
                        blockchainMethod = Blockchain.unload
                    } else {
                        throw 'Current action is not supported'
                    }

                    const cardId = this.props.nfcTagId

                    blockchainMethod(cardId.toString(), keyNumber.toString()).then(function() {
                        playSuccess()
                        Alert.alert('Blockchain transaction sent successfully')
                        props.updateCurrentAction('none')
                        props.updateCurrentPage('home')
                    }, function(err) {
                        // TODO Implement nice notification
                        playFailure()
                        Alert.alert('Blockchain transaction failed. Please try again')
                        props.updateCurrentAction('none')
                        props.updateCurrentPage('home')
                    })
                    
                }}>
                    <Image
                    source={keyNumber}
                    style={styles.kittyKeyImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderKittyKeys(props) {
        return (
            <ListView
              contentContainerStyle={styles.list}
              dataSource={dataSource}
              renderRow={(rowData) => this.renderKittyKey(rowData, props)}
            />
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Pick your Kitty Key!</Text>
                {this.renderKittyKeys(this.props)}
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
    currentAction: state.currentAction,
    nfcTagId: state.nfcTagId
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KittyKeySelect)
