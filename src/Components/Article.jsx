import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { fetchArticle, fetchCommentsForArticle, patchArticleVotes } from "../api"

function Article(){
    const { article_id} = useParams()

    const [article, setArticle] = useState("")
    const [comments, setComments] = useState("")
    const [articleVotes, setArticleVotes] = useState("")
    const [haveMadeVote, setHaveMadeVote] = useState(false)

    function onVote(event) {
        const comment_id = (event.target.value)[0]
        const votesl = (event.target.value)[1] + 1
        
    }

    useEffect(() => {
        fetchArticle(article_id).then((articledata) => {
            setArticle(articledata)
            setArticleVotes(articledata.votes)
        })

        fetchCommentsForArticle(article_id).then((data) => {  
              const commentHTML = data.map((comment)=> {
                return (<div key={comment.comment_id}>
                <Card key={comment.comment_id}className="commentCard">
                    <Card.Body>
               <Card.Text className="commentText">
                 {comment.body}
           </Card.Text>
           <Card.Text className="commentText">
                 By {comment.author}
           </Card.Text>
                    </Card.Body>
                </Card>
                <button value={[comment.comment_id, comment.votes]}onClick={onVote}>👍 {comment.votes}</button>
                </div>
            )
            })
            setComments(commentHTML)
        })

    }, [article_id])

    function upVoteArticle() {
         setArticleVotes(articleVotes + 1)
        patchArticleVotes(article_id, 1).then(()=> {
            setHaveMadeVote(true)
        }).catch(async ()=> {
             setArticleVotes(articleVotes)
            alert("Network Error, try again")
        })
    }

    function downVoteArticle() {
        setArticleVotes(articleVotes - 1)
        patchArticleVotes(article_id, -1).then(()=> {
            setHaveMadeVote(true)
        }).catch(()=> {
            setArticleVotes(articleVotes)
            alert("Network Error, try again")
        })
    }

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
        <h2>Votes : {articleVotes}</h2>
        <h2>Created At: {article.created_at}</h2>
        {
        haveMadeVote === true ? (<label className="voted">You have cast your vote</label>) : (<div>
        <button onClick={upVoteArticle}>👍</button>
        <button onClick={downVoteArticle}>👎</button></div>)}
        <br></br>
        <h2>Comments</h2>
       {comments} 
    </div>
}

export default Article