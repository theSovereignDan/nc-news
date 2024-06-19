import { useEffect } from "react"
import { fetchAllTopics } from "../api"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"

function Topics() {            
    const [topics, setTopics] = useState("")

    fetchAllTopics().then((topics)=> {
        const topicsHTML = topics.map((topic)=> {
            return (<Link key={topic.slug} to={`/topics/${topic.slug}`}><Card key={topic.slug} className="topicCard">
                    <Card.Body>
                  <Card.Title className="topicText">
                    {topic.slug}
                  </Card.Title>
                  {<Card.Img className="topicImage"
            variant="top"
            src={topic.imageURL}
          />}
             <Card.Text className="topicText">
             {topic.description}
         </Card.Text>
                  </Card.Body>
              </Card></Link>)
        })
        setTopics(topicsHTML)
    })

    return <div key="madness" className="topics">
        <br></br>
        <h1>Topics</h1>
        <br></br>
        (
        <div className="AllArticlesContainer">{topics}</div>)
    </div>
}

export default Topics