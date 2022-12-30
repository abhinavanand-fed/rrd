import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  useLocation
} from 'react-router-dom';

function Page1() {
  const [formData, setFormData] = useState({});
  const history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    history.push({
      pathname: '/page2',
      state: { formData }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

function Page2() {
  const location = useLocation();
  const formData = location.state.formData;

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{formData.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{formData.email}</td>
        </tr>
      </tbody>
    </table>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Page 1</Link>
            </li>
            <li>
              <Link to="/page2">Page 2</Link>
            </li>
          </ul>
        </nav>
        <Route path="/" exact component={Page1} />
        <Route path="/page2" component={Page2} />
      </div>
    </Router>
  );
}

export default App;
