import { RouterProvider } from 'react-router';
import routes from './components/routes';
import { Provider } from 'react-redux';
import { store } from '@renderer/store';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
};

export default App;
