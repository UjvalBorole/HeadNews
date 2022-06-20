import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
     let {title,description,imgurl,newsurl,author,date,source} = this.props;  //pass the props in the news.js
    return (
      <div className='my-3'>
       <div className="card" style={{width: "18rem"}}>
       <span class="position-absolute top-0  translate-middle badge rounded-pill bg-primary" style={{left:'90%',zIndex:'1'}}>
                  {source}
                     </span>
            <img src={imgurl?imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx-IWZyD_Nm6PWsdDzY8cerKQTmdplpLJfsw&usqp=CAU"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                <a rel = "noreferrer" href={newsurl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
