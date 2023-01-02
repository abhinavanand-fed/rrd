

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';



function UserDetails() {
  const [formData, setFormData] = useState({});
  const history = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    history('display', {
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
      <button type="submit" value="Submit">Submit</button>
    </form>
  );
}

function Display() {
  const location = useLocation();
  console.log(location.state);
  const formData = location.state?.formData;

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <td>{formData?.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{formData?.email}</td>
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
              <Link to="/">User Details</Link>
            </li>
            <li>
              <Link to="/display">Display</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route path="/" exact element={<UserDetails />} />
        <Route path="/display" element={
          <Display />} />
        </Routes>
       </div>
    </Router>
  );
}

export default App;