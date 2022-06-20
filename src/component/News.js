import React, { Component } from "react"; //use rce shortcut for vs code react class base component
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types"; //this is same as the props
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    //default value of the passes props is this in proptype
    country: "in",
    pageSize: 14,
    category: "general",
  };

  static propTypes = {
    //set the props in proptype
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalized = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    //In constructor super function is compulsory
    super(props);
    this.state = {    //this is the default state
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalized(this.props.category)}- HeadNews `; //in constructor we uses props then we pass props in constructor and super function
  }

  async updateNews() {    //we do this is asynch because we use fetch function
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log("handlePreClick");
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreClick = async () => {
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b79abc5e3c16460ea515aadc3ffdfa49&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log("handlePreClick");
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page - 1,
    //   loading:false
    // });

    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  fetchMoreData= async()=>{
    this.setState({ page: this.state.page +1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    console.log("handleNextClick");
    // if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){  //Math.ceil means proximate no eg 3.45=4
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=b79abc5e3c16460ea515aadc3ffdfa49&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page +1,
    //   loading:false
    // });
    //}
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">
          HeadNews - Top {this.capitalized(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}  //when this will finish
          loader={<Spinner/>}
        >
          <div className="container">

      
          <div className="row">
            {this.state.articles.map((element) => {   //map function work like array and it return arraylist
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
}

export default News;
