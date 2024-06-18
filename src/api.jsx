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