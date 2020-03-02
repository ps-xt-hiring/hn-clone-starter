import {css} from 'styled-components';

const styles = css`
   
    width: 80%;
    padding: 20px;
    font-size: 12px;

    ul{
        list-style: none;
        li {
            background: #f8f8f4; 
            padding: 5px 0;
            display: flex
        }
        li:nth-child(even) { 
            background: #ececdf; 
        }
        span {
            margin-right: 5px;
        }
        .num-comments {
            width: 50px;
            display: inline-block;
            text-align: right;
            margin-right: 30px;
        }
        .low {
            color: black;
        }
        .medium {
            color: brown
        }
        .high {
            color: red;
        }
        .domain, 
        .author, 
        .created, 
        .btn-hide,
        .label-by {
            font-size: 11px;
        }
        .domain,
        .created,
        .label-by {
            color: #828282
        }
    }
    button {
        background-color: transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        color:red;
    }
    
`
export default styles;