// It must be at the top (at least before web3)
import './global';

import Blockchain from './blockchain';
import Web3 from 'web3';
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    TouchableOpacity,
    Linking,
    TextInput,
    ScrollView,
} from 'react-native';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

const RtdType = {
    URL: 0,
    TEXT: 1,
};

function buildUrlPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.uriRecord(valueToWrite),
    ]);
}

function buildTextPayload(valueToWrite) {
    return Ndef.encodeMessage([
        Ndef.textRecord(valueToWrite),
    ]);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: true,
            enabled: false,
            isWriting: false,
            urlToWrite: 'https://www.google.com',
            rtdType: RtdType.URL,
            parsedText: null,
            tag: {},
            lastBlockNumber: 'Don\'t know yet'
        }
    }

    componentDidMount() {
        NfcManager.isSupported()
            .then(supported => {
                this.setState({ supported });
                if (supported) {
                    this._startNfc();
                }
            })

        // this._checkWeb3();

        // pass card id and animal here
        this._checkBlockchainModule('1235633', 'doggy');
    }

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }

    render() {
        let { supported, enabled, tag, isWriting, urlToWrite, parsedText, rtdType, lastBlockNumber, msg, blockchain } = this.state;
        return (
            <ScrollView style={{flex: 1}}>
                { Platform.OS === 'ios' && <View style={{ height: 60 }} /> }

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{`Msg: ${msg}`}</Text>
                    <Text>{`Blockchain: ${blockchain}`}</Text>
                    <Text>{`WEB3 Stats: ${lastBlockNumber}`}</Text>

                    <Text>{`Is NFC supported sadhfj ALEX ? ${supported}`}</Text>
                    <Text>{`Is NFC enabled (Android only)? ${enabled}`}</Text>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._startDetection}>
                        <Text style={{ color: 'blue' }}>Start Tag Detection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._stopDetection}>
                        <Text style={{ color: 'red' }}>Stop Tag Detection</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._clearMessages}>
                        <Text>Clear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20 }} onPress={this._goToNfcSetting}>
                        <Text >(android) Go to NFC setting</Text>
                    </TouchableOpacity>

                    {
                        <View style={{padding: 10, marginTop: 20, backgroundColor: '#e0e0e0'}}>
                            <Text>(android) Write NDEF Test</Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <Text style={{marginRight: 15}}>Types:</Text>
                                {
                                    Object.keys(RtdType).map(
                                        key => (
                                            <TouchableOpacity
                                                key={key}
                                                style={{marginRight: 10}}
                                                onPress={() => this.setState({rtdType: RtdType[key]})}
                                            >
                                                <Text style={{color: rtdType === RtdType[key] ? 'blue' : '#aaa'}}>
                                                    {key}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    )
                                }
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={{width: 200}}
                                    value={urlToWrite}
                                    onChangeText={urlToWrite => this.setState({ urlToWrite })}
                                />
                            </View>

                            <TouchableOpacity
                                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }}
                                onPress={isWriting ? this._cancelNdefWrite : this._requestNdefWrite}>
                                <Text style={{color: 'blue'}}>{`(android) ${isWriting ? 'Cancel' : 'Write NDEF'}`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }}
                                onPress={isWriting ? this._cancelNdefWrite : this._requestFormat}>
                                <Text style={{color: 'blue'}}>{`(android) ${isWriting ? 'Cancel' : 'Format'}`}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ marginTop: 20, borderWidth: 1, borderColor: 'blue', padding: 10 }}
                                onPress={isWriting ? this._cancelAndroidBeam : this._requestAndroidBeam}>
                                <Text style={{color: 'blue'}}>{`${isWriting ? 'Cancel ' : ''}Android Beam`}</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <Text style={{ marginTop: 20 }}>{`Current tag JSON: ${JSON.stringify(tag)}`}</Text>
                    { parsedText && <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 18 }}>{`Parsed Text: ${parsedText}`}</Text>}
                </View>
            </ScrollView>
        )
    }

    _requestFormat = () => {
        let {isWriting} = this.state;
        if (isWriting) {
            return;
        }

        this.setState({isWriting: true});
        NfcManager.requestNdefWrite(null, {format: true})
            .then(() => console.log('format completed'))
            .catch(err => console.warn(err))
            .then(() => this.setState({isWriting: false}));
    }

    _requestNdefWrite = () => {
        let {isWriting, urlToWrite, rtdType} = this.state;
        if (isWriting) {
            return;
        }

        let bytes;

        if (rtdType === RtdType.URL) {
            bytes = buildUrlPayload(urlToWrite);
        } else if (rtdType === RtdType.TEXT) {
            bytes = buildTextPayload(urlToWrite);
        }

        this.setState({isWriting: true});
        NfcManager.requestNdefWrite(bytes)
            .then(() => console.log('write completed'))
            .catch(err => console.warn(err))
            .then(() => this.setState({isWriting: false}));
    }

    _cancelNdefWrite = () => {
        this.setState({isWriting: false});
        NfcManager.cancelNdefWrite()
            .then(() => console.log('write cancelled'))
            .catch(err => console.warn(err))
    }

    _checkWeb3() {
        // Checking web3 conenction
        // this.setState({msg: 'Web3 loading'})
        // const web3 = new Web3(
        //     new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/606df9dcfa654667854d09ddc1705d77')
        // );
        // let prevThis = this
        // web3.eth.getBlock('latest').then(function(result) {
        //     prevThis.setState({msg: 'Web3 loaded!'})
        //     prevThis.setState({'lastBlockNumber': JSON.stringify(result.number)})
        // }).catch(err => {
        //     prevThis.setState({msg: 'Error'})
        // })
    }

    _checkBlockchainModule(cardId, cardPass) {
        let prevThis = this

        Blockchain.unload(cardId, cardPass).then((res) => {
            prevThis.setState({blockchain: prevThis.state.blockchain + 'sent' + JSON.stringify(res)})
        }).catch(function(err) {
            prevThis.setState({blockchain: prevThis.state.blockchain + 'err: ' + err})
        })

        // Blockchain.load(cardId, cardPass).then((res) => {
        //     prevThis.setState({blockchain: prevThis.state.blockchain + 'sent' + JSON.stringify(res)})
        // }).catch(function(err) {
        //     prevThis.setState({blockchain: prevThis.state.blockchain + 'err: ' + err})
        // })
    }

    _requestAndroidBeam = () => {
        let {isWriting, urlToWrite, rtdType} = this.state;
        if (isWriting) {
            return;
        }

        let bytes;

        if (rtdType === RtdType.URL) {
            bytes = buildUrlPayload(urlToWrite);
        } else if (rtdType === RtdType.TEXT) {
            bytes = buildTextPayload(urlToWrite);
        }

        this.setState({isWriting: true});
        NfcManager.setNdefPushMessage(bytes)
            .then(() => console.log('beam request completed'))
            .catch(err => console.warn(err))
    }

    _cancelAndroidBeam = () => {
        this.setState({isWriting: false});
        NfcManager.setNdefPushMessage(null)
            .then(() => console.log('beam cancelled'))
            .catch(err => console.warn(err))
    }

    _startNfc() {
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
                this.setState({supported: false});
            })

        if (Platform.OS === 'android') {
            NfcManager.getLaunchTagEvent()
                .then(tag => {
                    console.log('launch tag', tag);
                    if (tag) {
                        this.setState({ tag });
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
                        this.setState({enabled: true});
                    } else if (event.state === 'off') {
                        this.setState({enabled: false});
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
                    console.warn(err);
                })
        }
    }

    _onTagDiscovered = tag => {
        console.log('Tag Discovered', tag);
        this.setState({ tag });
        let url = this._parseUri(tag);
        if (url) {
            Linking.openURL(url)
                .catch(err => {
                    console.warn(err);
                })
        }

        let text = this._parseText(tag);
        this.setState({parsedText: text});
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

    _stopDetection = () => {
        NfcManager.unregisterTagEvent()
            .then(result => {
                console.log('unregisterTagEvent OK', result)
            })
            .catch(error => {
                console.warn('unregisterTagEvent fail', error)
            })
    }

    _clearMessages = () => {
        this.setState({tag: null});
    }

    _goToNfcSetting = () => {
        if (Platform.OS === 'android') {
            NfcManager.goToNfcSetting()
                .then(result => {
                    console.log('goToNfcSetting OK', result)
                })
                .catch(error => {
                    console.warn('goToNfcSetting fail', error)
                })
        }
    }

    _parseUri = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
                return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }

    _parseText = (tag) => {
        try {
            if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
                return Ndef.text.decodePayload(tag.ndefMessage[0].payload);
            }
        } catch (e) {
            console.log(e);
        }
        return null;
    }
}

export default App;
