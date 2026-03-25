/**
 * MOTEUR SOUL - JS AVANCÉ
 * Gère : Particules physiques, Interaction souris, Effet d'aspiration, Glitch aléatoire
 */

// --- CONFIGURATION ---
const CONFIG = {
    particleCount: 120,
    baseSpeed: 0.5,
    mouseRepulsionRadius: 150,
    mouseRepulsionForce: 2,
    soulColor: '107, 140, 255', // RGB
    breathCycle: 4000 // ms
};

// --- SETUP CANVAS ---
const canvas = document.getElementById('soul-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouse = { x: -1000, y: -1000, isMoving: false };
let breathValue = 0; // Pour l'effet de respiration (0 à 1)

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- GESTION DE LA SOURIS & CURSEUR ---
const cursor = document.getElementById('cursor');
// Sélectionne tous les éléments interactifs (liens + avatar + nouveau bouton retour)
const links = document.querySelectorAll('.js-link, .avatar-box');

document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isMoving = true;
    
    // Déplacement fluide du curseur personnalisé
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Effet de survol sur les liens
links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// --- CLASSE PARTICULE ---
class Particle {
    constructor() {
        this.init(true);
    }

    init(randomY = false) {
        this.x = Math.random() * width;
        this.y = randomY ? Math.random() * height : height + 10;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -(Math.random() * CONFIG.baseSpeed + 0.2);
        this.size = Math.random() * 2.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.oscillationOffset = Math.random() * Math.PI * 2;
        this.life = 1;
        this.state = 'floating'; // floating, sucked
    }

    update() {
        // 1. Mouvement de base (flottaison)
        if (this.state === 'floating') {
            this.y += this.vy;
            this.x += this.vx + Math.sin(Date.now() * 0.001 + this.oscillationOffset) * 0.2;

            // Respiration du monde (variation de vitesse)
            const breathFactor = 1 + (breathValue * 0.3);
            this.y -= this.vy * (breathFactor - 1); 

            // Interaction Souris (Répulsion)
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < CONFIG.mouseRepulsionRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (CONFIG.mouseRepulsionRadius - dist) / CONFIG.mouseRepulsionRadius;
                const pushX = Math.cos(angle) * force * CONFIG.mouseRepulsionForce;
                const pushY = Math.sin(angle) * force * CONFIG.mouseRepulsionForce;
                
                this.x += pushX;
                this.y += pushY;
            }

            // Reset si hors écran
            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.init(false);
            }
        } 
        // 2. État "Aspiré" (au clic)
        else if (this.state === 'sucked') {
            const dx = clickTarget.x - this.x;
            const dy = clickTarget.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 5) {
                this.init(true); // Reset après absorption
            } else {
                this.x += dx * 0.15; // Vitesse d'aspiration
                this.y += dy * 0.15;
                this.size *= 0.95; // Rétrécit en approchant
            }
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${CONFIG.soulColor}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        if (this.size > 1.5) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${CONFIG.soulColor}, 0.8)`;
        } else {
            ctx.shadowBlur = 0;
        }
    }
}

// --- INITIALISATION ---
function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// --- BOUCLE D'ANIMATION ---
let clickTarget = { x: 0, y: 0 };
let lastTime = 0;

function animate(time) {
    const deltaTime = time - lastTime;
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    
    // Effet de respiration globale (Sinusoid)
    breathValue = (Math.sin(time / CONFIG.breathCycle) + 1) / 2;
    canvas.style.opacity = 0.6 + (breathValue * 0.2);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// --- INTERACTION CLIC "ABSORPTION D'ÂME" ---
document.addEventListener('click', (e) => {
    // Définir la cible d'aspiration
    clickTarget = { x: e.clientX, y: e.clientY };

    // Aspirer les particules proches
    particles.forEach(p => {
        const dx = p.x - e.clientX;
        const dy = p.y - e.clientY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 300) {
            p.state = 'sucked';
        }
    });

    // Déclencher un glitch aléatoire sur le titre
    triggerGlitch();
});

// --- EFFET GLITCH ALÉATOIRE ---
const title = document.querySelector('h1');
function triggerGlitch() {
    if (Math.random() > 0.3) return; // 70% de chance de glitch au clic
    document.body.classList.add('glitch-active');
    setTimeout(() => {
        document.body.classList.remove('glitch-active');
    }, 200 + Math.random() * 300);
}

// Glitch aléatoire spontané (rare)
setInterval(() => {
    if (Math.random() > 0.95) triggerGlitch();
}, 2000);

// --- ANIMATION TEXTE (TYPEWRITER) ---
const subtitleEl = document.getElementById('subtitle');
const text = "Gardien des Rêves";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        subtitleEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}
setTimeout(typeWriter, 800);