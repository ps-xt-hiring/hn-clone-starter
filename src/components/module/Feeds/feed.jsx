import React from 'react';

export const Feeds = props => (
  <table className="table table-striped">
    <tbody>
      {
       props.feeds.map((item, index) => (
         <tr key={index}>
           <td>{item.num_comments}</td>
           <td><span className="glyphicon glyphicon-triangle-top" /></td>
           <td>{item.title}</td>
           <td className="text-style">
             <span>
               {item.url}
               {' '}
               <span>by</span>
               {' '}
               { item.author }
               {' '}
               <span>at</span>
               {' '}
               { item.created_at }
             </span>
           </td>
         </tr>
       ))
      }
    </tbody>
  </table>
);
