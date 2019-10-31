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
        hits: null,
        totalPages: 0,
        totalCount: 0,
        page: null,
        error: false
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props.history.location.pathname !== nextState.newsType, this.state.page !== nextState.page,
            this.props.history.location.pathname !== nextState.newsType || this.state.page !== nextState.page)
        return (this.props.history.location.pathname !== nextState.newsType || this.state.page !== nextState.page);
    }
    componentDidMount() {
        this.getHackerNews();
    }

    componentDidUpdate() {
        this.getHackerNews();
    }

    getHackerNews = () => {
        let newsType = FRONT_PAGE_NEWS,
            currentPath = this.props.history.location.pathname;
        if (currentPath === LATEST_NEWS_ROUTE) { newsType = LATEST_NEWS; }
        Axios.get(newsType)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.parseNewsData(res.data, currentPath);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    parseNewsData = (data, currentPath) => {
        if (data.hits.length > 0) {
            this.setState({
                hits: data.hits,
                totalPages: data.nbPages,
                totalCount: data.nbHits,
                page: data.page,
                newsType: currentPath
            })
        }
    }

    render() {
        return (
            <Aux>
                <Newsitem newsItems={this.state.hits} />
                <Button>
                    {locale_Data[defaultLanguage].BUTTON_TEXT}
                </Button>
            </Aux>

        );
    }
}

export default Newsfeed;