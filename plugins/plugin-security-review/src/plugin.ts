import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const pluginSecurityReviewPlugin = createPlugin({
  id: 'plugin-security-review',
  routes: {
    root: rootRouteRef,
  },
});

export const PluginSecurityReviewPage = pluginSecurityReviewPlugin.provide(
  createRoutableExtension({
    name: 'PluginSecurityReviewPage',
    component: () =>
      import('./components/PluginSecurityReviewPage').then(m => m.AppSecurityTesterPage),
    mountPoint: rootRouteRef,
  }),
);
