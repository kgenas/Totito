import './App.css';
import { Board } from './components/Board';
import { ResultModal } from './components/ResultModal';

function App() {
  return (
    <>
      <div className='game'>
        <h1>Totito</h1>
        <Board/>
      </div>
      <ResultModal/>
    </>
  );
}

export default App;
