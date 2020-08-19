import React, {Component} from 'react';
import ReviewDataService from '../service/ReviewDataService'

const WRITER = "Graciela";

class ListReviewsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            message: null,
            header: "",
            cat: this.props.match.params.category
        }
        this.refreshReviews = this.refreshReviews.bind(this);
        this.deleteReviewClicked = this.deleteReviewClicked.bind(this);
        this.updateReviewClicked = this.updateReviewClicked.bind(this);
        this.addReviewClicked = this.addReviewClicked.bind(this);
        this.listReviewsbyCat = this.listReviewsbyCat.bind(this);
        
    }
    componentDidMount() {
        if (this.state.cat !== undefined){
           this.listReviewsbyCat(this.state.cat); 
        }
        else{
            this.refreshReviews();
        }
        console.log(this.state.cat);
    }

    refreshReviews (){
        ReviewDataService.retrieveAllReviews(WRITER)//HARDCODED
            .then(
                response => { console.log(response); 
                this.setState({ reviews: response.data, header: "All Reviews" })}
            )
        }

    listReviewsbyCat(category) {
        ReviewDataService.retrieveReviewsbyCat(category)
            .then(
                response => { console.log(response);
                this.setState({ reviews: response.data, header: `Category: ${category}`})}
            )
    }

    deleteReviewClicked(id, title) {
        ReviewDataService.deleteReview(WRITER, id)
            .then(response => {
                this.setState({ message: `Review ${id}, ${title}, was successfully deleted`});
                this.refreshReviews();
                }
            )
    }

    updateReviewClicked(id) {
        console.log("update " + id);
        this.props.history.push(`/reviews/${id}`);
    }

    addReviewClicked(){
        this.props.history.push(`/reviews/-1`);
    }
    render(){
        return(
            <div className="container">
                <h3>{this.state.header}</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Writer</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.reviews.map(
                                    review =>
                                        <tr key = {review.id}>
                                            {/* <td>{review.id}</td> */}
                                            <td>{review.title}</td>
                                            <td><a href={`/categories/${review.category}`}>{review.category}</a></td>
                                            <td>{review.username}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.updateReviewClicked(review.id)}>Edit</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteReviewClicked(review.id, review.title)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addReviewClicked}>Add</button>                
                </div>
            </div>
        )
    }
}

export default ListReviewsComponent;