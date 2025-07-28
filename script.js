// Configurações e variáveis globais aprimoradas
const CONFIG = {
    particleCount: 80,
    animationDuration: 400,
    scrollOffset: 100,
    heartExplosionCount: 8,
    sparkleCount: 12,
    celebrationDuration: 3000
};

// Frases românticas para diferentes momentos do jogo
const ROMANTIC_PHRASES = {
    gameStart: [
        "Para minha princesa, cada carta é um pedaço do meu coração",
        "Você é o amor da minha vida, minha razão de existir",
        "Cada movimento seu ilumina meu mundo, minha princesa"
    ],
    match: [
        "Assim como essas cartas, somos perfeitos juntos!",
        "Você é minha alma gêmea, minha princesa adorada",
        "Nosso amor é como essa combinação: perfeita!",
        "Para minha princesa, você completa meu coração",
        "Você é meu tesouro mais precioso"
    ],
    completion: [
        "Parabéns, minha princesa! Você é incrível!",
        "Assim como completou este jogo, você completou minha vida",
        "Para minha princesa: você é o amor da minha vida",
        "Meu coração bate só por você, minha rainha",
        "Você é minha felicidade completa, minha princesa"
    ],
    encouragement: [
        "Continue tentando, minha princesa! Você consegue!",
        "Para o amor da minha vida, nunca desista!",
        "Você é forte e determinada, minha princesa",
        "Acredito em você, meu amor eterno"
    ]
};

// Variáveis do jogo da memória aprimoradas
let gameState = {
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isGameActive: false,
    gameCompleted: false,
    totalPairs: 6, // Aumentado para 6 pares (12 cartas)
    startTime: null,
    bestTime: localStorage.getItem('bestTime') || null,
    consecutiveMatches: 0,
    currentPhrase: 0
};

let currentImageIndex = 0;
const images = ['images/image1.jpeg', 'images/image2.jpeg', 'images/image3.jpeg', 'images/image4.jpeg'];

// Captions românticas para cada imagem
const imageCaptions = [
    "Nosso primeiro momento mágico juntos",
    "Sorrisos que iluminam meu mundo",
    "Você é minha flor mais bela",
    "Minha estrela mais brilhante"
];

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeMemoryGame();
    initializeGallery();
    initializeScrollEffects();
    initializeAnimations();
    showRandomRomanticPhrase();
    createFloatingHearts();
});

// Sistema de jogo da memória aprimorado
function initializeMemoryGame() {
    const gameCards = document.querySelectorAll('.game-card');
    const restartBtn = document.getElementById('restartBtn');
    const revealBtn = document.getElementById('revealBtn');
    
    // Embaralhar cartas
    shuffleCards();
    
    // Adicionar eventos de clique nas cartas
    gameCards.forEach(card => {
        card.addEventListener('click', () => handleCardClick(card));
        
        // Adicionar efeito de hover personalizado
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
                card.style.transform = 'scale(1.05) rotateY(5deg)';
                createHoverSparkles(card);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
                card.style.transform = 'scale(1) rotateY(0deg)';
            }
        });
    });
    
    // Eventos dos botões
    restartBtn.addEventListener('click', restartGame);
    revealBtn.addEventListener('click', revealGallery);
    
    // Iniciar o jogo
    gameState.isGameActive = true;
    gameState.startTime = Date.now();
    
    // Mostrar frase de início
    showGameMessage(getRandomPhrase('gameStart'), 'start');
}

function shuffleCards() {
    const gameContainer = document.getElementById('memoryGame');
    const cards = Array.from(gameContainer.children);
    
    // Algoritmo Fisher-Yates para embaralhar
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        gameContainer.appendChild(cards[j]);
    }
    
    // Adicionar animação de entrada para as cartas
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.5) rotateY(180deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) rotateY(0deg)';
        }, index * 100);
    });
}

function handleCardClick(card) {
    // Verificar se o jogo está ativo e se a carta pode ser clicada
    if (!gameState.isGameActive || 
        card.classList.contains('flipped') || 
        card.classList.contains('matched') ||
        gameState.flippedCards.length >= 2) {
        return;
    }
    
    // Efeito sonoro de clique
    playCardFlipSound();
    
    // Virar a carta com animação aprimorada
    card.classList.add('flipped');
    card.style.transform = 'rotateY(180deg) scale(1.05)';
    
    // Adicionar efeito de brilho
    createCardFlipEffect(card);
    
    gameState.flippedCards.push(card);
    
    // Verificar se duas cartas foram viradas
    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        updateMovesCounter();
        
        setTimeout(() => {
            checkForMatch();
        }, 1200);
    }
}

