import React from 'react';
import './App.css';


function DataFormatada(props) {
  return <h2>Horário Atual: {props.date.toLocaleTimeString()}</h2>
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  botaoPausarRelogio() {
    console.log('Relógio ' + this.timerID + ' pausado!');


    clearInterval(this.timerID);
  }

  botaoRetomarRelogio(){
    console.log('Relógio retomado!');

    this.timerID = setInterval(() => {
      this.thick()
    },1000);

    console.log("Agora eu sou o relógio " + this.timerID)
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.thick()
    }, 1000);

    console.log("Eu sou o relógio " + this.timerID)
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  thick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Relógio</h1>
        <DataFormatada date={this.state.date} />

        <button onClick={(event) => this.botaoPausarRelogio(event)} class="b p" > Pausar </button>
        <button onClick={(event) => this.botaoRetomarRelogio(event)} class="b r" > Retomar</button>
      </div>
    )
  }
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
      </header>
    </div>
  );
}

export default App;
