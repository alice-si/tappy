import React, {Component} from 'react'
import CustomRouter from './components/CustomRouter'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './modules/store'

const reduxStore = configureStore(window.REDUX_INITIAL_DATA)
class App extends Component {
    renderSelection() {
        return <NFCReader />
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
