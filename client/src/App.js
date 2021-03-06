import React from 'react';
import {BrowserRouter as Router} from  "react-router-dom";
import 'materialize-css';
import {useRoutes} from "./routes";
import {Navbar} from "./components/Navbar";

function App() {

    const routes = useRoutes();
  return (
      <Router>
        {<Navbar/>}
    <div className="container">
      <div className="App-header">
          {routes}
      </div>
    </div>
      </Router>
  );
}

export default App;
