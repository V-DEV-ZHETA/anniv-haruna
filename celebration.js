5// Enhanced celebration functions for the meriah website
function lightCake() {
    createConfetti();
    animateCake();
    createSparkles();
    createParticles();
    showNotification('🎂 Birthday cake is glowing! Happy Birthday!');
}

function createSparkles() {
    const cake = document.querySelector('.cake');
    if (!cake) return;

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        cake.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
}

function createParticles() {
    const cake = document.querySelector('.cake');
    if (!cake) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 1) + 's';
        cake.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

function animateCake() {
    const cake = document.querySelector('.cake');
    if (!cake) return;

    cake.classList.add('cake-glow-enhanced');
    cake.classList.add('cake-press');
    setTimeout(() => {
        cake.classList.remove('cake-glow-enhanced');
        cake.classList.remove('cake-press');
    }, 1500);
}

function animateCake() {
    const cake = document.querySelector('.cake');
    if (!cake) return;

    cake.classList.add('cake-glow-enhanced');
    cake.classList.add('cake-press');
    setTimeout(() => {
        cake.classList.remove('cake-glow-enhanced');
        cake.classList.remove('cake-press');
    }, 1500);
}

function launchFireworks() {
    createFireworks();
    playFireworkSound();
    showNotification('🎆 Spectacular fireworks launched!');
}

function playFireworkSound() {
    // Create audio context for firework sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create multiple explosion sounds for realistic effect
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            const filterNode = audioContext.createBiquadFilter();
            
            oscillator.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Firework explosion sound
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            
            // Add some filtering for explosion effect
            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(2000, audioContext.currentTime);
            filterNode.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5);
            
            // Volume envelope
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, i * 200);
    }
}

function addMagic() {
    createFloatingStars();
    showNotification('✨ Magical sparkles added to the celebration!');
}

function togglePartyMode() {
    document.body.classList.toggle('party-mode-active');
    if (document.body.classList.contains('party-mode-active')) {
        startPartyMode();
        showNotification('🎉 Party Mode Activated! Let\'s celebrate!');
    } else {
        stopPartyMode();
        showNotification('Party Mode Deactivated');
    }
}

function createFireworks() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#A8E6CF'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * 100 + 'vw';
            firework.style.top = Math.random() * 50 + 50 + 'vh';
            firework.style.width = '4px';
            firework.style.height = '4px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.borderRadius = '50%';
            firework.style.boxShadow = `0 0 20px ${colors[Math.floor(Math.random() * colors.length)]}`;
            firework.style.animation = 'firework-explosion 1s ease-out forwards';
            firework.style.zIndex = '9999';
            document.body.appendChild(firework);
            
            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, i * 200);
    }
}

function createFloatingStars() {
    const starsContainer = document.getElementById('floating-stars');
    if (!starsContainer) return;
    
    const starSymbols = ['✨', '⭐', '💫', '🌟', '✦', '✧'];
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.classList.add('floating-star');
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDelay = Math.random() * 8 + 's';
        star.style.animationDuration = (Math.random() * 4 + 6) + 's';
        star.style.fontSize = (Math.random() * 20 + 15) + 'px';
        starsContainer.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 10000);
    }
}

function startPartyMode() {
    // Add rainbow background animation
    document.body.classList.add('rainbow-bg');
    
    // Create continuous effects
    const partyInterval = setInterval(() => {
        createConfetti();
        createFloatingStars();
    }, 3000);
    
    // Store interval ID for cleanup
    window.partyInterval = partyInterval;
}

function stopPartyMode() {
    document.body.classList.remove('rainbow-bg');
    if (window.partyInterval) {
        clearInterval(window.partyInterval);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FF6B6B, #FFD700);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 10000;
        animation: notification-pop 0.5s ease-out;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notification-fade 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Enhanced confetti with more colors and effects
function createEnhancedConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD700', '#A8E6CF', '#FFD3A5', '#FF9FF3', '#54A0FF'];
    const shapes = ['circle', 'square', 'triangle'];
    
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.style.position = 'absolute';
        confettiPiece.style.width = Math.random() * 10 + 5 + 'px';
        confettiPiece.style.height = Math.random() * 10 + 5 + 'px';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.top = '-10px';
        confettiPiece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '0';
        confettiPiece.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiPiece.style.animationDelay = Math.random() * 2 + 's';
        
        confettiContainer.appendChild(confettiPiece);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Initialize celebration features
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes notification-pop {
            0% { transform: translateX(-50%) scale(0); opacity: 0; }
            100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        
        @keyframes notification-fade {
            0% { transform: translateX(-50%) scale(1); opacity: 1; }
            100% { transform: translateX(-50%) scale(0); opacity: 0; }
        }
        
        @keyframes firework-explosion {
            0% { transform: scale(0); opacity: 1; }
            50% { transform: scale(20); opacity: 0.5; }
            100% { transform: scale(40); opacity: 0; }
        }
        
        .party-mode-active {
            animation: rainbow-bg 3s ease infinite;
        }
        
        @keyframes rainbow-bg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create initial floating stars
    setTimeout(() => {
        createFloatingStars();
    }, 1000);
});

// Export functions for global use
window.celebrationFunctions = {
    lightCake,
    launchFireworks,
    addMagic,
    togglePartyMode,
    createFloatingStars,
    createEnhancedConfetti
};
