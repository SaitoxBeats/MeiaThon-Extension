// Função para formatar o tempo em HH:MM:SS
function formatTime(milliseconds) {
    // Convertendo para segundos
    const totalSeconds = Math.floor(milliseconds / 1000);
    
    // Calculando horas, minutos e segundos
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Formatando com zeros à esquerda
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Função para buscar o tempo da API
  function fetchSubathonTime() {
    const timerElement = document.getElementById('timer');
    
    fetch('https://subathon-api.justdavi.dev/api/time-left')
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha na conexão com a API');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.timeLeft) {
          timerElement.textContent = formatTime(data.timeLeft);
          timerElement.classList.remove('loading');
        } else {
          timerElement.textContent = 'Erro: Dados inválidos';
          timerElement.classList.add('loading');
        }
      })
      .catch(error => {
        timerElement.textContent = 'Erro de conexão';
        timerElement.classList.add('loading');
        console.error('Erro:', error);
      });
  }
  
  // Atualizar o timer a cada 5 segundos
  function startTimer() {
    // Buscar o tempo imediatamente
    fetchSubathonTime();
    
    // Configurar o intervalo para atualização
    setInterval(fetchSubathonTime, 1000);
  }
  
  // Iniciar quando o popup abrir
  document.addEventListener('DOMContentLoaded', startTimer);