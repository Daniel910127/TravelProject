import logo from "./logo.svg";
import "./App.css";
import Spot from "./Views/Spot";


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
library.add(fas,far)

function App() {
  return (
    <div className="App">
      <Spot></Spot>
    </div>
  );
}

export default App;
