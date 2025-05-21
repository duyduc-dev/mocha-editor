import { RouterProvider } from 'react-router';
import routes from './components/routes';
import { Provider } from 'react-redux';
import { persistor, store } from '@renderer/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
  );
};

export default App;
