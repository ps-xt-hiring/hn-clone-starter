import React from 'react';
import { Grid, Link } from '@material-ui/core/';

const logo = require('../assests/logo.gif');

const Header = () => (
  <Grid
    container
    xs={12}
    item
    className="header"
    direction="row"
    alignItems="center"
  >
    <Grid item className="headerChild">
      <Link href="/">
        <img className="logo" src={logo} alt="hacker news logo" />
      </Link>
    </Grid>
    <Grid item className="headerChild">
      <b className="white">Top</b>
    </Grid>
    <Grid item className="headerChild">
      |
    </Grid>
    <Grid item className="headerChild">
      <b>New</b>
    </Grid>
  </Grid>
);
export default Header;
