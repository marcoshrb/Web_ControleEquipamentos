
// Obtendo o elemento do interruptor de alternância
const switchToggle = document.getElementById('switch');

// Verificando o estado armazenado do modo escuro
const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';

// Ativando ou desativando o modo escuro com base no estado armazenado
if (darkModeEnabled) {
  document.body.classList.add('dark-mode');
  switchToggle.checked = true;
} else {
  document.body.classList.remove('dark-mode');
  switchToggle.checked = false;
}

// Adicionando um manipulador de eventos ao interruptor de alternância
switchToggle.addEventListener('change', function() {
  // Armazenando o estado do modo escuro no localStorage
  localStorage.setItem('dark-mode', this.checked);
  
  // Ativando ou desativando o modo escuro com base na alteração do interruptor
  if (this.checked) {
    // Modo escuro ativado
    document.body.classList.add('dark-mode');
  } else {
    // Modo escuro desativado
    document.body.classList.remove('dark-mode');
  }
});