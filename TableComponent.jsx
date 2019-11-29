import React from 'react';
import _ from 'lodash';
import './TableComponent.css';
import * as tableService from './TableService';


class TableComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            stories: []
        }
        this.stories=[];
        this.page = 0;
        this.getDataFromApi();
        //this.getStories = TableService.getStories;
    }

    getDataFromApi() {

        this.page++;
        this.setState({ loading: true });
        this.stories = tableService.getStories();
        let hide_story = JSON.parse(localStorage.getItem("hideStories")) || [],
            newData = _.differenceBy(this.stories.hits, hide_story, 'objectID');
        localStorage.setItem("stories", newData);
        this.setState({ stories: newData, total_page: this.stories.nbPages, loading: false });

        var storyList = this.state.stories;
        for (var i = 1; i < this.state.stories.length; i++) {
            storyList[i].voteIndex = 0;
            //console.log(storyList[i].voteIndex);
        }
        this.state.stories = storyList;
        //console.log(this.state.stories.voteIndex);
        this.render();
    }

    hideRowData = (objectID) => {

        let story_arr = JSON.parse(localStorage.getItem("hideStories"))
        let delete_story = _.remove(this.state.stories, (story) => story.objectID !== objectID)
        this.setState({ stories: delete_story });
        for (var i = 1; i < this.state.stories.length; i++) {
            if (this.state.stories[i].objectID == objectID) {
                this.setState.hiddenStories.push(story_arr[i]);
                localStorage.setItem("hiddenStories", this.state.hiddenStories);
            }
        }
    }



    upvoteStory(id, voteIndex) {
        let stories = this.state.stories;
        for (var i = 1; i < stories.length; i++) {
            if (stories[i].objectID == id) {
                stories[i].voteIndex = voteIndex + 1;
                console.log(stories[i].voteIndex);
            }
        }
        //     this.state.stories=stories;
        this.setState({ stories: stories });
    }
    render() {

        let stories = this.state.stories,
            story_listing = [];
        // eslint-disable-next-line no-lone-blocks
        {
            stories.map((story, index) => {
                this.state.index = index + 1;
                story_listing.push(
                    <tr key={story.objectID}>
                        <th width="50">{this.state.index}</th>
                        <th width="50">{this.state.stories[index].voteIndex}</th>
                        <th>{story.upVote !== true && <i onClick={() => this.upvoteStory(story.objectID, story.voteIndex)} className="fa fa-sort-asc" aria-hidden="true"></i>}</th>
                        <td>
                            <span className="story-title"> {story.story_title || story.title} </span>
                            <span className="story-url"> <a href={story.story_url || story.url}>( Domain )</a> </span>
                            <span className="story-auther"> by <b>{story.author}</b> </span>
                            <span className="story-date"> {(story.created_at_i)} </span>
                            <span className="story-unvote" > {story.upVote === true && '| unvote | '} </span>
                            <span className="story-hide" onClick={() => this.hideRowData(story.objectID)}> [ Hide ] </span>
                        </td>
                    </tr>
                )
            }
            )
        };

        return (<div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th className="header" colSpan="4">
                            <img width="20" height="20" src={require('./icon.png')} alt="icon" />
                            <span className="hacker"><a href="#"> Hacker News</a> </span>
                            <span className="new active"><a href="#new"> new </a></span>
                        </th>
                    </tr>
                </thead>


                <tbody>{story_listing}</tbody>

                {(this.page < this.state.total_page - 1) &&
                    <tfoot>
                        <tr>
                            <td colSpan={4}><p className="more" onClick={this.getDataFromApi}>More</p></td>
                        </tr>
                    </tfoot>
                }

            </table>
        </div>
        );

    }
}

export default TableComponent;