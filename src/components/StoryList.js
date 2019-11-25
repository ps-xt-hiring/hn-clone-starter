import React from 'react';
import {PropTypes} from 'prop-types';
import Post from './Post';

import DataEngine from './DataEngine';

export default class StoryList extends React.Component {

    static propTypes = {
        view: PropTypes.string
    }

    static defaultProps = {
        view: ''
    };

    constructor(props, state) {
        super(props, state);
        this.state  = {
            data: []
          };
      
        // Bind Post Handlers
        this.renderPosts = this.renderPosts.bind(this);
        this.hidePost = this.hidePost.bind(this);
        this.upvotePost = this.upvotePost.bind(this);
        this.downvotePost = this.downvotePost.bind(this);
    
        // Bind Date Engine handlers
        this.loadInitialData = this.loadLatestStories.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.updateData = this.updateData.bind(this);

        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.loadTopStories();
    }

    componentDidUpdate(nextProps) {
        if (nextProps.view !== this.props.view) {
            switch(this.props.view) {
                case 'top': this.loadTopStories(); break;
                case 'new': this.loadLatestStories(); break;
                default: break;
            }
        }
    }

    scrollToTop() {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(this.scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };
    
    updateData(data) {
        this.setState({
            data: data
        });

        this.scrollToTop();
    }
    
    loadLatestStories() {
        DataEngine.loadLatest().then(this.updateData);
    }

    loadTopStories() {
        DataEngine.loadTop().then(this.updateData);
    }
    
    
    loadNextPage() {
        DataEngine.loadNext().then(this.updateData);
    }
    
    renderPosts() {
        let self = this;
        ;
        let visibleRecords = this.state.data.filter((record)=> !record.hidden);
        return visibleRecords.map(function(record) {
        return <Post  
                key = {record.id}
                {...record}
                onHide={self.hidePost}
                onUpvote={self.upvotePost}
                onDownvote={self.downvotePost}
                >
            </Post>
        });
    }

    hidePost(idToHide) {
        let story = this.state.data.filter((story)=> story.id === idToHide)[0];
        // Mocking snip behavior
        story.hidden = true;
        this.setState({ data: this.state.data })

        DataEngine.hideStory(idToHide);
    }

    upvotePost(idtoUpvote) {
        let story = this.state.data.filter((story)=> story.id === idtoUpvote)[0];
        // Mocking upvote behavior
        story.upvoted = true;
        story.proxyPoints++;
        this.setState({ data: this.state.data })

        DataEngine.upvoteStory(idtoUpvote);
    }

    downvotePost(idtoDownvote) {
        let story = this.state.data.filter((story)=> story.id === idtoDownvote)[0];

        // Mocking downvote behavior
        story.upvoted = false;
        story.proxyPoints--;
        this.setState({ data: this.state.data })
    }

    render() {
        return (
        <div>
            {this.state && this.state.data && 
            <table border="0">
            <thead>
                <tr>
                    <th width="5%"></th>
                    <th width="95%"></th>
                </tr>
            </thead>
            <tbody>
                {this.renderPosts()}
            </tbody>
            <tfoot>
            </tfoot>
            </table>}
            <div onClick={this.loadNextPage} className="load-more-container">
                <span>More</span>
            </div>
        </div>);
       
    }
    
}