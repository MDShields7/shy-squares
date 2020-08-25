import ContextProvider from './components/contextAPI/ContextProvider';
import App from 'next/app'
// import * as serviceWorker from './serviceWorker';

class MyApp extends App {
  render(){
    return (
      <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
      </React.StrictMode>
    )
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
