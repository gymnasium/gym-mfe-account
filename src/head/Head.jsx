import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import messages from './messages';

const config = getConfig();
const settings = `${config.MARKETING_SITE_BASE_URL}/feeds/config.json`;
const css = `${config.MARKETING_SITE_BASE_URL}/css/mfe.css`;

const Head = ({ intl }) => (
  <Helmet>
    <title>
      {intl.formatMessage(messages['account.page.title'], { siteName: getConfig().SITE_NAME })}
    </title>
    <link rel="shortcut icon" href={config.FAVICON_URL} type="image/x-icon" />
    <link rel="stylesheet" href={css} />
  </Helmet>
);

Head.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Head);
