import axios from "axios";
export function fetchAllArticles() {
    return axios.get("https://myncnewsproject.onrender.com/api/articles").then(({data})=> {
        return data
    })
}

export function fetchArticle(article_id) {
    return axios.get(`https://myncnewsproject.onrender.com/api/articles/${article_id}`).then(({data})=> {
        return data
    })
}

export function fetchCommentsForArticle(article_id) {
    return axios.get(`https://myncnewsproject.onrender.com/api/articles/${article_id}/comments`).then(({data})=> {
        return data
    })
}

export function patchArticleVotes(article_id, inc_votes) {
     return axios.patch(`https://myncnewsproject.onrender.com/api/articles/${article_id}`, { inc_votes }).then(({data})=> {
        return data
    }).catch(() => {
        return Promise.reject()
    })
}

export function fetchAllUsers() {
    return axios.get(`https://myncnewsproject.onrender.com/api/users`).then(({data})=> {
        return data
    })
}



export function postAComment(article_id, username, comment) {
    
    return axios.post(`https://myncnewsproject.onrender.com/api/articles/${article_id}/comments`, { username: username,
        body: comment
}).then(({data})=> {
        return data
    })
}

export function deleteComment(comment_id) {
    
    return axios.delete(`https://myncnewsproject.onrender.com/api/comments/${comment_id}`).then(({data})=> {
        return data
    })
}

export function fetchAllTopics() {
    return axios.get(`https://myncnewsproject.onrender.com/api/topics`).then((response)=> {
        const topics = response.data
        return topics
    })
}

export function fetchAllArticlesWithQuery(topic_name) {
    return axios.get(`https://myncnewsproject.onrender.com/api/articles?topic=${topic_name}`).then(({data})=> {
        return data
    })
}
