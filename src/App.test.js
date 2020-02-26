import React from 'react';
import ReactDOM from 'react-dom';
import { configure,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);
import { Provider } from 'react-redux';
import App from './App';
import Header from './components/header/Header';
import Feed from './components/feeds/Feeds';
describe("Check if App loads",()=>{
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = shallow(
    <Provider store={store}>
    <App />
    </Provider>);
    expect(wrapper.find(App)).toHaveLength(1);
  });
  it('renders <App /> components', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App>
          <Header  sortType="top" setSortType={jest.fn()}/>
          <Feed  loadMore={jest.fn()} hasMore={true} />
        </App>
      </Provider>);
    //console.log(wrapper.debug());
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Feed)).toHaveLength(1);
  });

 
});

