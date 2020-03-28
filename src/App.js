import React from 'react';
import axios from 'axios';
import './App.css';

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url}/>
        <div className="info">
            <div className="name">{profile.name}</div>
            <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class SearchForm extends React.Component {
  state = { userName: '' };
  handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='SearchForm'>
        <input 
          type='text' 
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder='GitHub username' 
          required 
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };
  }
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
        profiles: [...prevState.profiles, profileData],
    }));
  };
  render () {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.title}
        </header>
        <div className="Content">
          <SearchForm onSubmit={this.addNewProfile}/>
          <CardList profiles={this.state.profiles}/>
        </div>
      </div>
    );
  }
}

export default App;
