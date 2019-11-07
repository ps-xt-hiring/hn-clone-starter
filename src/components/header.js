import React from 'react';
import { Grid, Link } from '@material-ui/core/';

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
          className="logo"
          src="https://news.ycombinator.com/y18.gif"
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
