import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component
const P2PButton = ({onClick}) => {
  return (
    <div>
        <ToastContainer />
        <button onClick={() => onClick(toast)}>Auto add peer</button>
    </div>
  );
};

export default P2PButton;
