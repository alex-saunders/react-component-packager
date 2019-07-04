import React from 'react';
import ReactDOM from 'react-dom';

import TestComponent from 'INJECT_COMPONENT_PATH';

const Test = () => {
  return (
    <div>
      <TestComponent />
    </div>
  );
};

ReactDOM.render(<Test />, document.getElementById('root'));