function checkForMatch() {
    const [card1, card2] = gameState.flippedCards;
    const type1 = card1.getAttribute('data-card');
    const type2 = card2.getAttribute('data-card');
    
    if (type1 === type2) {
        // Par encontrado - efeitos visuais espetaculares
        card1.classList.add('matched');
        card2.classList.add('matched');
        gameState.matchedPairs++;
        gameState.consecutiveMatches++;
        
        // Resetar transformações das cartas
        card1.style.transform = 'rotateY(180deg) scale(1)';
        card2.style.transform = 'rotateY(180deg) scale(1)';
        
        // Efeito de vibração suave na tela
        document.body.style.animation = 'gentleShake 0.6s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 600);
        
        // Criar explosão de corações e brilhos mais elaborada
        createEnhancedMatchExplosion(card1);
        createEnhancedMatchExplosion(card2);
        
        // Som de sucesso aprimorado
        playEnhancedSuccessSound();
        
        // Mostrar mensagem romântica
        showGameMessage(getRandomPhrase('match'), 'match');
        
        // Efeito especial para múltiplas combinações consecutivas
        if (gameState.consecutiveMatches >= 2) {
            createConsecutiveMatchEffect();
        }
        
        // Verificar se o jogo foi completado
        if (gameState.matchedPairs === gameState.totalPairs) {
            setTimeout(() => {
                completeGame();
            }, 1500);
        }
    } else {
        // Não é um par - feedback visual aprimorado
        gameState.consecutiveMatches = 0;
        
        // Efeito de "erro" mais suave
        setTimeout(() => {
            card1.style.animation = 'gentleShake 0.4s ease-in-out';
            card2.style.animation = 'gentleShake 0.4s ease-in-out';
            
            // Som de erro suave
            playMissSound();
            
            // Mostrar mensagem de encorajamento ocasionalmente
            if (Math.random() < 0.3) {
                showGameMessage(getRandomPhrase('encouragement'), 'encouragement');
            }
            
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.animation = '';
                card2.style.animation = '';
                card1.style.transform = 'scale(1) rotateY(0deg)';
                card2.style.transform = 'scale(1) rotateY(0deg)';
            }, 400);
        }, 300);
    }
    
    // Limpar cartas viradas
    gameState.flippedCards = [];
}

function createEnhancedMatchExplosion(card) {
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    
    // Criar múltiplos corações explodindo em padrão circular
    for (let i = 0; i < CONFIG.heartExplosionCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-explosion';
        heart.innerHTML = ['💖', '💕', '✨', '💫', '⭐', '🌟', '💝', '🌹'][Math.floor(Math.random() * 8)];
        
        // Posição em círculo perfeito
        const angle = (i * 45) + Math.random() * 20;
        const distance = 60 + Math.random() * 40;
        const x = centerX + Math.cos(angle * Math.PI / 180) * distance;
        const y = centerY + Math.sin(angle * Math.PI / 180) * distance;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.animationDelay = (i * 0.08) + 's';
        heart.style.fontSize = (1.5 + Math.random() * 1) + 'rem';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1200);
    }
    
    // Criar efeitos de brilho em espiral
    for (let i = 0; i < CONFIG.sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        
        const angle = (i * 30) + Math.random() * 60;
        const distance = 40 + Math.random() * 50;
        const x = centerX + Math.cos(angle * Math.PI / 180) * distance;
        const y = centerY + Math.sin(angle * Math.PI / 180) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.animationDelay = (Math.random() * 0.5) + 's';
        sparkle.style.background = ['#d4af37', '#f8d7da', '#e8b4b8', '#fce4ec'][Math.floor(Math.random() * 4)];
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Efeito de onda de energia
    const wave = document.createElement('div');
    wave.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 10px;
        height: 10px;
        border: 3px solid #d4af37;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: energyWave 1s ease-out forwards;
        pointer-events: none;
        z-index: 1000;
    `;
    
    document.body.appendChild(wave);
    
    setTimeout(() => {
        wave.remove();
    }, 1000);
}

function createConsecutiveMatchEffect() {
    // Efeito especial para combinações consecutivas
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #f8d7da, #d4af37);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 1000;
        animation: consecutiveBonus 2s ease-out forwards;
        box-shadow: 0 10px 30px rgba(139, 90, 107, 0.4);
        text-align: center;
        pointer-events: none;
    `;
    
    message.innerHTML = `
        <div>🔥 Sequência Incrível! 🔥</div>
        <div style="font-size: 1rem; margin-top: 0.5rem;">Minha princesa está arrasando!</div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

function createCardFlipEffect(card) {
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    
    // Criar pequenos brilhos ao virar a carta
    for (let i = 0; i < 4; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            left: ${centerX + (Math.random() - 0.5) * 60}px;
            top: ${centerY + (Math.random() - 0.5) * 60}px;
            font-size: 1rem;
            animation: quickSparkle 0.8s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
}

function createHoverSparkles(card) {
    const cardRect = card.getBoundingClientRect();
    
    // Criar pequenos brilhos no hover
    for (let i = 0; i < 2; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '💫';
        sparkle.style.cssText = `
            position: absolute;
            left: ${cardRect.left + Math.random() * cardRect.width}px;
            top: ${cardRect.top + Math.random() * cardRect.height}px;
            font-size: 0.8rem;
            animation: hoverSparkle 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Sistema de sons aprimorado
function playCardFlipSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Audio não disponível');
    }
}

function playEnhancedSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Criar um acorde mais complexo e agradável
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        
        frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime + index * 0.1);
            oscillator.stop(audioContext.currentTime + 0.8);
        });
    } catch (error) {
        console.log('Audio não disponível');
    }
}

function playMissSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        
        oscillator.type = 'triangle';
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Audio não disponível');
    }
}

// Sistema de mensagens românticas
function getRandomPhrase(category) {
    const phrases = ROMANTIC_PHRASES[category];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function showGameMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `game-message ${type}`;
    
    const colors = {
        start: 'linear-gradient(45deg, #f8d7da, #d4af37)',
        match: 'linear-gradient(45deg, #e8b4b8, #f4e4bc)',
        encouragement: 'linear-gradient(45deg, #fce4ec, #d4af37)',
        completion: 'linear-gradient(45deg, #d4af37, #e8b4b8)'
    };
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${colors[type] || colors.start};
        color: white;
        padding: 1.5rem 2.5rem;
        border-radius: 25px;
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.2rem;
        font-style: italic;
        font-weight: 500;
        z-index: 1000;
        animation: messageAppear 3s ease-out forwards;
        box-shadow: 0 10px 30px rgba(139, 90, 107, 0.4);
        text-align: center;
        max-width: 80%;
        pointer-events: none;
        border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function showRandomRomanticPhrase() {
    const phrases = [
        "Para minha princesa, você é o amor da minha vida",
        "Meu coração bate só por você",
        "Você é minha felicidade completa",
        "Para sempre ao seu lado, minha princesa"
    ];
    
    setInterval(() => {
        if (!gameState.isGameActive || gameState.gameCompleted) {
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            showGameMessage(phrase, 'start');
        }
    }, 15000);
}

function updateMovesCounter() {
    const movesElement = document.getElementById('movesCount');
    movesElement.textContent = gameState.moves;
    
    // Adicionar animação ao contador
    movesElement.style.animation = 'counterPulse 0.3s ease';
    setTimeout(() => {
        movesElement.style.animation = '';
    }, 300);
}

function completeGame() {
    gameState.isGameActive = false;
    gameState.gameCompleted = true;
    
    const endTime = Date.now();
    const gameTime = Math.round((endTime - gameState.startTime) / 1000);
    
    // Verificar se é um novo recorde
    if (!gameState.bestTime || gameTime < gameState.bestTime) {
        gameState.bestTime = gameTime;
        localStorage.setItem('bestTime', gameTime);
    }
    
    const completionDiv = document.getElementById('gameCompletion');
    completionDiv.style.display = 'block';
    
    // Adicionar informações de tempo
    const timeInfo = document.createElement('div');
    timeInfo.style.cssText = `
        margin: 1rem 0;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        color: #718096;
    `;
    timeInfo.innerHTML = `
        <p>Tempo: ${gameTime}s | Movimentos: ${gameState.moves}</p>
        ${gameState.bestTime ? `<p>Melhor tempo: ${gameState.bestTime}s</p>` : ''}
    `;
    
    const completionMessage = completionDiv.querySelector('.completion-message');
    completionMessage.after(timeInfo);
    
    // Adicionar confetes e celebração elaborada
    createElaborateCelebration();
    
    // Mostrar mensagem de conclusão romântica
    setTimeout(() => {
        showGameMessage(getRandomPhrase('completion'), 'completion');
    }, 1000);
}

function createElaborateCelebration() {
    const gameSection = document.querySelector('.game-section');
    
    // Confetes coloridos
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: ${8 + Math.random() * 6}px;
            height: ${8 + Math.random() * 6}px;
            background: ${['#f8d7da', '#d4af37', '#fce4ec', '#e8b4b8', '#f4e4bc'][Math.floor(Math.random() * 5)]};
            left: ${Math.random() * 100}%;
            top: 10%;
            animation: confettiFall ${3 + Math.random() * 2}s ease-out forwards;
            z-index: 1000;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        `;
        
        gameSection.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Corações flutuantes
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = ['💖', '💕', '💝', '🌹', '✨'][Math.floor(Math.random() * 5)];
        heart.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: 20%;
            font-size: ${1.5 + Math.random()}rem;
            animation: heartFloat ${4 + Math.random() * 2}s ease-out forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        
        gameSection.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}

function restartGame() {
    // Resetar estado do jogo
    gameState = {
        flippedCards: [],
        matchedPairs: 0,
        moves: 0,
        isGameActive: true,
        gameCompleted: false,
        totalPairs: 6,
        startTime: Date.now(),
        bestTime: localStorage.getItem('bestTime') || null,
        consecutiveMatches: 0,
        currentPhrase: 0
    };
    
    // Resetar cartas com animação
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.classList.remove('flipped', 'matched');
        card.style.transform = 'scale(0.8) rotateY(90deg)';
        card.style.opacity = '0.5';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.transform = 'scale(1) rotateY(0deg)';
            card.style.opacity = '1';
        }, index * 50);
    });
    
    // Esconder tela de conclusão
    const completionDiv = document.getElementById('gameCompletion');
    completionDiv.style.display = 'none';
    
    // Remover informações de tempo adicionadas
    const timeInfo = completionDiv.querySelector('div:not(.completion-title):not(.completion-message):not(.completion-quote)');
    if (timeInfo && timeInfo.innerHTML.includes('Tempo:')) {
        timeInfo.remove();
    }
    
    // Embaralhar cartas novamente
    setTimeout(() => {
        shuffleCards();
    }, 500);
    
    // Resetar contador
    updateMovesCounter();
    
    // Mostrar nova frase de início
    setTimeout(() => {
        showGameMessage(getRandomPhrase('gameStart'), 'start');
    }, 1000);
}

function revealGallery() {
    const gameSection = document.getElementById('gameSection');
    const gallerySection = document.getElementById('gallerySection');
    
    // Adicionar classe de transição mágica
    gameSection.classList.add('magical-transition');
    
    // Criar efeitos de partículas mágicas durante a transição
    createMagicalParticles();
    
    // Animação de desaparecimento mágico do jogo
    gameSection.style.animation = 'magicalDisappear 2s ease-out forwards';
    
    setTimeout(() => {
        gameSection.style.display = 'none';
        gallerySection.style.display = 'block';
        
        // Revelar a galeria com efeito mágico
        setTimeout(() => {
            gallerySection.classList.add('revealed');
            
            // Revelar fotos uma por uma com efeito mágico
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('gallery-item-reveal');
                    
                    // Adicionar efeito de brilho individual
                    createPhotoSparkles(item);
                }, index * 400);
            });
            
            // Scroll suave para a galeria após todas as animações
            setTimeout(() => {
                gallerySection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mostrar mensagem final romântica
                setTimeout(() => {
                    showGameMessage("Para minha princesa: nossa história de amor em cada foto", 'completion');
                }, 1000);
            }, 1500);
        }, 300);
    }, 2000);
}

function createMagicalParticles() {
    const gameSection = document.querySelector('.game-section');
    
    // Criar partículas mágicas que flutuam durante a transição
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        const symbols = ['✨', '💫', '⭐', '🌟', '💖', '💕', '🌹'];
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${0.8 + Math.random() * 0.8}rem;
            opacity: 0.8;
            animation: magicalFloat ${3 + Math.random() * 2}s ease-out forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        
        gameSection.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

function createPhotoSparkles(photoElement) {
    const rect = photoElement.getBoundingClientRect();
    
    // Criar brilhos ao redor da foto
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = ['✨', '💫', '⭐', '🌟', '💖'][Math.floor(Math.random() * 5)];
        sparkle.style.cssText = `
            position: absolute;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: ${0.8 + Math.random() * 0.7}rem;
            animation: sparkleTrail ${1.5 + Math.random()}s ease-out forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2500);
    }
}

