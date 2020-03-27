
import React,{useState} from 'react';

const Pagination = ({updateIndex,interval,showList=true,alignment="center"}) => {

const [pageIndex,setPageIndex] = useState(1);
const navigatePage = (event,type) =>{
    event.preventDefault();
    let curPageIndex=pageIndex;
    if(type==="previous"){
      if(curPageIndex!==1){
        curPageIndex=curPageIndex-1;
      }else{
        curPageIndex=1;
      }
    }
    else if(type==="next"){
      curPageIndex=curPageIndex+1
    }
    else{
      curPageIndex=type;
    }
    updateIndex(curPageIndex)
    setPageIndex(curPageIndex)
  }
  const getpaginationList=(pageIndex,interval)=>{
    var pageList=[],minIndex,maxIndex;
    if(pageIndex>interval+1){
      minIndex=pageIndex-interval
      maxIndex=pageIndex+interval
    }else{
      minIndex=1;
      maxIndex=(interval*2)+1;
    }
    for(var i=minIndex;i<=maxIndex;i++){
      pageList.push(i);
    }
    return pageList;
  }

return (
<nav aria-label="Page navigation example">
  <ul className={`pagination ${(!showList && alignment!=="center")?"justify-content-between":"justify-content-center"}`}>
    <li className={"page-item "+(pageIndex>1?"":"disabled")} key="idea-page-prev">
      <a className="page-link" href="#" tabIndex="-1" onClick={(e)=>{navigatePage(e,'previous')}}>Previous</a>
    </li>
    {showList?getpaginationList(pageIndex,interval).map(paginationIndex=>{
        return(<li className={"page-item "+(pageIndex===paginationIndex?"active":"")} key={"idea-page-"+paginationIndex}><a className="page-link" href="#" onClick={(e)=>{navigatePage(e,paginationIndex)}}>{paginationIndex}</a></li>)
    }):null}
    <li className="page-item" key="idea-page-next">
      <a className="page-link" href="#" onClick={(e)=>{navigatePage(e,'next')}}>Next</a>
    </li>
  </ul>
</nav>
)  
};

export default Pagination;