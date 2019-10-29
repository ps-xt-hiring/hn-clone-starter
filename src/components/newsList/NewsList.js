import React, {Component} from 'react';
import './newslist.css';

class NewsList extends Component {
  
    render(){
        return (
            <section className="list-container">
             Page- {this.props.page}
            <div className="row no-margin">
              <div className="col-2">
                <div className="row no-margin">
                  <div className="col-2 offset-md-3 total-comments">4</div>
                  <div className="col text-left offset-md-2 total-votes">4.<span className="up-arrow"></span></div>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="title">
                    <a href="/">50 years ago, I helped invent the internet. How did it go so wrong</a>
                    </div>
                  <div className="newsUrl">(<a href="/" className="url">example.com</a>)</div>
                  <div className="author">
                    by <span>saurav</span> 5 hours ago [<span>hide</span>]
                  </div>
                  </div>
              </div>
            </div>

            <div className="row no-margin list-loader">
              <div className="col offset-md-2">
                <div className="row">
                  <div className="title">More</div>
                  </div>
              </div>
            </div>

          </section>  
        )
    }

}

export default NewsList;