import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"

function Article(){
    const { article_id} = useParams()

    const [article, setArticle] = useState("")
    const [comments, setComments] = useState("")

    useEffect(() => {
        axios.get(`https://myncnewsproject.onrender.com/api/articles/${article_id}`).then(({data})=> {
            setArticle(data)
        })
        axios.get(`https://myncnewsproject.onrender.com/api/articles/${article_id}/comments`).then(({data})=> {
            const commentHTML = data.map((comment)=> {
                return (<Card className="commentCard">
                    <Card.Body>
               <Card.Text className="commentText">
                 {comment.body}
           </Card.Text>
                    </Card.Body>
                </Card>)
            })
            setComments(commentHTML)
        })

    }, [article_id])

    return <div className="article">
        <br></br>
        <br></br>
        <h1>{article.title}</h1>
        <br></br>
        <img className="imageforarticle" src={article.article_img_url}/>
        <br></br>
        <h2>By {article.author}</h2>
        <br></br>
        <h2>{article.body}</h2>
        <br></br>
        <h2>Topic {article.topic}</h2>
        <h2>Votes : {article.votes}</h2>
        <h2>Created At: {article.created_at}</h2>
        <br></br>
        <h2>Comments</h2>
       {comments} 
    </div>
}

export default Article