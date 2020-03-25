import styled from "styled-components"

const HeaderSection = styled.header`
    background-color: #FF6600;
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    padding: 5px;
`;

const Logo = styled.img`
    border: 1px solid #FFFFFF;
`;


const CommentCount = styled.span``
const Votes = styled.span``
const Title = styled.a``
const Domain = styled.a``
const Author = styled.span``
const Duration = styled.span``
const HideBtn = styled.span`
    cursor: pointer;
`;

export {
    HeaderSection,
    Logo,
    CommentCount,
    Votes,
    Title,
    Author,
    Domain,
    Duration,
    HideBtn,
}