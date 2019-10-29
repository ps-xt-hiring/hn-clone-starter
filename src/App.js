import React from 'react';
import { connect } from 'react-redux';
import { getNewsFeed } from './Actions/newsAction';
import { Container, Grid, Link, Table, TableBody, TableCell, TableRow } from '@material-ui/core/';
import * as moment from 'moment';
import './css/newsFeed.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      newsList: []
    };
  }

  componentDidMount() {
    const { getNewsFeed } = this.props;
    getNewsFeed();
  }

  componentDidUpdate(prevProps) {
    const { newsList } = this.props;
    if(newsList !== prevProps.newsList && newsList.length){
      this.setState({
        newsList
      })
    }
  }

  _getDomain = (url) => {
    if(url) {
      const urlName = new URL(url);
      return  urlName.host 
    } else {
      return "Unknown"
    }
    
  }

  render() {
    const { newsList } = this.state
    return (
     <Container maxWidth="lg">
        <Grid container xs={12} item className='header' direction="row" spacing={1} alignItems="center">
          <Grid item>
            <Link href="/">
              <img className='logo' src="https://news.ycombinator.com/y18.gif"  alt="logo"/> 
            </Link>
          </Grid>
          <Grid item>
            <b className="white">Top</b>
          </Grid>
            |
          <Grid item>
            <b>New</b>
          </Grid>
        </Grid>
        <Table aria-label="news list table" size='small' className="newsList">
        <caption>More</caption>
        <TableBody>
          <TableRow className="emptyTableRow"></TableRow>
          {newsList.map(row => (
            <TableRow key={row.objectID}>
              <TableCell size='small' align="center"><b>{row.num_comments ? row.num_comments : 0}</b></TableCell>
              <TableCell size='small' className='noPadding' width={1}><b>{row.points}</b></TableCell>
              <TableCell size='small' className='noPadding' width={1}><i className="material-icons grey">arrow_drop_up</i></TableCell>
              <TableCell size='small' className='noPadding'>
                <Link href={row.url ? row.url : '/' } className="title">{row.title ? row.title+" " : 'No Title Available '}</Link>
                <Link href="/" className="grey fs10px">({this._getDomain(row.url)})</Link>
                <span className="grey fs10px"> by</span>
                <b className="fs10px"> {row.author} </b>
                <span className="grey fs10px">{moment(row.created_at).fromNow()}</span>
                <span className="fs10px"> [ <b>hide</b> ]</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Container>
    );
  }
}

export default connect(
  ({ newsFeed }) => ({
    newsList: newsFeed.newsList,
  }),
  dispatch => ({
    getNewsFeed: () => dispatch(getNewsFeed()),
  }),
)(App);