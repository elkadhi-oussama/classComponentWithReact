import React, { Component } from "react";
import Like from "./Like";
import { getMovies } from "./services/fakeMovieService";

class Movie extends Component {
  state = {
    movie: getMovies(),
  };
  handelDelete = (movie) => {
    const movies = this.state.movie.filter((el) => el._id !== movie._id);
    this.setState({ movie: movies });
  };
  handleLike = (movie)=>{
   const newMovies = [...this.state.movie]
   const index = newMovies.indexOf(movie)
   newMovies[index]= {...newMovies[index]}
   newMovies[index].liked = !newMovies[index].liked
   this.setState({movie : newMovies}) 
  }
  render() {
    return this.state.movie.length === 0 ? (
      <p>There are no movies in the database.</p>
    ) : (
      <>
        <p>Showing {this.state.movie.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movie ? (
              this.state.movie.map((el) => {
                return (
                  <tr key={el._id}>
                    <td> {el.title} </td>
                    <td> {el.genre.name} </td>
                    <td> {el.numberInStock} </td>
                    <td> {el.dailyRentalRate} </td>
                    <td><Like liked={el.liked} onClick={ ()=> this.handleLike(el)} /></td>
                    <td>
                      <button
                        onClick={() => this.handelDelete(el)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <img
                src="https://c.tenor.com/wfEN4Vd_GYsAAAAM/loading.gif"
                alt=""
              />
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movie;
