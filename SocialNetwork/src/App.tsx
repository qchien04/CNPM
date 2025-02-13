import { Provider } from 'react-redux';
import './App.css';
import Router from './routes/router';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './containers/auth';

function App() {
  return(
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <Router></Router>
          </AuthProvider>
        </Provider>
      </BrowserRouter>

    </>
  );

}


export default App;