// Sistema de partículas flutuantes melhorado
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    
    // Criar diferentes tipos de partículas
    for (let i = 0; i < CONFIG.particleCount; i++) {
        const particleType = Math.random();
        
        if (particleType < 0.3) {
            createLightParticle(particlesContainer);
        } else if (particleType < 0.6) {
            createHeartParticle(particlesContainer);
        } else if (particleType < 0.8) {
            createGoldParticle(particlesContainer);
        } else {
            createRoseParticle(particlesContainer);
        }
    }
}

function createLightParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle light';
    
    const size = Math.random() * 8 + 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 6 + 8;
    const delay = Math.random() * 4;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: floatGentle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    repositionParticleOnComplete(particle);
}

function createHeartParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle heart';
    particle.innerHTML = ['💕', '💖', '💗', '💙', '💜', '🤍', '💝'][Math.floor(Math.random() * 7)];
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 8 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        animation: floatGentle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    repositionParticleOnComplete(particle);
}

function createGoldParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 3;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 5 + 7;
    const delay = Math.random() * 3;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: floatGentle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    repositionParticleOnComplete(particle);
}

function createRoseParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle rose';
    
    const size = Math.random() * 6 + 4;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 7 + 9;
    const delay = Math.random() * 4;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: floatGentle ${duration}s ease-in-out ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    repositionParticleOnComplete(particle);
}

