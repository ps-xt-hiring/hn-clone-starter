import {css} from 'styled-components';
import * as theme from '../styles/variables.style';

const styles = css`
   
    width: 80%;
    padding: 20px;
    font-size: ${theme.FONT_SIZE_12};

    ul{
        list-style: none;
        li {
            background: ${theme.LIST_BG}; 
            padding: 5px 0;
            display: flex
        }
        li:nth-child(even) { 
            background: ${theme.LIST_ALT_BG}; 
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
            color: ${theme.TEXT_BLACK};
        }
        .medium {
            color: ${theme.TEXT_BROWN};
        }
        .high {
            color: ${theme.TEXT_RED};
        }
        .domain, 
        .author, 
        .created, 
        .btn-hide,
        .label-by {
            font-size: ${theme.FONT_SIZE_11};
        }
        .domain,
        .created,
        .label-by {
            color: ${theme.TEXT_LIGHTGREY};
        }
    }
    button {
        background-color: transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
        color: ${theme.TEXT_RED};
    }
    
`
export default styles;