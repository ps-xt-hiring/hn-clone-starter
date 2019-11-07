import React from 'react';
import { Grid, Link } from '@material-ui/core/';

const logo = require('../logo.png');

const Header = () => (
  <Grid
    container
    xs={12}
    item
    className="header"
    direction="row"
    alignItems="center"
  >
    <Grid item className="header-child">
      <Link href="/">
        <img
          className="logo responsive-image"
          src={logo}
          alt="hacker news logo"
        />
      </Link>
    </Grid>
    <Grid item className="header-child">
      <b className="white">Top</b>
    </Grid>
    <Grid item className="header-child">
      |
    </Grid>
    <Grid item className="header-child">
      <b>New</b>
    </Grid>
  </Grid>
);
export default Header;
