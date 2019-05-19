import React, { Component } from 'react'
import {
    View,
    ListView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import kitty1 from '../img/kittykeys/aeon.png'
import kitty2 from '../img/kittykeys/catzy.png'
import kitty3 from '../img/kittykeys/draco.png'
import kitty4 from '../img/kittykeys/kitt-e.png'
import kitty5 from '../img/kittykeys/pizzaz.png'
import kitty6 from '../img/kittykeys/purremyAllaire.png'
import kitty7 from '../img/kittykeys/purrocious.png'
import kitty8 from '../img/kittykeys/Spacecat.png'
import kitty9 from '../img/kittykeys/Sparkles.png'

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
        flexWrap: 'wrap'
    },
})

class KittyKeySelect extends Component {

    pressKitty() {

    }

    renderKittyKey(keyNumber) {
        return (
            <View style={styles.kittyKeyTile}>
                <TouchableOpacity onPress={this._onPressButton}>
                    <Image
                    source={keyNumber}
                    style={styles.kittyKeyImage}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    renderKittyKeys() {
        return (
            <ListView
              contentContainerStyle={styles.list}
              dataSource={dataSource}
              renderRow={(rowData) => this.renderKittyKey(rowData)}
            />
        )
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Pick your Kitty Key!</Text>
                {this.renderKittyKeys()}
            </View>
        )
    }
}

export default KittyKeySelect
