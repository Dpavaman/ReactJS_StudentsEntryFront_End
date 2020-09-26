import React from 'react';
import axios from 'axios';

const api = 'https://student-details-crud.herokuapp.com/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      name: '',
      email: '',
      college: '',
      branch: '',
      cgpa: '',
      batch: ''
    }
  }

  nameChangeHandler = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  collegeChangeHandler = (event) => {
    this.setState({
      college: event.target.value
    })
  }

  branchChangeHandler = (event) => {
    this.setState({
      branch: event.target.value
    })
  }

  cgpaChangeHandler = (event) => {
    this.setState({
      cgpa: event.target.value
    })
  }

  batchChangeHandler = (event) => {
    this.setState({
      batch: event.target.value
    })
  }

  submit = (event, id) => {
    event.preventDefault()

    if (id === 0) {
      axios.post(api, {
        name: this.state.name,
        email: this.state.email,
        college: this.state.college,
        branch: this.state.branch,
        cgpa: this.state.cgpa,
        batch: this.state.batch
      }).then(() => {
        this.componentDidMount()
      })
    } else {
      axios.put(api + `/${id}`, {
        name: this.state.name,
        email: this.state.email,
        college: this.state.college,
        branch: this.state.branch,
        cgpa: this.state.cgpa,
        batch: this.state.batch
      }).then(() => {
        this.componentDidMount()
      })
    }
    document.getElementById('form').reset()
    console.log(this.state.users);
  }

  componentDidMount() {
    axios.get(api).then((res, data) => {
      this.setState({
        users: res.data,
        id: 0,
        name: res.data.name,
        email: res.data.email,
        college: res.data.college,
        branch: res.data.branch,
        cgpa: res.data.cgpa,
        batch: res.data.batch
      })

    })
  }

  edit(id) {
    axios.get(api + `/${id}`).then((res) => {
      this.setState({
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
        college: res.data.college,
        branch: res.data.branch,
        cgpa: res.data.cgpa,
        batch: res.data.batch
      })
    })
  }

  delete(id) {
    axios.delete(api + `/${id}`).then(() => {
      this.componentDidMount()
    })
    console.log(id);
  }

  render() {
    return (
      <div className="row">
        <div className="col s6">
          <form id="form" onSubmit={(e) => this.submit(e, this.state.id)}>

            <div className="input-field col s12">
              <i className="material-icons prefix">person</i>
              <input value={this.state.name} onChange={(e) => this.nameChangeHandler(e)} type="text" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">Student Name</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">mail</i>
              <input value={this.state.email} onChange={(e) => this.emailChangeHandler(e)} type="email" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">Email</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">domain</i>
              <input value={this.state.college} onChange={(e) => this.collegeChangeHandler(e)} type="text" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">College</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">grade</i>
              <input value={this.state.branch} onChange={(e) => this.branchChangeHandler(e)} type="text" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">Branch</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">check_box</i>
              <input value={this.state.cgpa} onChange={(e) => this.cgpaChangeHandler(e)} type="text" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">CGPA</label>
            </div>

            <div className="input-field col s12">
              <i className="material-icons prefix">date_range</i>
              <input value={this.state.batch} onChange={(e) => this.batchChangeHandler(e)} type="text" id="autocomplete-input" className="autocomplete" required />
              <label htmlFor="autocomplete-input">Year of Passing</label>
            </div>
            <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
            <i className="material-icons right">send</i>
            </button>
          </form>
        </div>

        <div className="col s12 ">
          <table className="highlight">
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>College</th>
                <th>Branch</th>
                <th>CGPA</th>
                <th>Year Of Passing</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {this.state.users.map(user =>
                <tr key={user._id} >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.college}</td>
                  <td>{user.branch}</td>
                  <td>{user.cgpa}</td>
                  <td>{user.batch}</td>

                  <td><button onClick={(e) => this.edit(user._id)} className="btn waves-effect waves-light right" type="submit" name="action">
                    <i className="material-icons ">edit</i>
                  </button></td>

                  <td>
                    <button onClick={(e) => this.delete(user._id)} className="btn waves-effect waves-light right" type="submit" name="action">
                      <i className="material-icons ">delete</i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;
