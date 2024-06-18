import { useParams } from "react-router-dom"
import { fetchAllArticlesWithQuery } from "../api"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
function Topic() {
    const { topic_name } = useParams()
    const capitalised_topic_name = topic_name[0].toUpperCase() + topic_name.slice(1)

    let topic_name_with_emoji
    if(topic_name === "football") {
        topic_name_with_emoji = capitalised_topic_name + " ⚽"
    } else if (topic_name === "cooking") {
        topic_name_with_emoji = capitalised_topic_name + " 🍰"
    } else if (topic_name === "coding") {
        topic_name_with_emoji = capitalised_topic_name + " 🖥️"
    }

    const [articles, setArticles] = useState("")

    useEffect(() => {
        fetchAllArticlesWithQuery(topic_name).then((data)=> {
        const articlesHtml = data.map((article)=> {
                return (<Link to={`/articles/${article.article_id}`}><Card key={article.article_id} className="articleCard">
                        <Card.Body>
                      <Card.Title className="topicText">
                        {article.title}
                      </Card.Title>
                      <Card.Img className="articleImage"
                variant="top"
                src={article.article_img_url}
              />
                 <Card.Text className="topicText">
                By {article.author}
             </Card.Text>
                      </Card.Body>
                  </Card></Link>)
            })
            setArticles(articlesHtml)
        })
    }, [])
    

   return <div key={topic_name_with_emoji} className="topics">
   <br></br>
   <h1>{topic_name_with_emoji}</h1>
   <br></br>
   <div className="AllArticlesContainer">{articles}</div>
   <br></br>
   <br></br>

</div>
}

export default Topic