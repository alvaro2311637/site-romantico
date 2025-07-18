// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Inicializar todas as funcionalidades
    initQuoteRotation();
    initLoveStats();
    createFloatingHearts();
    initParallaxEffect();
    initPhotoInteractions();
    initCustomCursor();
    initHeartClickEffect();
    initRomanticSounds();
    
    // Adicionar efeito de entrada suave
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Rotação de frases românticas
function initQuoteRotation() {
    const quotes = document.querySelectorAll('.quote');
    let currentQuote = 0;
    
    if (quotes.length === 0) return;
    
    setInterval(() => {
        quotes[currentQuote].classList.remove('active');
        currentQuote = (currentQuote + 1) % quotes.length;
        quotes[currentQuote].classList.add('active');
    }, 4000);
}

// Animação dos números das estatísticas
function initLoveStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element) => {
        const target = element.getAttribute('data-target');
        if (target === '∞') {
            element.textContent = '∞';
            return;
        }
        
        const targetNum = parseInt(target);
        const duration = 2000;
        const increment = targetNum / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
            element.classList.add('counting');
        }, 16);
    };
    
    // Observador para animar quando entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    setTimeout(() => animateNumber(statNumber), 500);
                }
            }
        });
    });
    
    document.querySelectorAll('.stat-item').forEach(item => {
        observer.observe(item);
    });
}

// Função para criar corações flutuantes dinâmicos
function createFloatingHearts() {
    const heroSection = document.querySelector('.hero');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '💟'];
    
    setInterval(() => {
        if (Math.random() > 0.6) {
            const heart = document.createElement('div');
            heart.className = 'dynamic-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 25 + 15}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                opacity: 0.8;
                pointer-events: none;
                z-index: 1;
                animation: floatUp ${3 + Math.random() * 2}s ease-out forwards;
            `;
            
            heroSection.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 5000);
        }
    }, 1500);
}

// Efeito de parallax suave
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-hearts');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        // Efeito parallax nas estatísticas
        const loveStats = document.querySelector('.love-stats');
        if (loveStats) {
            const rect = loveStats.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.1;
                loveStats.style.transform = `translateY(${scrolled * speed}px)`;
            }
        }
    });
}

// Interatividade das fotos melhorada
function initPhotoInteractions() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach((card, index) => {
        // Efeito de hover com partículas
        card.addEventListener('mouseenter', () => {
            card.classList.add('photo-hover');
            createHeartParticles(card);
            playHoverSound();
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('photo-hover');
        });
        
        // Efeito de clique para ampliar
        card.addEventListener('click', () => {
            openPhotoModal(card.querySelector('img'));
            playClickSound();
        });
        
        // Efeito de toque para mobile
        card.addEventListener('touchstart', () => {
            card.classList.add('photo-hover');
            createHeartParticles(card);
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.classList.remove('photo-hover');
            }, 300);
        });
    });
}

// Criar partículas de coração melhoradas
function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💞'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            particle.className = 'heart-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: ${15 + Math.random() * 10}px;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat ${2 + Math.random()}s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 3000);
        }, i * 150);
    }
}

// Modal melhorado para ampliar fotos
function openPhotoModal(img) {
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.4s ease;
        backdrop-filter: blur(10px);
    `;
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(244, 114, 182, 0.3);
        transform: scale(0.8);
        transition: transform 0.4s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 30px;
        right: 40px;
        background: rgba(244, 114, 182, 0.8);
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10001;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'rgba(190, 24, 93, 0.9)';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'rgba(244, 114, 182, 0.8)';
        closeBtn.style.transform = 'scale(1)';
    });
    
    // Adicionar frase romântica no modal
    const modalCaption = document.createElement('div');
    modalCaption.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.5rem;
        font-family: 'Dancing Script', cursive;
        text-align: center;
        opacity: 0;
        transition: opacity 0.6s ease 0.3s;
    `;
    modalCaption.textContent = '"Momentos que ficam para sempre no coração"';
    
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    modal.appendChild(modalCaption);
    document.body.appendChild(modal);
    
    // Animação de entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
        modalCaption.style.opacity = '1';
    }, 10);
    
    // Fechar modal
    const closeModal = () => {
        modal.style.opacity = '0';
        modalImg.style.transform = 'scale(0.8)';
        modalCaption.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 400);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function handleKeyPress(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeyPress);
        }
    });
}

// Cursor personalizado melhorado
function initCustomCursor() {
    if (isMobile()) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 25px;
        height: 25px;
        background: radial-gradient(circle, #f472b6, #be185d);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.15s ease;
        opacity: 0;
        box-shadow: 0 0 20px rgba(244, 114, 182, 0.5);
    `;
    
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 12.5 + 'px';
        cursor.style.top = e.clientY - 12.5 + 'px';
        cursor.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.8';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Efeito especial em elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .photo-card, .stat-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.8)';
            cursor.style.background = 'radial-gradient(circle, #fbbf24, #f59e0b)';
            cursor.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.7)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #f472b6, #be185d)';
            cursor.style.boxShadow = '0 0 20px rgba(244, 114, 182, 0.5)';
        });
    });
}

// Efeito de clique em corações
function initHeartClickEffect() {
    document.addEventListener('click', (e) => {
        createInteractiveHeart(e.clientX, e.clientY);
    });
}

function createInteractiveHeart(x, y) {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💞'];
    const heart = document.createElement('div');
    heart.className = 'interactive-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x - 15 + 'px';
    heart.style.top = y - 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 3000);
}

// Sistema de sons românticos
function initRomanticSounds() {
    // Criar contexto de áudio
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Áudio não suportado');
        return;
    }
    
    // Sons sintéticos suaves
    window.playHoverSound = () => {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.type = 'sine';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };
    
    window.playClickSound = () => {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.05);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
        
        oscillator.type = 'triangle';
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    };
    
    // Ativar contexto de áudio na primeira interação
    document.addEventListener('click', function initAudio() {
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
}

// Função para detectar dispositivos móveis
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Adicionar estilos CSS dinâmicos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        100% {
            transform: translateY(-250px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-120px) scale(0.3) rotate(180deg);
            opacity: 0;
        }
    }
    
    .photo-hover {
        transform: translateY(-15px) scale(1.03) !important;
        box-shadow: 0 25px 50px rgba(190, 24, 93, 0.4) !important;
    }
    
    .heart-particle {
        animation: particleFloat 2s ease-out forwards;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none !important;
        }
    }
    
    .photo-modal {
        cursor: pointer;
    }
    
    .photo-modal img {
        cursor: default;
    }
    
    .interactive-heart {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        font-size: 2rem;
        animation: floatAwayHeart 3s ease-out forwards;
    }
    
    @keyframes floatAwayHeart {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            transform: translateY(-150px) scale(0.3) rotate(360deg);
            opacity: 0;
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Inicializar cards das fotos com estado inicial
document.querySelectorAll('.photo-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
});

// Animação de entrada das fotos
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.photo-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 800);
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

