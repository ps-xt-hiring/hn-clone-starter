
import React from 'react';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FeedItem from '../feedItem/FeedItem';
import Feed from './Feeds';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);
configure({ adapter: new Adapter() });
import { Provider } from 'react-redux';

describe("check if feed renders",()=>{
    let mockFeed = {
        "hits": [{
            "created_at": "2020-02-18T22:53:52.000Z",
            "title": "Larry Tesler Has Died",
            "url": null,
            "author": "drallison",
            "points": 965,
            "story_text": "Larry Tesler has died.  Larry was in the middle of many of the most influential of Silicon Valley projects and an insightful contributor.  See his Wikipedia biography for a snapshot.  \u003ca href=\"https:\u0026#x2F;\u0026#x2F;en.wikipedia.org\u0026#x2F;wiki\u0026#x2F;Larry_Tesler\" rel=\"nofollow\"\u003ehttps:\u0026#x2F;\u0026#x2F;en.wikipedia.org\u0026#x2F;wiki\u0026#x2F;Larry_Tesler\u003c/a\u003e",
            "comment_text": null,
            "num_comments": 85,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1582066432,
            "_tags": ["story", "author_drallison", "story_22361282", "front_page"],
            "objectID": "22361282",
            "_highlightResult": {
                "title": {
                    "value": "Larry Tesler Has Died",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "author": {
                    "value": "drallison",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "story_text": {
                    "value": "Larry Tesler has died.  Larry was in the middle of many of the most influential of Silicon Valley projects and an insightful contributor.  See his Wikipedia biography for a snapshot.  \u003ca href=\"https://en.wikipedia.org/wiki/Larry_Tesler\" rel=\"nofollow\"\u003ehttps://en.wikipedia.org/wiki/Larry_Tesler\u003c/a\u003e",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }, {
            "created_at": "2020-02-18T16:49:46.000Z",
            "title": "Computer vision basics in Excel, using just formulas",
            "url": "https://github.com/amzn/computer-vision-basics-in-microsoft-excel",
            "author": "alok-g",
            "points": 640,
            "story_text": null,
            "comment_text": null,
            "num_comments": 83,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1582044586,
            "_tags": ["story", "author_alok-g", "story_22357374", "front_page"],
            "objectID": "22357374",
            "_highlightResult": {
                "title": {
                    "value": "Computer vision basics in Excel, using just formulas",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "url": {
                    "value": "https://github.com/amzn/computer-vision-basics-in-microsoft-excel",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "author": {
                    "value": "alok-g",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }, {
            "created_at": "2020-02-19T18:17:53.000Z",
            "title": "Explorabl.es",
            "url": "https://explorabl.es",
            "author": "rickdeveloper",
            "points": 562,
            "story_text": null,
            "comment_text": null,
            "num_comments": 26,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1582136273,
            "_tags": ["story", "author_rickdeveloper", "story_22368323", "front_page"],
            "objectID": "22368323",
            "_highlightResult": {
                "title": {
                    "value": "Explorabl.es",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "url": {
                    "value": "https://explorabl.es",
                    "matchLevel": "none",
                    "matchedWords": []
                },
                "author": {
                    "value": "rickdeveloper",
                    "matchLevel": "none",
                    "matchedWords": []
                }
            }
        }],
        "nbHits": 30,
        "page": 0,
        "nbPages": 2,
        "hitsPerPage": 20,
        "exhaustiveNbHits": true,
        "query": "",
        "params": "advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026page=0\u0026tags=front_page",
        "processingTimeMS": 2
    }
    it('renders <Feed /> components', () => {
        let store  = mockStore({});
        const wrapper = shallow(
            <Provider store={store}>
             
                <Feed  loadMore={jest.fn()} hasMore={true}>
                <FeedItem 
                    key={mockFeed.hits[0].objectID}
                    feedItem={mockFeed.hits[0]}
                    order={0}
                    hideFeedItem={jest.fn()}
                    upvoteFeedItem={jest.fn()}
                    isUpvoted={'\u25B2'}/>
                <FeedItem 
                    key={mockFeed.hits[1].objectID}
                    feedItem={mockFeed.hits[1]}
                    order={0}
                    hideFeedItem={jest.fn()}
                    upvoteFeedItem={jest.fn()}
                    isUpvoted={'\u25B2'}/>
                </Feed>
             
            </Provider>);
        
        expect(wrapper.find(Feed)).toHaveLength(1);
        expect(wrapper.find(FeedItem)).toHaveLength(2);
      });
     
});