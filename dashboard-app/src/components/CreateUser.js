import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateUser extends Component {
  constructor() {
    super();
    this.state = {
      fName: '',
      mName:'',
      lName:'',
      age:'',
      birthDate:'',
      manager:''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      fName: this.state.fName,
      mName: this.state.mName,
      lName: this.state.lName,
      age: this.state.age,
      birthDate: this.state.birthDate,
      manager: this.state.manager
    };

    axios
      .post('http://localhost:8083/api/users', data)
      .then(res => {
        this.setState({
          fName: '',
          mName:'',
          lName:'',
          age:'',
          birthDate:'',
          manager:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Create User!");
      })
  };

  render() {
    return (
      <div className="CreateUser">
        <Link to="/" className="homeLink">
            Show User List
        </Link>
        <p className="create_title">
            Create new User
        </p>
        <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
                <input
                type='text'
                placeholder='First Name (Required)'
                name='fName'
                className='form-input'
                value={this.state.fName}
                onChange={this.onChange}
                />
            </div>

            <div className='form-group'>
                <input
                type='text'
                placeholder='Middle Name'
                name='mName'
                className='form-input'
                value={this.state.mName}
                onChange={this.onChange}
                />
            </div>

            <div className='form-group'>
                <input
                type='text'
                placeholder='Last Name (Required)'
                name='lName'
                className='form-input'
                value={this.state.lName}
                onChange={this.onChange}
                />
            </div>

            <div className='form-group'>
                <input
                type='text'
                placeholder='Age'
                name='age'
                className='form-input'
                value={this.state.age}
                onChange={this.onChange}
                />
            </div>

            <div className='form-group'>
                <input
                type='date'
                placeholder='birth date'
                name='birthDate'
                className='form-input'
                value={this.state.birthDate}
                onChange={this.onChange}
                />
            </div>
            <div className='form-group'>
                <input
                type='text'
                placeholder='manager'
                name='manager'
                className='form-input'
                value={this.state.manager}
                onChange={this.onChange}
                />
            </div>
            <input
                type="submit"
                className="submit_button"
            />
        </form>
    </div>
    );
  }
}

export default CreateUser;