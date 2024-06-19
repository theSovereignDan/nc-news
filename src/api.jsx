import axios from "axios";

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

export function fetchAllArticles(sort_by, order, topic) {

    let query = '';

    let url = `https://myncnewsproject.onrender.com/api/articles`
    if (topic) {
        url += `?topic=${topic}`
    }

    if (sort_by !== "none") {
        if (!topic) {
            url += "?"
        }

        if (topic) {
            url += "&"
        }
        query += `sort_by=${sort_by}`;
    }

    if (order !== "none") {
        const changedOrder = order === "⬆️" ? "ASC" : "DESC" 
        if (query) query += '&';
        query += `order=${changedOrder}`;
    }

     url += `${query ? query : ''}`;
    
    return axios.get(url).then(({ data }) => {
        return data;
    });
}

