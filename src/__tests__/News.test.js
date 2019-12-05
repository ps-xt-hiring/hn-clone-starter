import Enzyme, { mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import News from '../components/News/index';
import NewsHeader from '../components/NewsHeader';

Enzyme.configure({ adapter: new Adapter() });

describe("News Component", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((stubInitialState = 0) => [stubInitialState, setState]);
  const parentincreaseVoteCount = jest.fn();
  parentincreaseVoteCount.mockReturnValue(1);
  const increaseVoteCount = jest.fn(() => parentincreaseVoteCount());
  let listingdata = [{
    "created_at": "2018-02-06T20:57:15.000Z",
    "title": "SpaceX’s Falcon Heavy successfully launches",
    "url": "https://techcrunch.com/2018/02/06/spacexs-historic-falcon-heavy-successfully-launches/?ncid=rss&utm_source=dlvr.it&utm_medium=twitter", "author": "mpweiher", "points": 2969, "story_text": null, "comment_text": null, "num_comments": 872, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1517950635, "relevancy_score": 7944, "_tags": ["story", "author_mpweiher", "story_16319505"], "objectID": "16319505", "_highlightResult": { "title": { "value": "SpaceX’s Falcon Heavy successfully launches", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://techcrunch.com/2018/02/06/spacexs-historic-falcon-heavy-successfully-launches/?ncid=rss&utm_source=dlvr.it&utm_medium=twitter", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "mpweiher", "matchLevel": "none", "matchedWords": [] } }
  }, { "created_at": "2018-10-15T22:00:14.000Z", "title": "Paul Allen has died", "url": "https://www.cnbc.com/2018/10/15/microsoft-co-founder-paul-allen-dies-of-cancer-at-age-65.html", "author": "coloneltcb", "points": 2901, "story_text": null, "comment_text": null, "num_comments": 277, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1539640814, "relevancy_score": 8428, "_tags": ["story", "author_coloneltcb", "story_18224227"], "objectID": "18224227", "_highlightResult": { "title": { "value": "Paul Allen has died", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://www.cnbc.com/2018/10/15/microsoft-co-founder-paul-allen-dies-of-cancer-at-age-65.html", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "coloneltcb", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2018-06-03T20:14:26.000Z", "title": "Microsoft Is Said to Have Agreed to Acquire GitHub", "url": "http://www.bloomberg.com/news/articles/2018-06-03/microsoft-is-said-to-have-agreed-to-acquire-coding-site-github?", "author": "miguelrochefort", "points": 2873, "story_text": null, "comment_text": null, "num_comments": 1437, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1528056866, "relevancy_score": 8159, "_tags": ["story", "author_miguelrochefort", "story_17221527"], "objectID": "17221527", "_highlightResult": { "title": { "value": "Microsoft Is Said to Have Agreed to Acquire GitHub", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "http://www.bloomberg.com/news/articles/2018-06-03/microsoft-is-said-to-have-agreed-to-acquire-coding-site-github?", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "miguelrochefort", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2019-01-07T17:03:59.000Z", "title": "Announcing unlimited free private repos", "url": "https://blog.github.com/2019-01-07-new-year-new-github/", "author": "razer6", "points": 2867, "story_text": null, "comment_text": null, "num_comments": 685, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1546880639, "relevancy_score": 8589, "_tags": ["story", "author_razer6", "story_18847043"], "objectID": "18847043", "_highlightResult": { "title": { "value": "Announcing unlimited free private repos", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://blog.github.com/2019-01-07-new-year-new-github/", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "razer6", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2019-11-20T23:13:09.000Z", "title": "Slack’s new WYSIWYG input box is terrible", "url": "https://quuxplusone.github.io/blog/2019/11/20/slack-rich-text-box/", "author": "ingve", "points": 2776, "story_text": null, "comment_text": null, "num_comments": 1076, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1574291589, "_tags": ["story", "author_ingve", "story_21589647"], "objectID": "21589647", "_highlightResult": { "title": { "value": "Slack’s new WYSIWYG input box is terrible", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://quuxplusone.github.io/blog/2019/11/20/slack-rich-text-box/", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "ingve", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2013-04-12T05:07:53.000Z", "title": "", "url": "", "author": "xijuan", "points": 2751, "story_text": "26 to 30", "comment_text": null, "num_comments": null, "story_id": null, "story_title": null, "story_url": null, "parent_id": 5536734, "created_at_i": 1365743273, "relevancy_score": 4557, "_tags": ["pollopt", "author_xijuan", "story_5536739"], "objectID": "5536739", "_highlightResult": { "title": { "value": "", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "xijuan", "matchLevel": "none", "matchedWords": [] }, "story_text": { "value": "26 to 30", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2011-05-29T01:13:53.000Z", "title": null, "url": null, "author": "pg", "points": 2743, "story_text": "I liked it better when comment scores were displayed.", "comment_text": null, "num_comments": null, "story_id": null, "story_title": null, "story_url": null, "parent_id": 2595605, "created_at_i": 1306631633, "relevancy_score": 3240, "_tags": ["pollopt", "author_pg", "story_2595606"], "objectID": "2595606", "_highlightResult": { "author": { "value": "pg", "matchLevel": "none", "matchedWords": [] }, "story_text": { "value": "I liked it better when comment scores were displayed.", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2012-04-02T07:03:58.000Z", "title": "", "url": "", "author": "kamechan", "points": 2738, "story_text": "Linux", "comment_text": null, "num_comments": null, "story_id": null, "story_title": null, "story_url": null, "parent_id": 3786674, "created_at_i": 1333350238, "relevancy_score": 3845, "_tags": ["pollopt", "author_kamechan", "story_3786677"], "objectID": "3786677", "_highlightResult": { "title": { "value": "", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "kamechan", "matchLevel": "none", "matchedWords": [] }, "story_text": { "value": "Linux", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2017-09-18T19:45:08.000Z", "title": "W3C abandons consensus, standardizes DRM, EFF resigns", "url": "https://boingboing.net/2017/09/18/antifeatures-for-all.html", "author": "guelo", "points": 2735, "story_text": null, "comment_text": null, "num_comments": 978, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1505763908, "relevancy_score": 7675, "_tags": ["story", "author_guelo", "story_15278883"], "objectID": "15278883", "_highlightResult": { "title": { "value": "W3C abandons consensus, standardizes DRM, EFF resigns", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://boingboing.net/2017/09/18/antifeatures-for-all.html", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "guelo", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2014-03-10T15:44:42.000Z", "title": "2048", "url": "http://gabrielecirulli.github.io/2048/", "author": "frederfred", "points": 2732, "story_text": "", "comment_text": null, "num_comments": 410, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1394466282, "relevancy_score": 5202, "_tags": ["story", "author_frederfred", "story_7373566"], "objectID": "7373566", "_highlightResult": { "title": { "value": "2048", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "http://gabrielecirulli.github.io/2048/", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "frederfred", "matchLevel": "none", "matchedWords": [] }, "story_text": { "value": "", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2017-03-07T13:10:56.000Z", "title": "CIA malware and hacking tools", "url": "https://wikileaks.org/ciav7p1/", "author": "randomname2", "points": 2699, "story_text": null, "comment_text": null, "num_comments": 1087, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1488892256, "relevancy_score": 7299, "_tags": ["story", "author_randomname2", "story_13810015"], "objectID": "13810015", "_highlightResult": { "title": { "value": "CIA malware and hacking tools", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://wikileaks.org/ciav7p1/", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "randomname2", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2019-03-14T20:25:03.000Z", "title": "Show HN: A retro video game console I've been working on in my free time", "url": "https://internalregister.github.io/2019/03/14/Homebrew-Console.html", "author": "pkiller", "points": 2690, "story_text": null, "comment_text": null, "num_comments": 210, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1552595103, "relevancy_score": 8710, "_tags": ["story", "author_pkiller", "story_19393279", "show_hn"], "objectID": "19393279", "_highlightResult": { "title": { "value": "Show HN: A retro video game console I've been working on in my free time", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "https://internalregister.github.io/2019/03/14/Homebrew-Console.html", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "pkiller", "matchLevel": "none", "matchedWords": [] } } }, { "created_at": "2013-08-22T17:10:57.000Z", "title": "Don't Fly During Ramadan", "url": "http://varnull.adityamukerjee.net/post/59021412512/dont-fly-during-ramadan", "author": "chimeracoder", "points": 2617, "story_text": "", "comment_text": null, "num_comments": 961, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1377191457, "relevancy_score": 4813, "_tags": ["story", "author_chimeracoder", "story_6258422"], "objectID": "6258422", "_highlightResult": { "title": { "value": "Don't Fly During Ramadan", "matchLevel": "none", "matchedWords": [] }, "url": { "value": "http://varnull.adityamukerjee.net/post/59021412512/dont-fly-during-ramadan", "matchLevel": "none", "matchedWords": [] }, "author": { "value": "chimeracoder", "matchLevel": "none", "matchedWords": [] }, "story_text": { "value": "", "matchLevel": "none", "matchedWords": [] } } }, {
    "created_at": "2018-10-28T17:57:59.000Z", "title": "IBM acquires Red Hat", "url": "https://www.redhat.com/en/blog/red-hat-ibm-creating-leading-hybrid-cloud-provider", "author": "nopriorarrests", "points": 2611, "story_text": null, "comment_text": null, "num_comments": 491, "story_id": null, "story_title": null, "story_url": null, "parent_id": null, "created_at_i": 1540749479, "relevancy_score": 8441,
    "_tags": ["story", "author_nopriorarrests", "story_18321884"],
    "objectID": "18321884",
    "_highlightResult": {
      "title": { "value": "IBM acquires Red Hat", "matchLevel": "none", "matchedWords": [] },
      "url": {
        "value": "https://www.redhat.com/en/blog/red-hat-ibm-creating-leading-hybrid-cloud-provider",
        "matchLevel": "none", "matchedWords": []
      },
      "author": { "value": "nopriorarrests", "matchLevel": "none", "matchedWords": [] }
    }
  }
  ];
  
  beforeEach(() => {
    wrapper = mount(<BrowserRouter><News getNews={() => []}
      increaseVoteCount={increaseVoteCount}
      page={1}
      sortBy={2}
      sortNews={jest.fn()}
      loading={false}
      newsListingData={listingdata}
    /></BrowserRouter>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("Testing Load More News", () => {

    wrapper.find("#loadMoreItems").first().simulate("click");
    expect(setState).toHaveBeenCalledWith(2);
  });

  it("Testing News Header", () => {
    expect(wrapper.find(NewsHeader)).toHaveLength(1);
  });

  it("Testing Vote Up", () => {
    wrapper.find(".newList__voteUp").first().simulate("click");
    expect(increaseVoteCount).toBeCalled();
    expect(increaseVoteCount.mock.results[0].value).toBe(1);
  });
});