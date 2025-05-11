import { createBrowserRouter, RouteObject } from 'react-router';
import { RoutePath } from '@renderer/utilities/routes';
import Editor from '@renderer/components/features/Editor';
import AppContainer from '@renderer/containers/AppContainer';
import Layout from '@renderer/containers/Layout';

const routes: RouteObject[] = [
  {
    path: RoutePath.ROOT,
    Component: Layout,
    children: [
      {
        index: true,
        Component: Editor,
      },
    ],
  },
];

export default createBrowserRouter([
  {
    path: RoutePath.ROOT,
    Component: AppContainer,
    children: routes,
  },
]);
