import React, { useEffect,useState } from "react"; //use rce shortcut for vs code react class base component
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types"; //this is same as the props
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {


  const capitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [articles,setArticles]=useState([]);
  const [loading,setLoading] = useState(true);
  const [page,setPage] = useState(1);
  const [totalResults,setTotalResult] = useState(0);
  document.title = `${ capitalized(props.category)}- HeadNews `; //in constructor we uses props then we pass props in constructor and super function

  const updateNews = async() =>{    //we do this is asynch because we use fetch function
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log("handlePreClick");bb
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }

  useEffect(()=>{
   updateNews();

  },[]);


  const fetchMoreData= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);

  }

    return (
      <div className="container my-3">
      <br />
      <br />
        <h2 className="text-center" >HeadNews - Top {capitalized(props.category)} Headlines </h2>
        { loading && <Spinner/>}
    
        <InfiniteScroll
          dataLength={ articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==  totalResults}  //when this will finish
          loader={<Spinner/>}
        >
          <div className="container">

      
          <div className="row">
            { articles.map((element) => {   //map function work like array and it return arraylist
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title: ""}
                    description={
                      element.description
                        ? element.description
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>

        </InfiniteScroll>
      </div>
    );
  
}

News.defaultProps = {
  //default value of the passes props is this in proptype
  country: "in",
  pageSize: 14,
  category: "general",
};

News.propTypes = {
  //set the props in proptype
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