function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const heart = document.createElement('div');
            heart.innerHTML = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: 100%;
                font-size: ${1 + Math.random() * 0.5}rem;
                animation: floatUp 8s linear forwards;
                z-index: 1;
                pointer-events: none;
                opacity: 0.6;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 8000);
        }
    }, 3000);
}

function repositionParticleOnComplete(particle) {
    particle.addEventListener('animationiteration', () => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
    });
}

// Sistema de galeria interativa aprimorado
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Adicionar eventos de clique para cada item da galeria
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
        
        // Adicionar efeito de hover personalizado aprimorado
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.03)';
            createHoverHearts(item);
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Eventos do modal
    closeModal.addEventListener('click', closeModalHandler);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Fechar modal clicando fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function createHoverHearts(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.cssText = `
            position: absolute;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: 1rem;
            animation: hoverHeart 1.5s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

function openModal(index) {
    currentImageIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImage.src = images[currentImageIndex];
    modalCaption.querySelector('p').textContent = imageCaptions[currentImageIndex];
    modal.style.display = 'block';
    
    // Adicionar classe para animação
    setTimeout(() => {
        modal.classList.add('modal-open');
    }, 10);
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
    
    // Criar efeitos especiais no modal
    createModalSparkles();
}

function createModalSparkles() {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: 1.2rem;
            animation: modalSparkle 3s ease-out forwards;
            pointer-events: none;
            z-index: 1001;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}

function closeModalHandler() {
    const modal = document.getElementById('imageModal');
    
    modal.classList.remove('modal-open');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, CONFIG.animationDuration);
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateModalImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateModalImage();
}

function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Animação de transição aprimorada
    modalImage.style.opacity = '0';
    modalImage.style.transform = 'scale(0.9) rotateY(10deg)';
    
    setTimeout(() => {
        modalImage.src = images[currentImageIndex];
        modalCaption.querySelector('p').textContent = imageCaptions[currentImageIndex];
        modalImage.style.opacity = '1';
        modalImage.style.transform = 'scale(1) rotateY(0deg)';
        
        // Criar efeitos na mudança de imagem
        createModalSparkles();
    }, 200);
}

function handleKeyboardNavigation(e) {
    const modal = document.getElementById('imageModal');
    
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeModalHandler();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    }
}

// Efeitos de scroll suave aprimorados
function initializeScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gameSection = document.querySelector('.game-section');
            gameSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Parallax suave para elementos
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    // Efeito parallax nas partículas
    const particles = document.getElementById('particles');
    if (particles) {
        particles.style.transform = `translateY(${rate}px)`;
    }
    
    // Fade out do scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - scrolled / 400);
        scrollIndicator.style.opacity = opacity;
    }
    
    // Efeito parallax suave nos elementos de fundo (corrigido para não afetar o texto)
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        // Aplicar efeito parallax mais suave e apenas quando a seção hero está visível
        hero.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
}

// Animações de entrada para elementos aprimoradas
function initializeAnimations() {
    // Observer para animações quando elementos entram na viewport
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Criar efeitos especiais para elementos específicos
                if (entry.target.classList.contains('gallery-item')) {
                    setTimeout(() => {
                        createPhotoSparkles(entry.target);
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos da galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Observar outros elementos importantes
    const elementsToObserve = [
        '.gallery-title',
        '.game-title',
        '.love-message',
        '.final-love-message'
    ];
    
    elementsToObserve.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            observer.observe(element);
        }
    });
}

// Otimizações de performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Redimensionamento da janela
window.addEventListener('resize', debounce(() => {
    // Reposicionar partículas
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
    });
}, 300));

// Preload das imagens para melhor performance
function preloadImages() {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar preload quando a página carregar
window.addEventListener('load', preloadImages);

// Suporte aprimorado para gestos touch em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
});

function handleGesture() {
    const modal = document.getElementById('imageModal');
    
    if (modal.style.display === 'block') {
        const swipeThreshold = 50;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Verificar se é um swipe horizontal
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                // Swipe left - próxima imagem
                showNextImage();
            } else {
                // Swipe right - imagem anterior
                showPreviousImage();
            }
        }
        // Verificar se é um swipe vertical para fechar
        else if (Math.abs(diffY) > swipeThreshold && diffY > 0) {
            // Swipe up - fechar modal
            closeModalHandler();
        }
    }
}

// Adicionar CSS dinâmico para animações aprimoradas
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .modal-open {
        animation: modalFadeIn 0.4s ease-out;
    }
    
    @keyframes modalFadeIn {
        from {
            opacity: 0;
            backdrop-filter: blur(0px);
        }
        to {
            opacity: 1;
            backdrop-filter: blur(8px);
        }
    }
    
    .modal-image {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(400px) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes heartFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(-50px) scale(1);
        }
        100% {
            transform: translateY(-300px) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes quickSparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes hoverSparkle {
        0% {
            opacity: 0;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1) translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-40px);
        }
    }
    
    @keyframes hoverHeart {
        0% {
            opacity: 0;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) translateY(-30px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-60px);
        }
    }
    
    @keyframes modalSparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        30% {
            opacity: 1;
            transform: scale(1.5) rotate(120deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes messageAppear {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotateY(90deg);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1) rotateY(0deg);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateY(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) rotateY(-90deg);
        }
    }
    
    @keyframes counterPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); color: #d4af37; }
        100% { transform: scale(1); }
    }
    
    @keyframes consecutiveBonus {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(0deg);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(180deg);
        }
    }
    
    @keyframes energyWave {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    .game-section {
        transition: transform 0.6s ease, opacity 0.6s ease;
    }
    
    .gallery-section {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .game-message {
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .game-message.match {
        animation-duration: 2.5s;
    }
    
    .game-message.completion {
        animation-duration: 4s;
        font-size: 1.4rem;
    }
`;

document.head.appendChild(style);

// Sistema de easter eggs românticos
function initializeEasterEggs() {
    let clickCount = 0;
    const heroTitle = document.querySelector('.couple-names');
    
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                showGameMessage("Você descobriu um segredo! Para minha princesa, com amor infinito 💖", 'completion');
                createElaborateCelebration();
                clickCount = 0;
            }
        });
    }
    
    // Konami code para surpresa especial
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showGameMessage("Código secreto ativado! Você é incrível, minha princesa! 🎉", 'completion');
            createSuperCelebration();
            konamiCode = [];
        }
    });
}

