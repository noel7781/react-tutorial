import { useState } from 'react';
import './App.css';
import Average from './Average';
import Counter from './Counter';
import Info from './Info';

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => {
        setVisible(!visible);
      }}
      >
       {visible ? '숨기기' : '보이기'} 
      </button>
      <hr />
      {visible && <Average />}
    </div>
  )
}
export default App;
