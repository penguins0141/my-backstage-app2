import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { pluginSecurityReviewPlugin, PluginSecurityReviewPage } from '../src/plugin';

createDevApp()
  .registerPlugin(pluginSecurityReviewPlugin)
  .addPage({
    element: <PluginSecurityReviewPage />,
    title: 'Root Page',
    path: '/plugin-security-review',
  })
  .render();
