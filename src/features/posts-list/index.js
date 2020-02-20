import React from 'react';
import Post from '../post';
import {getQueryStringValue, obj} from '../../importables';



import './index.css';

class PostList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            page: 0,
            hiddenPosts: [],
            disableMore: false,
            isLoad: false
        };

        this.upvotesArr = [];

        this.upvote = this
            .upvote
            .bind(this);
        this.hidePost = this
            .hidePost
            .bind(this);
    }

    componentDidMount() {
        this.setState({
            isLoad: true,
            hiddenPosts: JSON.parse(localStorage.getItem('hiddenPosts') || '[]')
        });

        this.fetchData();
    }

    fetchData() {
        const pageNum = getQueryStringValue('page') || 0;
        const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNum}`;

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                const {hiddenPosts} = this.state;
                if (hiddenPosts.length > 0) {
                    const low = Math.min(...hiddenPosts);
                    const url2 = `${url}&numericFilters=created_at_i<${low}`;
                    fetch(url2)
                        .then(r => r.json())
                        .then((d) => {
                            const prevRes = data
                                .hits
                                .filter(f => (hiddenPosts.indexOf(f.created_at_i) < 0));
                            prevRes.push(...d.hits.slice(0, 20 - prevRes.length));
                            this.syncLocalStorage(prevRes, pageNum);
                        });
                } else {
                    this.syncLocalStorage(data.hits, pageNum);
                }
            })
            .catch(() => {});
    }

    syncLocalStorage(posts, page) {
        this.upvotesArr = JSON.parse(localStorage.getItem('upvotes') || '[]');

        const postArr = [];
        posts.forEach((post) => {
            const postObj = {
                ...post
            };
            postObj.points = post.points || 0;
            if (this.upvotesArr.indexOf(postObj.objectID) >= 0) {
                postObj.points += 1;
            }
            postArr.push(postObj);
        });
        this.setState({posts: postArr, isLoad: false, page});
    }

    upvote(objectID) {
        const {posts} = this.state;
        const postObj = posts.filter(f => f.objectID === objectID)[0];
        if (this.upvotesArr.indexOf(objectID) >= 0) {
            postObj.points -= 1;
            this
                .upvotesArr
                .splice(this.upvotesArr.indexOf(objectID), 1);
        } else {
            postObj.points += 1;
            this
                .upvotesArr
                .push(objectID);
        }
        this.setState({
            posts: [...posts]
        });
        localStorage.setItem('upvotes', JSON.stringify(this.upvotesArr));
    }

    hidePost(createdTime) {
        const {hiddenPosts} = this.state;
        if (hiddenPosts.indexOf(createdTime) < 0) {
            hiddenPosts.push(createdTime);
        }
        localStorage.setItem('hiddenPosts', JSON.stringify(hiddenPosts));
        this.setState({
            hiddenPosts: [...hiddenPosts]
        });
        this.fetchData();
    }

    render() {
        const {isLoad, disableMore, posts, page} = this.state;
        return (
            <div className="postViewPort">
                {isLoad
                    ? <div className="loader">{obj.DATA_LOAD}</div>
                    : (
                        <table>
                            <thead>
                                <tr>
                                    <td className="header" colSpan="3">
                                        <span className="topNavLinks">
                                            <a href="/">{obj.TOP}</a>
                                            |
                                            <a href="/">{obj.NEW}</a>
                                        </span>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <tr key={`post-${post.objectID}`} className="postContainer">
                                        <Post
                                            post={post}
                                            upvote={this.upvote}
                                            hide={this.hidePost}
                                            isUpvoted={this
                                            .upvotesArr
                                            .indexOf(post.objectID) >= 0}/>
                                    </tr>
                                ))
}
                            </tbody>
                            <tfoot>
                                <tr className="postContainer">
                                    <td colSpan="3">
                                        {!disableMore && <a href={`?page=${parseInt(page, 10) + 1}`} className="moreButton">{obj.MORE}</a>}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    )
}
            </div>
        );
    }
}

export default PostList;