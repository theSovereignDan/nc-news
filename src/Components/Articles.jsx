import { useState } from "react"
import { useEffect } from "react"
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { fetchAllArticles } from "../api.jsx";

function Articles() {
    
    const [articles, setArticles] = useState("")
    const [order, setOrder] = useState("⬆️")
    const [firstTime, setFirstTime] = useState("none")
    const [sort_by, setSort_by] = useState("none")

    useEffect(() => {
        if (firstTime === false) {
       fetchAllArticles(sort_by, order).then((data)=> {
         const articlesarr = data.articles
         console.log(articlesarr)
        const articlesHtml = articlesarr.map((article)=> {
                return (<Link to={`/articles/${article.article_id}`}><Card key={article.article_id} className="articleCard">
                        <Card.Body>
                      <Card.Title className="articleText">
                        {article.title}
                      </Card.Title>
                      <Card.Img className="articleImage"
                variant="top"
                src={article.article_img_url}
              />
                 <Card.Text className="articleText">
                By {article.author}
             </Card.Text>
                      </Card.Body>
                  </Card></Link>)
            })
            setArticles(articlesHtml)
        })
    } else {
        fetchAllArticles(sort_by, "none").then((data)=> {
            const articlesarr = data.articles
           const articlesHtml = articlesarr.map((article)=> {
                   return (<Link to={`/articles/${article.article_id}`}><Card key={article.article_id} className="articleCard">
                           <Card.Body>
                         <Card.Title className="articleText">
                           {article.title}
                         </Card.Title>
                         <Card.Img className="articleImage"
                   variant="top"
                   src={article.article_img_url}
                 />
                    <Card.Text className="articleText">
                   By {article.author}
                </Card.Text>
                         </Card.Body>
                     </Card></Link>)
               })
               setArticles(articlesHtml)
           })
    }
    }, [sort_by, order])

    function handleSortByChange(event) {

        const sort_by = event.target.value

        setSort_by(sort_by)

    }

    function handleOrderClick(event) {
        event.preventDefault()

        setFirstTime(false)

        const order = event.target.value

        if (order === "⬆️") {
            setOrder("⬇️")
        } else if (order === "⬇️") {
            setOrder("⬆️")
        }
    }
    
    
    return (<div className="articles">
    <select className="sortby" onChange={handleSortByChange} name="category" id="">
  <option>--Sort By--</option>
  <option key= {"Date"} value={"created_at"}>Date</option>
  <option key= {"Comment Count"} value={"comment_count"}>Comment count</option>
  <option key= {"Votes"} value={"votes"}>Votes</option>
  </select>

  <button value={order}onClick={handleOrderClick}><span className="arrow">{order}</span></button>


        <div className="AllArticlesContainer">{articles}</div>
    </div>)
}

export default Articles