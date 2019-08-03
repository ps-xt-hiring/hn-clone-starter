import { setStorage, getStorage } from './storage'

export function filterListItems(feedData = []) {
    const storageData = getStorage("hidePost");
    return feedData.filter(item => !storageData[item.objectID]);
}

export function useLocalUpvotes(feedData = []) {
    const tempArray = [...feedData];
    const storageData = getStorage("upvote");
    tempArray.forEach((item, index) => {
        if (storageData[item.objectID]) {
            tempArray[index].points = storageData[item.objectID];
            tempArray[index].voted = true;
        }
    });
    return tempArray;
}

export function upvote(objectID = "", points = 0, feedData = []) {
    setStorage({ storageKey: "upvote", objectID, value: points + 1 });
    return useLocalUpvotes(feedData);
}