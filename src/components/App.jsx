import React, { useState } from 'react'
import Login from "./Login";
import Review from "./Review"

const App = () => {
  const [token, setToken] = useState(null)
  const [name, setName] = useState('')
  return !token
    ? <Login setToken={setToken} setName={setName}/>
    : <Review setToken={setToken} token={token} name={name}/>
}

export default App;
