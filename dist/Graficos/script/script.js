import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  function geraHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
  }

  function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
      dataset.data.push(dados);
    })
    grafico.update();
  }

  let workerDolar = new Worker('./script/workers/WorkerDolar.js');
  workerDolar.postMessage('usd');

  workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("dolar", valor);
    adicionarDados(graficoParaDolar, tempo, valor);
  })

  const graficoIene = document.getElementById('graficoIene');
  const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderWidth: 1
      }]
    }
  })

  let workerIene = new Worker('./script/workers/WorkerIene.js');
  workerIene.postMessage('iene');

  workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("iene", valor);
    adicionarDados(graficoParaIene, tempo, valor);
  })

  const graficoEthereum = document.getElementById('graficoEthereum');
  const graficoParaEthereum = new Chart(graficoEthereum, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Ethereum',
        data: [],
        borderWidth: 1
      }]
    }
  })

  let workerEthereum = new Worker('./script/workers/WorkerEthereum.js');
  workerEthereum.postMessage('ethereum');

  workerEthereum.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("ethereum", valor);
    adicionarDados(graficoParaEthereum, tempo, valor);
  })

  const graficoBitcoin = document.getElementById('graficoBitcoin');
  const graficoParaBitcoin = new Chart(graficoBitcoin, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Bitcoin',
        data: [],
        borderWidth: 1
      }]
    }
  })

  let workerBitcoin = new Worker('./script/workers/WorkerBitcoin.js');
  workerBitcoin.postMessage('bitcoin');

  workerBitcoin.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("bitcoin", valor);
    adicionarDados(graficoParaBitcoin, tempo, valor);
  })