import React, {Component} from 'react';
import './App.css';
import WriterApp from './component/WriterApp';

class App extends Component {
  render(){
    return(
      <div className="container">
        <WriterApp />
      </div>
    );
  }
}
export default App;
