import { Provider } from 'react-redux';
import { persistor, store } from '@renderer/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from './containers/AppContainer';
import { LocaleProvider } from './locale';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <LocaleProvider>
          <AppContainer />
        </LocaleProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
