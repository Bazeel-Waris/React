
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

let counter = 1;

ReactDOM.createRoot(document.getElementById('root')).render(<App counter = {counter} />);

// const refresh = () => {
//   ReactDOM.createRoot(document.getElementById('root')).render(
//     <App counter={counter} />
//   )
// }

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)