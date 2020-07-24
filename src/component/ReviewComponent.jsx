import React, {Component} from 'react';
import ReviewDataService from '../service/ReviewDataService';

const WRITER = "Graciela";

class ReviewComponent extends Component {

    constructor(props) {
        super(props) 
        
        this.state = {
            id: this.props.match.params.id,
            title: null,
            content: null
        }

        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(event){
        console.log("there was a change");
        const target = event.target;
        const value = target.name = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    componentDidMount() {
        console.log(this.state.id);
        if (this.state.id === -1){
            return;
        }

        ReviewDataService.retrieveReview(WRITER, this.state.id)
            .then(response => this.setState({
                title: response.data.title,
                text: response.data.text
            }))
        }
    render() {
        return (
            <div>
                <h3>Review</h3>
                <form>
                    <div className="form-group">
                        <label>Title:</label>
                        <input name="title" className="form-control" type="text" placeholder="Title" value={this.state.title} onChange={this.inputChange}></input>
                        <label>Review:</label>
                        <input name="content" className="form-control" type="text" placeholder="Write your review here" value={this.state.text} onChange={this.inputChange}></input>
                    </div>
                    <button type="submit" class="btn btn-default">Save</button>
                </form>
            </div>
        )
    }
}

export default ReviewComponent;