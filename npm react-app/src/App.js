import './App.css';
import axios from 'axios';

function App() {
  function addFn() {
    fetch('http://localhost:5000/add', {
      method: 'POST',
      body: JSON.stringify({
        email: 'abc@gmail.com',
        name: 'abc'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  const getAll = () => {
    axios.get('http://localhost:5000/getAll')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const byId = () => {
    axios.get('http://localhost:5000/byId/1')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const updateFn = () => {
    axios.put('http://localhost:5000/updateFn/1')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const deleteFn = () => {
    axios.delete('http://localhost:5000/delete/1')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return (
    <div>
      <h1>Postgresql test project. It is postgresql crud operation.</h1>
      <button onClick={addFn}>add button</button>
      <button onClick={getAll}>get All button</button>
      <button onClick={byId}>get by id</button>
      <button onClick={updateFn}>update button</button>
      <button onClick={deleteFn}>delete by id button</button>
    </div>
  );
}

export default App;
