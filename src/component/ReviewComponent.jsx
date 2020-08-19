import React, {Component} from 'react';
import ReviewDataService from '../service/ReviewDataService';

const WRITER = "Graciela";

class ReviewComponent extends Component {

    constructor(props) {
        super(props) 
        
        this.state = {
            id: this.props.match.params.id,
            title: "",
            category: "",
            content: ""
        }

        this.inputChange = this.inputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    inputChange(event){
        console.log("there was a change");
        const valu = event.target.value;
        const nam = event.target.name;
        this.setState({
            [nam]: valu
        });
    }

    onSubmit(event){
        //if -1 or 0 add everything to reviews list
        //else change the hardcoded list item of that id
        event.preventDefault();
        //let username = WRITER;

        let review = {
            id: this.state.id,
            username: WRITER,
            title: this.state.title,
            category: this.state.category,
            content: this.state.content,
            targetDate: this.state.targetDate
        }

        if(this.state.id === -1) {
            ReviewDataService.createReview(WRITER, review)
                .then(() => this.props.history.push('/reviews'))
        }
        else {
            ReviewDataService.updateReview(WRITER, this.state.id, review)
                .then(() => this.props.history.push('/reviews'))
        }
        console.log(review);
    }

    componentDidMount() {
        console.log("editing review id: " + this.state.id);
        if (this.state.id === -1){
            return;
        }

        ReviewDataService.retrieveReview(WRITER, this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                category: response.data.category,
                content: response.data.content 
                }
            ))
        }
    render() {
        //let { id, title, content } = this.state;
        return (
            <div>
                <h3>Review</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input name="title" className="form-control" type="text" value={this.state.title} placeholder="Title" onChange={this.inputChange}></input>
                        <label>Review:</label>
                        <input name="content" className="form-control" type="text" value={this.state.content} placeholder="Write your review here" onChange={this.inputChange}></input>
                        <label>Category:</label>
                        <select name="category" className="form-control" value={this.state.category} onChange={this.inputChange}>
                            <option value="game">Game</option>
                            <option value="animation">Animation</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-default">Save</button>
                </form>
            </div>
        )
    }
}

export default ReviewComponent;