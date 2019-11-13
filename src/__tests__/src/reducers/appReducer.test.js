import appReducer from '../../../reducers/appReducer';
import ActionTypes from '../../../constants/action-types';
import initialState from '../../../store/initialState';

describe('Test appReducer', () => {
    it('should return initial state', () => {
        const newState = appReducer();
        expect(newState).toEqual(initialState);
    });

    it('should test GET_FEED action', () => {
        const pageNum = 1;
        const newState = appReducer(initialState, {
            type: ActionTypes.GET_FEED,
            value: pageNum
        });
        expect(newState.isLoading).toEqual(true);
        expect(newState.pageNum).toEqual(2);
    });

    it('should test GET_FEED_SUCCESS action', () => {
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
        const newState = appReducer(initialState, {
            type: ActionTypes.GET_FEED_SUCCESS,
            value: success.data.hits
        });
        expect(newState.feeds).toEqual(success.data.hits);
    });

    it('should test GET_FEED_FAILURE action', () => {
        const error = {
            code: 500,
            errorMessage: 'Feed request failed.'
        };
        const newState = appReducer(initialState, {
            type: ActionTypes.GET_FEED_FAILURE,
            error 
        });
        expect(newState.error).toEqual(error);
    })
});