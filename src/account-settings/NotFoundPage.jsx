import React from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { GymErrors } from '@openedx/gym-frontend';

const NotFoundPage = () => (
  <GymErrors type={"404"} />
);

export default NotFoundPage;
