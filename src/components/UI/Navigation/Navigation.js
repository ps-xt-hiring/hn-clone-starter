import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import Classes from './Navigation.module.scss';
import { LATEST_NEWS_ROUTE, FRONT_PAGE_ROUTE } from '../../../utils/Constants';
import { localeData, defaultLanguage } from '../../../utils/Locale-Data';

const navigationItems = () => (
  <ul className={Classes.header__Navigation}>
    <NavigationItem link={FRONT_PAGE_ROUTE} exact>
      {localeData[defaultLanguage].TOP_NAVIGATION_TEXT}
    </NavigationItem>
    <NavigationItem link={LATEST_NEWS_ROUTE}>
      {localeData[defaultLanguage].NEW_NAVIGATION_TEXT}
    </NavigationItem>
  </ul>
);

export default navigationItems;
