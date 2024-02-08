import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'formdata-polyfill';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import {
  APP_INIT_ERROR,
  APP_READY,
  getConfig,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const config = getConfig();
import GymSettings, { GymFooter, GymHeader } from '@edx/gym-frontend';
const timestamp = Date.now();
const settings = await GymSettings;
const root = settings.urls.root; // should be same as marketing URL
const css = `${root}${settings.css.mfe}?${timestamp}`;
const title = `Account Settings | ${getConfig().SITE_NAME}`;

import configureStore from './data/configureStore';
import AccountSettingsPage, { NotFoundPage } from './account-settings';
import IdVerificationPage from './id-verification';
import messages from './i18n';

import './index.scss';

import NotificationCourses from './notification-preferences/NotificationCourses';
import NotificationPreferences from './notification-preferences/NotificationPreferences';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Helmet>
        <title>{title}</title>
        <link rel="shortcut icon" href={config.FAVICON_URL} type="image/x-icon" />
        <link rel="stylesheet" href={css} />
      </Helmet>
      <GymHeader secondaryNav="dashboard" activeLink="account" />
      <main><div className="container">
      <Routes>
        <Route element={(
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>

            <main className="flex-grow-1">
              <Outlet />
            </main>

          </div>
        )}
        >
          <Route path="/notifications/:courseId" element={<NotificationPreferences />} />
          <Route path="/notifications" element={<NotificationCourses />} />
          <Route path="/id-verification/*" element={<IdVerificationPage />} />
          <Route path="/" element={<AccountSettingsPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </div></main>
      <GymFooter />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        ENABLE_DEMOGRAPHICS_COLLECTION: (process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false),
        DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_ACCOUNT_DELETION: (process.env.ENABLE_ACCOUNT_DELETION !== 'false'),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
        PASSWORD_RESET_SUPPORT_LINK: process.env.PASSWORD_RESET_SUPPORT_LINK,
        LEARNER_FEEDBACK_URL: process.env.LEARNER_FEEDBACK_URL,
      }, 'App loadConfig override handler');
    },
  },
});
