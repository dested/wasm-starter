async function start() {
  document.getElementById('main').innerText = 'hi';
}

start().catch(ex => console.error(ex));