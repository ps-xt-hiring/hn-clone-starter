import React from 'react';

export default class ListHeader extends React.Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            active:'top'
        };  

        this.toggleView = this.toggleView.bind(this);
    }

    toggleView(view) {
        this.setState({
            active: view
        });

        this.props.onViewChange(view);
    }

    render() {
        const {active} = this.state;

        return <div className="list-header">
            <img src="https://news.ycombinator.com/y18.gif" className="y-logo" alt="Y-Combinator Logo"></img>
            <div className="view-options">
                <span className={"view-option " + (active === 'top' ? 'active' : '') } onClick={ ()=> this.toggleView('top')} >top</span>
                <span> | </span>
                <span className={"view-option "+ (active === 'new' ? 'active' : '') } onClick={() => this.toggleView('new') }>new</span>
            </div>
        </div>
    }
}