import React, {Component} from "react";
import {connect} from 'react-redux'
import './App.css';
import Picture from "./Picture/Picture";
import {listFetchData} from "./redux/actions/list";

class App extends Component {

  componentDidMount() {
    this.props.fetchData("https://jsonplaceholder.typicode.com/albums/1/photos")
  }

  state = {
    clicked: false
  }

  onSort = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }


  render() {
    let pics = this.props.posts.map((posts, index) => {
      return (
          <Picture
              key={index}
              name={posts.title}
              state={posts.liked}
              url={posts.url}
              onLike={() => this.props.onLike(index)}
              onDelete={() => this.props.onDelete(index)}
          />
      )
    })
    let pics_liked = this.props.posts.map((posts, index) => {
      if (posts.liked) {
        return (
            <Picture
                key={index}
                name={posts.title}
                state={posts.liked}
                url={posts.url}
                onLike={() => this.props.onLike(index)}
                onDelete={() => this.props.onDelete(index)}
            />
        )
      } else return null
    })
    return (
        <div className={'App'}>
          <div>
            <h1>Список карточек</h1>
            <button onClick={this.onSort} className={'button_sort'}>Сортировать</button>
            {this.state.clicked
                ? pics_liked
                : pics
            }
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
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
