import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

import ActionTypes from '../../../constants';
import initialState from '../../../store/initialState';
import getFeeds from '../../../actions/feed-actions';

const middlewares = [thunk];

fetchMock.config.overwriteRoutes = true;

const createStore = configureMockStore(middlewares)
const store = createStore(initialState)

describe('Feed Actions', () => {
    describe('getFeeds action', () => {
        const SUT = getFeeds;
        const success = {
            data: {
                "hits": [
                  {
                    "created_at": "2018-02-06T20:57:15.000Z",
                    "title": "SpaceX’s Falcon Heavy successfully launches",
                    "url": "https://techcrunch.com/2018/02/06/spacexs-historic-falcon-heavy-successfully-launches/?ncid=rss\u0026utm_source=dlvr.it\u0026utm_medium=twitter",
                    "author": "mpweiher",
                    "points": 2968,
                    "story_text": null,
                    "comment_text": null,
                    "num_comments": 872,
                    "story_id": null,
                    "story_title": null,
                    "story_url": null,
                    "parent_id": null,
                    "created_at_i": 1517950635,
                    "relevancy_score": 7944,
                    "_tags": [
                      "story",
                      "author_mpweiher",
                      "story_16319505"
                    ],
                    "objectID": "16319505",
                    "_highlightResult": {
                      "title": {
                        "value": "SpaceX’s Falcon Heavy successfully launches",
                        "matchLevel": "none",
                        "matchedWords": [
                          
                        ]
                      },
                      "url": {
                        "value": "https://techcrunch.com/2018/02/06/spacexs-historic-falcon-heavy-successfully-launches/?ncid=rss\u0026utm_source=dlvr.it\u0026utm_medium=twitter",
                        "matchLevel": "none",
                        "matchedWords": [
                          
                        ]
                      },
                      "author": {
                        "value": "mpweiher",
                        "matchLevel": "none",
                        "matchedWords": [
                          
                        ]
                      }
                    }
                  }
                ],
                "nbHits": 19902667,
                "page": 1,
                "nbPages": 50,
                "hitsPerPage": 20,
                "exhaustiveNbHits": true,
                "query": "",
                "params": "advancedSyntax=true\u0026analytics=true\u0026analyticsTags=backend\u0026page=1",
                "processingTimeMS": 6
              }
        };

        beforeEach(() => {
            jest.clearAllMocks();
        })

        const expectedActions1 = [
            { type: ActionTypes.GET_FEED, value: 1},
            { type: ActionTypes.GET_FEED_SUCCESS, value: success.data.hits}
        ];

        it('should dispatch GET_FEED, GET_FEED_SUCCESS', () => {
          fetchMock.get('https://hn.algolia.com/api/v1/search?page=1',
          { body: { data: success }})

          store.dispatch(SUT()).then(() => {
              const actions = store.getActions();

              expect(actions).toEqual(expectedActions1);
          }).catch(e => expect(e).toMatch('error'));
        });

        it('should dispatch GET_FEED, GET_FEED_FAILURE', () => {
          const errorResponse = {
            "error": "Request failed with status code 400",
            "type": "GET_FEED_FAILURE",
          };

          const expectedActions2 = [
            { type: ActionTypes.GET_FEED_FAILURE, error: 'error'}
          ];

          fetchMock.get('https://hn.algolia.com/api/v1/search?page=1',
                { body: { error: 'error' }})

          store.dispatch(SUT({})).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions2);
          }).catch(e => expect(e).toMatch('error'));
        });
    });
});