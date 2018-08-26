import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CustomerPage from './scenes/customer/CustomerPage';

ReactDOM.render(<CustomerPage />, document.getElementById('root'));
registerServiceWorker();
