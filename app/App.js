import './global'

import React, {Component} from 'react'
import CustomRouter from './components/CustomRouter'
import { Provider as ReduxProvider } from 'react-redux'
// import { YellowBox } from 'react-native';
import configureStore from './modules/store'

const reduxStore = configureStore(window.REDUX_INITIAL_DATA)

// YellowBox.ignoreWarnings(['Warning: ...']);

class App extends Component {

    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', () => {
        //     console.warn('I will implement going back')
        // });
    }
    
    render () {
        return (            
            <ReduxProvider store={reduxStore}>
                <CustomRouter />
            </ReduxProvider>
        )
    }

}

export default App
