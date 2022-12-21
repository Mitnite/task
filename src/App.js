import React, {Component} from "react";
import {connect} from 'react-redux'
import './App.css';
import Picture from "./Picture/Picture";
import {listFetchData} from "./redux/actions/list";

class App extends Component {
  componentDidMount() {
    this.props.fetchData("https://www.metmuseum.org/api/collection/collectionlisting?perPage=100&offset=0");
  }

  state = {
    clicked: false,
    n: 0
  }

  onSort = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  loaderHandler = () => {
    let m = this.state.n + 10
    this.props.fetchData("https://www.metmuseum.org/api/collection/collectionlisting?perPage=100&offset=" + m)
    this.setState({
      n: m
    })
  }


  render() {
    let pics
    if (this.props.posts) {
      pics = this.props.posts.map((posts, index) => {
        return (
            <Picture
                key={index}
                name={posts.title}
                state={posts.liked}
                url={posts.image}
                onLike={() => this.props.onLike(index)}
                onDelete={() => this.props.onDelete(index)}
            />
        )
      })
    }
    let pics_liked = this.props.posts.map((posts, index) => {
      if (posts.liked) {
        return (
            <Picture
                key={index}
                name={posts.title}
                state={posts.liked}
                url={posts.image}
                onLike={() => this.props.onLike(index)}
                onDelete={() => this.props.onDelete(index)}
            />
        )
      } else return null
    })
    return (
        <div className={'App'}>
          <div>
            <div className={'navigation'}>
              <h1>Список карточек</h1>
              <button onClick={this.onSort} className={'button_sort'}>Сортировать</button>
            </div>
            <div className={'picture'}>
            {this.state.clicked
                ? pics_liked
                : pics
            }
            </div>
            {!this.state.clicked
                ? <button className={'button_sort'} onClick={this.loaderHandler}>Показать ещё</button>
                : null
            }
          </div>
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(listFetchData(url)),
    onLike: index => dispatch({type: 'LIKED', payload: index}),
    onDelete: index => dispatch({type: 'DELETE', payload: index})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
