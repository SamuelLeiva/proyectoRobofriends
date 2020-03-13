import React, {Component} from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll.js';
import './App.css';



class App extends Component {
    constructor() {
        super();
        this.state={//componentes que van a cambiar
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots:users}));
        };

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }

    render() {
        const { robots, searchfield } = this.state;//const que guarda el state, se usa para acceder a robots directamente
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if (!robots.length){
            return <h1>Loading</h1>;
        }
        else{
            return (
            <div className='tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange ={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
            );//componentes reusables: searchbox, scroll, cardlist
        }
    }
}

export default App;