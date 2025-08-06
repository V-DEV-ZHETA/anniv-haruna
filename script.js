// Global Variables
let birthdayMusic;
let confettiInterval;
let countdownInterval;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize components
    initializeNavigation();
    initializeCountdown();
    initializeMusic();
    initializeForms();
    initializeAnimations();
    initializeInteractiveElements();
}

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling
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
}

// Countdown functionality
function initializeCountdown() {
    // Set the date we're counting down to (you can change this)
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 0.5); // 7 days from now
    countDownDate.setHours(0, 0, 0, 0);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the display
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            celebrateBirthday();
        }
    }, 1000);
}

// Music functionality
function initializeMusic() {
    birthdayMusic = document.getElementById('birthday-music');
    birthdayMusic.volume = 0.3;
}

function toggleMusic() {
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        showNotification('🎵 Music playing!');
    } else {
        birthdayMusic.pause();
        showNotification('🔇 Music paused');
    }
}

// Form handling
function initializeForms() {
    const messageForm = document.getElementById('message-form');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name-input').value;
        const message = document.getElementById('message-input').value;
        
        if (name && message) {
            addMessage(name, message);
            messageForm.reset();
            showNotification('✨ Message added successfully!');
        }
    });
}

function addMessage(name, message) {
    const messagesContainer = document.querySelector('.messages-container');
    
    const messageCard = document.createElement('div');
    messageCard.className = 'message-card';
    messageCard.style.animation = 'slideInUp 0.5s ease';
    
    messageCard.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="message-content">
            <h4>${name}</h4>
            <p>${message}</p>
            <span class="message-time">Just now</span>
        </div>
    `;
    
    messagesContainer.insertBefore(messageCard, messagesContainer.firstChild);
}

// Interactive elements
function initializeInteractiveElements() {
    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('button, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

// Celebration functions
function startCelebration() {
    createConfetti();
    playCelebrationSound();
    showNotification('🎉 Let the celebration begin!');
    
    // Scroll to countdown section
    document.getElementById('countdown').scrollIntoView({
        behavior: 'smooth'
    });
}

function celebrateBirthday() {
    createConfetti();
    playCelebrationSound();
    showNotification('🎂 Happy Birthday! The celebration has begun!');
    
    // Start birthday music
    if (birthdayMusic.paused) {
        birthdayMusic.play();
    }
}

// Confetti animation
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + 'vw';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 3 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confettiPiece);
    }

    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Ripple effect for buttons
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animation utilities
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.gallery-item, .message-card, .countdown-item').forEach(el => {
        observer.observe(el);
    });
}

// Sound effects
function playCelebrationSound() {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a simple beep sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic background color change based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    const hue = Math.floor(scrollPercent * 360);
    document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${hue + 60}, 70%, 50%) 100%)`;
});

// Easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    showNotification('🎮 Easter egg activated! Special celebration mode!');
    createConfetti();
    
    // Change all colors to rainbow
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Navigation function for confetti icon
function navigateToCelebration() {
    // Create confetti effect before navigation
    createConfetti();
    
    // Show notification
    showNotification('🎊 Navigating to surprise page...');
    
    // Navigate to the celebration page after a short delay
    setTimeout(() => {
        window.location.href = 'https://harunadancecover.netlify.app/';
    }, 1000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
window.addEventListener('load', () => {
    console.log('🎉 Idol Community Birthday Website Loaded Successfully!');
    console.log('💜 Made with love for all the amazing fans!');
});
