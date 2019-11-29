export async function getStories() { 
    
        const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?page=${this.page}`);
        var stories = await response.json();
        return stories;
}