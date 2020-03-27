import styled from 'styled-components';

const colors = {
  titleNComment: '#111111',
  vote: '#AA4B04',
  textOrange: '#FD8228',
  domainNPostedAt: '#888382',
  dullBrown: '#BEBBB8',
  authorNHide: '#111111',
  activeNav: '#FEFFFF',
};

const HeaderSection = styled.header`
    background-color: #FF6600;
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    padding: 5px;
    z-index: 2;
    nav {
        padding: 0 10px;
        color: ${colors.titleNComment};
    }
    nav span:nth-child(1) {
        border-left: none;
    }
    nav span.active {
        color: ${colors.activeNav};
    }
    nav span {
        padding: 0 10px;
        border-left: 2px solid #000000;
    }
`;

const Logo = styled.img`
    border: 1px solid #FFFFFF;
`;

const ListWraper = styled.ul`
    list-style: none;
    padding: 0;
    .loader {
        color: ${colors.textOrange};
    }
    .paginationWrapper {
        padding: 0 10px;
    }
    .paginationWrapper > div {
        margin: 0 10px;
        display: inline-block;
    }
    .paginationWrapper > div.left {
        width: 13%;
    }
    @media (max-width: 600px) {
        .paginationWrapper > div.left {
            width: 25%;
        }
    }
    @media (max-width: 320px) {
        .paginationWrapper > div.left {
            width: 30%;
        }
    }
`;
const LoadMoreBtn = styled.span`
    cursor: pointer;
    color: ${colors.textOrange};
`;

const Article = styled.article`
    display: flex;
    padding: 0 10px;
    & > div {
        margin: 0 10px;
        display: inline-flex;
    }
    & > div.metaInfo {
        flex-basis: 13%;
        justify-content: space-between;
    }
    & > div.mainInfo {
        flex-wrap: wrap;
        flex-basis: 80%;
    }
    @media (max-width: 600px) {
        & > div.metaInfo {
            flex-basis: 25%;
        }
        & > div.mainInfo {
            flex-basis: 70%;
        }
    }
    @media (max-width: 320px) {
        & > div.metaInfo {
            flex-basis: 30%;
        }
        & > div.mainInfo {
            flex-basis: 65%;
        }
    }
`;

const CommentCount = styled.span`
    color: ${colors.titleNComment};
`;
const VotesWrapper = styled.span`
    position: relative;
`;
const Votes = styled.span`
    margin: 0 5px;
    color: ${colors.vote};
`;
const UpVoteBtn = styled.span`
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 8px solid #999999;
    width: 0;
    height: 0;
    cursor: pointer;
    display: inline-block;
`;
const Title = styled.a`
    color: ${colors.titleNComment};
`;
const Domain = styled.a`
    margin: 0 0 0 5px;
    color: ${colors.domainNPostedAt};
`;
const Author = styled.span`
    color: ${colors.dullBrown};
    margin-left: 5px;
    & > span {
        color: ${colors.authorNHide};
    }
`;
const Duration = styled.span`
    color: ${colors.domainNPostedAt};
    margin: 0 0 0 5px;
`;
const HideBtnWrapper = styled.span`
    margin: 0 0 0 5px;
    color: ${colors.domainNPostedAt};
    cursor: pointer;
`;
const HideBtn = styled.span`
    color: ${colors.authorNHide};
`;

export {
  HeaderSection,
  Logo,
  CommentCount,
  Votes,
  UpVoteBtn,
  Title,
  Author,
  Domain,
  Duration,
  HideBtnWrapper,
  HideBtn,
  ListWraper,
  LoadMoreBtn,
  VotesWrapper,
  Article,
};
