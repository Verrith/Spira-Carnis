// --- EFFET GLITCH SUR LES LIENS ---
const links = document.querySelectorAll('.horror-link');

links.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.classList.add('glitch-active');
        const originalText = link.getAttribute('data-text');
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?';
        let iterations = 0;
                
        const interval = setInterval(() => {
            link.innerText = originalText.split('')
                .map((letter, index) => {
                    if(index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
                    
            if(iterations >= originalText.length) clearInterval(interval);
            iterations += 1/3;
        }, 30);
    });

    link.addEventListener('mouseleave', () => {
        link.classList.remove('glitch-active');
        link.innerText = link.getAttribute('data-text');
    });
});

// --- MESSAGES FANTÔMES PERSONNALISÉS ---
const whispers = [
    "La ville t'appelle...",
    "Ne fais pas confiance aux miroirs.",
    "Il est dans ton reflet.",
    "Tu entends ce bruit ?",
    "La spirale ne finit jamais.",
    "Réveille-toi.",
    "Ce n'est qu'un cauchemar.",
    "Heather sait la vérité.",
    "Fuis avant qu'il ne soit trop tard.",
    "Le brouillard se lève..."
];

function createWhisper() {
    const whisper = document.createElement('div');
    whisper.classList.add('whisper');
    whisper.innerText = whispers[Math.floor(Math.random() * whispers.length)];
            
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    whisper.style.left = `${x}px`;
    whisper.style.top = `${y}px`;
            
    document.body.appendChild(whisper);

    setTimeout(() => { whisper.style.opacity = 0.7; }, 100);
    setTimeout(() => { whisper.style.opacity = 0; }, 5000);
    setTimeout(() => { whisper.remove(); }, 7000);
}

setInterval(() => {
    if(Math.random() > 0.6) createWhisper(); // 40% de chance toutes les 2-5 secondes
}, Math.random() * 3000 + 2000);

// --- EFFET SUR LE NOM "HEATHER" ---
const nameElement = document.querySelector('.profile-name');
        
 setInterval(() => {
    if(Math.random() > 0.92) { // 8% de chance
        const originalColor = nameElement.style.color;
        nameElement.style.color = '#8a0b0b';
        nameElement.style.textShadow = '0 0 10px #8a0b0b';
        nameElement.style.transform = 'skewX(5deg)';
        
                setTimeout(() => {
            nameElement.style.color = '';
            nameElement.style.textShadow = '';
            nameElement.style.transform = '';
        }, 250);
    }
}, 1500);

// --- EFFET SUR L'IMAGE AU CHARGEMENT ---
window.addEventListener('load', () => {
    const img = document.getElementById('heather-img');
    img.style.filter = 'grayscale(100%) contrast(130%)';
    setTimeout(() => {
        img.style.filter = 'grayscale(80%) contrast(110%)';
    }, 800);
});