import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { deleteComment, fetchArticle, fetchCommentsForArticle, patchArticleVotes, postAComment } from "../api"

function Article(){
    const { article_id} = useParams()
    const [article, setArticle] = useState("")
    const [comments, setComments] = useState("")
    const [articleVotes, setArticleVotes] = useState("")
    const [haveMadeVote, setHaveMadeVote] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [hasBeenDeleted, setHasBeenDeleted] = useState(false)
    const [invalidArticle, setInvalidArticle] = useState("none")

    const {user} = useContext(UserContext)


    function onbinClick(event) {
        event.preventDefault()

        const comment_id = event.target.value

        deleteComment(comment_id).then((data)=> {
            setHasBeenDeleted(!hasBeenDeleted)
            setTimeout(() => {
                alert("Your comment has been deleted!")
            }, 500)

        }).catch(()=> {
            alert("Network Error, try again")
        })
    }


    function onVote(event) {
        const comment_id = (event.target.value)[0]
        const votesl = (event.target.value)[1] + 1
        
    }

    useEffect(() => {
        fetchArticle(article_id).then((articledata) => {
            setArticle(articledata)
            setArticleVotes(articledata.votes)
        }).catch(()=> {
            setInvalidArticle(true)
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
                <button value={[comment.comment_id, comment.votes]}onClick={onVote}>👍 {comment.votes}</button>{user === comment.author ? <button value={comment.comment_id} onClick={onbinClick}className="binButton"><span className="bin">🗑️</span></button> : null}
                </div>
            )
            })
            setComments(commentHTML)
        })

    }, [article_id, hasBeenDeleted])

    function upVoteArticle() {
        if(user) {
         setArticleVotes(articleVotes + 1)
        patchArticleVotes(article_id, 1).then(()=> {
            setHaveMadeVote(true)
        }).catch(async ()=> {
             setArticleVotes(articleVotes)
            alert("Network Error, try again")
        })
    } else {
        alert("Please log in to upvote the article")
    }
    }

    function downVoteArticle() {
        if (user) {
        setArticleVotes(articleVotes - 1)
        patchArticleVotes(article_id, -1).then(()=> {
            setHaveMadeVote(true)
        }).catch(()=> {
            setArticleVotes(articleVotes)
            alert("Network Error, try again")
        })
        } else {
        alert("Please log in to downvote the article")
        }
    }

    function newCommentInputChange(event) {
        setNewComment(event.target.value)
    }

    function submitComment(event) {
        event.preventDefault()

        if(user) {
        postAComment(article_id, user, newComment).then((data)=> {
        
            const comment_id = data[0].comment_id
            
            const localComment = (
                <div key={comment_id}>
                <Card  key={comment_id} className="commentCard">
                <Card.Body>
           <Card.Text className="commentText">
             {newComment}
        </Card.Text>
        <Card.Text className="commentText">
             By {user}
        </Card.Text>
                </Card.Body>
            </Card>
            <button onClick={onVote}>👍 {0}</button>
            <button value ={comment_id}onClick={onbinClick}className="binButton"><span className="bin">🗑️</span></button>
            </div>
            )

            setComments([localComment, ...comments])

        })
        } else {
            alert("Please log in to make a comment")
        }

        setNewComment("")
    }

    if (invalidArticle !== "none") {

        return <div key="invalidarticle" className="articles">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

       <h1>No such Article...</h1>
        <div className="invalidArticleContainer">
             <Link to="/"><button className="articleButton">Click to see articles to choose from</button></Link>
        </div>
        <br></br>
        <br></br>
        </div>

    } else {

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
        <button onClick={downVoteArticle}>👎</button></div>)
        }
        <br></br>
        <h2>Comments</h2>
        <br></br>
        <form>
            <label className="postCommentTxt">Post a comment</label><br></br>
            <input onChange={newCommentInputChange} className="postCommentInputBox" value={newComment} />
            <button onClick={submitComment}>Post</button>
        </form>
        <br></br>
       {comments} 
    </div>
    }
}

export default Article