function createSuperCelebration() {
    // Celebração especial com mais efeitos
    for (let i = 0; i < 50; i++) {
        const element = document.createElement('div');
        element.innerHTML = ['💖', '💕', '✨', '🌟', '💝', '🌹', '👑'][Math.floor(Math.random() * 7)];
        element.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${1.5 + Math.random() * 2}rem;
            animation: superCelebration ${2 + Math.random() * 3}s ease-out forwards;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 5000);
    }
}

// Adicionar animação para super celebração
const superStyle = document.createElement('style');
superStyle.textContent = `
    @keyframes superCelebration {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        20% {
            opacity: 1;
            transform: scale(1.5) rotate(180deg);
        }
        80% {
            opacity: 1;
            transform: scale(1) rotate(360deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(720deg);
        }
    }
`;
document.head.appendChild(superStyle);

// Inicializar easter eggs
setTimeout(initializeEasterEggs, 2000);

// Log de inicialização aprimorado
console.log('💖 Landing page Álvaro ❤️ Gabriella APRIMORADA carregada com sucesso! 💖');
console.log('🌹 Para minha princesa, você é o amor da minha vida! 🌹');
console.log('✨ Recursos especiais: Jogo aprimorado, frases românticas, efeitos mágicos e easter eggs! ✨');

