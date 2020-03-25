import React, { Component } from 'react';
import _ from 'underscore'

class ResponsiveTable extends Component {
    render() {
        const head = () =>{
            var columns = _.map(this.props.columns, function(colName) {
                return (
                  <th>{colName}</th>
                );
              });
              return (
                <tr>{columns}</tr>
              );
        }
        const body = () => {
            var _this = this;
            return _.map(_this.props.rows, function(row) {
                var values = _.map(_this.props.columns, function(colName, colKey) {
                return (
                    <td data-label={colName}>{row[colKey]}</td>
                );
                })
                return (
                <tr>{values}</tr>
                );
            })
        }

        return (
            <table className="responsive-table">
                <thead>
                    {head()}
                </thead>
                <tbody>
                    {body()}
                </tbody>
            </table>
        );
    }
}

export default ResponsiveTable;
