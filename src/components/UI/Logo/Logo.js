import React from 'react';

import LogoImg from '../../../assets/images/y18.jpg';
import { localeData, defaultLanguage } from '../../../utils/Locale-Data';
import Classes from './Logo.module.scss';

const logo = () => (
  <img
    className={Classes.header__logo}
    src={LogoImg}
    alt={localeData[defaultLanguage].LOGO_ALT_TEXT}
  />
);

export default logo;
