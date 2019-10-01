import React from 'react';
import { Table } from 'react-bootstrap';
import InfoRow from './InfoRow';
import ApiService from '../services/ApiService';
import LocalStorage from '../services/LocalStorage';
import { API_URL } from '../constants';

export default class InfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 1,
            data: []
        }
    }

    loadData = async () => {

        let apiUrl = `${API_URL}?page=${this.state.pageNo}`;
        const [err, rslt] = await new ApiService().get(apiUrl);
        if (!err) {
            let localStorageObj = LocalStorage.get("upvotes") || {};
            localStorageObj = JSON.parse(localStorageObj);
            rslt.hits.map((data, i) => {
                if (localStorageObj[data.objectID]) {
                    localStorageObj[data.objectID] = localStorageObj[data.objectID] + 1;
                } else {
                    localStorageObj[data.objectID] = 0
                }
                rslt.hits[i].upvote = localStorageObj[data.objectID];
            })
            LocalStorage.save("upvotes", JSON.stringify(localStorageObj))
            this.setState({
                data: this.state.data.concat(rslt.hits)
            })
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    updatePage = () => {
        this.setState({
            pageNo: this.state.pageNo
        })
    }

    updateComment = (objId, i) => {

        let localStorageObj = LocalStorage.get("upvotes") || {};
        localStorageObj = JSON.parse(localStorageObj);

        const { data } = this.state;

        localStorageObj[objId] = parseInt(localStorageObj[objId]) + 1;

        LocalStorage.save("upvotes", JSON.stringify(localStorageObj))
        data[i].upvote = localStorageObj[objId];
        this.setState({
            data
        })
    }

    render() {
        return (
            <Table responsive>
                <tbody>
                    <InfoRow data={this.state.data} upvote={this.updateComment} />
                </tbody>
                <button onClick={async () => {
                    await this.setState({
                        pageNo: (this.state.pageNo + 1)
                    })
                    this.loadData();
                }}> More</button>
            </Table>
        )
    }
}