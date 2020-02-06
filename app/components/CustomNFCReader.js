import React, { Component } from 'react'
import {
    Text,
    Image,
    StyleSheet,
    View,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'
import StatusBar from './StatusBar'
import { connect } from 'react-redux'
import ACTIONS from '../modules/actions'
import PropTypes from 'prop-types'
import NfcManager from 'react-native-nfc-manager'

import Toast from 'react-native-simple-toast'

import tapImage from '../img/tap/tap.png'

const styles = StyleSheet.create({

    // titleText: {
    //     fontSize: 50,
    //     fontWeight: 'bold',
    //     color: '#e32f52',
    //     fontFamily: 'Comfortaa',
    // },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#e6c229',
    },
})

class CustomNFCReader extends Component {

    _startNfc() {
        const { setNFCTagId, updateCurrentPage } = this.props
        NfcManager.start({
            onSessionClosedIOS: () => {
                console.log('ios session closed');
            }
        })
        .then(result => {
            console.log('start OK', result);
        })
        .catch(error => {
            console.warn('start fail', error);
        })

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                        setNFCTagId(tag.id)
                        updateCurrentPage('kittyKeySelect')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.isEnabled()
                .then(enabled => {
                    this.setState({ enabled });
                })
                .catch(err => {
                    console.log(err);
                })
            NfcManager.onStateChanged(
                event => {
                    if (event.state === 'on') {
                    } else if (event.state === 'off') {
                    } else if (event.state === 'turning_on') {
                        // do whatever you want
                    } else if (event.state === 'turning_off') {
                        // do whatever you want
                    }
                }
            )
            .then(sub => {
                this._stateChangedSubscription = sub;
                // remember to call this._stateChangedSubscription.remove()
                // when you don't want to listen to this anymore
            })
            .catch(err => {
                console.warn(err)
            })
        }
    }

    _processTag = tag => {
        tag = "07773421"
        Toast.show("Nfc tag discovered: " + tag, Toast.SHORT)
        this.props.setNFCTagId(tag)
        this.props.updateCurrentPage('kittyKeySelect')
    }

    _onTagDiscovered = tag => {
        this._processTag(tag.id)
    }

    _startDetection = () => {
        NfcManager.registerTagEvent(this._onTagDiscovered)
            .then(result => {
                console.log('registerTagEvent OK', result)
            })
            .catch(error => {
                console.warn('registerTagEvent fail', error)
            })
    }

    componentDidMount() {
        this._startNfc()
        this._startDetection()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    underlayColor="white"
                    onLongPress={() => {
                        const todayTag = Math.round(Date.now() / (24 * 3600 * 1000)).toString() // Timestamp tag for today
                        this._processTag(todayTag)
                    }}
                >
                    <View>
                        <Image
                            source={tapImage}
                        />
                        {/* <Text style={styles.titleText}>Tapp!</Text> */}
                    </View>
                </TouchableWithoutFeedback>
                <StatusBar />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    nfcTagId: state.nfcTagId,
})

const mapDispatchToProps = dispatch => ({
    setNFCTagId: id => dispatch(ACTIONS.setNFCTagId(id)),
    updateCurrentPage: page => dispatch(ACTIONS.updateCurrentPage(page)),
})

CustomNFCReader.propTypes = {
    setNFCTagId: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CustomNFCReader)
