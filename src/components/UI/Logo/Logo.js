import React from 'react';

import LogoImg from '../../../assets/images/y18.jpg';
import { locale_Data, defaultLanguage } from '../../../utils/Locale-Data';
import Classes from './Logo.module.scss';

const logo = function () {
    return (
        <img className={Classes.header__logo}
            src={LogoImg}
            alt={locale_Data[defaultLanguage].LOGO_ALT_TEXT} />
    );
}

export default logo;