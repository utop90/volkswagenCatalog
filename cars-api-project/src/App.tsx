import { Suspense } from 'react';
import './App.css';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <Home />
    </Suspense>
    </div>
  );
}

export default App;
