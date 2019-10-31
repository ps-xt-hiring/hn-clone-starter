import React, { Component } from 'react';

import Newsitem from '../../components/newsitem/NewsItem';
import Axios from '../../utils/axios/Axios-Config';
import { FRONT_PAGE_NEWS, LATEST_NEWS } from '../../utils/ServiceURL';
import { LATEST_NEWS_ROUTE, SUCCESS_STATUS } from '../../utils/Constants';
import Aux from '../../hoc/Auxillary';
import Button from '../../components/UI/Button/Button';
import { locale_Data, defaultLanguage } from '../../utils/Locale-Data';

class Newsfeed extends Component {
    state = {
        newsType: this.props.history.location.pathname,
        hits: null,
        totalPages: 0,
        totalCount: 0,
        page: 0,
        error: false,
        btnHidden: false
    }
    componentDidMount() {
        this.getHackerNews(this.getPageNumber());
    }

    getPageNumber() {
        let pageNumber = this.props.history.location.search.split('=');
        return pageNumber[1] || 0;
    }

    componentDidUpdate(prevProps, prevState) {
        let pNo = this.getPageNumber();
        if (this.props.history.location.pathname !== this.state.newsType
            || this.state.page !== pNo) {
            this.getHackerNews(pNo);
        }

    }

    getHackerNews = (pNo) => {
        let newsType = FRONT_PAGE_NEWS,
            currentPath = this.props.history.location.pathname;
        if (currentPath === LATEST_NEWS_ROUTE) { newsType = LATEST_NEWS; }
        Axios.get(newsType + '&page=' + pNo)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.parseNewsData(res.data, currentPath, pNo);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseNewsData = (data, currentPath, pNo) => {
        if (data.hits.length > 0) {
            let btnHidden = false;
            if ((data.hits.length * (data.page + 1)) < (data.nbHits - (data.hitsPerPage * data.page))) {
                btnHidden = true;
            }
            debugger
            this.setState({
                hits: data.hits,
                totalPages: data.nbPages,
                totalCount: data.nbHits,
                page: pNo,
                newsType: currentPath,
                btnHidden: btnHidden
            })
        }
    }

    onMoreBtnClicked = () => {
        let pNo = this.state.page + 1;
        this.props.history.push({
            // pathname: '/page',
            search: '?p=' + pNo
        });
    }

    render() {
        return (
            <Aux>
                <Newsitem newsItems={this.state.hits} />
                <Button clicked={this.onMoreBtnClicked} show={this.state.btnHidden}>
                    {locale_Data[defaultLanguage].BUTTON_TEXT}
                </Button>
            </Aux>

        );
    }
}

export default Newsfeed;