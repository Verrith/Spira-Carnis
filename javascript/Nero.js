/**
 * SYSTÈME "ESPRIT GUIDE" (MINIMALISTE)
 * Une seule entité lumineuse avec une traînée fluide.
 */
const canvas = document.getElementById('spirit-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = []; // Ici, ce sera la traînée
const spirit = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    angle: 0,
    radius: 150,
    speed: 0.015
};

// Gestion de la souris (l'esprit suit la souris avec douceur)
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Classe pour la traînée
class TrailParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.life = 1; // Opacité
        this.decay = Math.random() * 0.02 + 0.015; // Vitesse de disparition
    }
    update() {
        this.life -= this.decay;
    }
    draw() {
        ctx.fillStyle = `rgba(255, 215, 0, ${this.life * 0.6})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    // Effet de traînée : on n'efface pas tout, on dessine un rectangle semi-transparent
    ctx.fillStyle = 'rgba(15, 15, 17, 0.2)'; 
    ctx.fillRect(0, 0, width, height);

    // 1. Calculer la position de l'Esprit (Orbite autour de la souris)
    spirit.angle += spirit.speed;
    
    // L'esprit orbite autour de la position de la souris, pas du centre de l'écran
    const targetX = mouse.x + Math.cos(spirit.angle) * spirit.radius;
    const targetY = mouse.y + Math.sin(spirit.angle) * spirit.radius;

    // Mouvement fluide (Lerp) vers la position cible
    spirit.x += (targetX - spirit.x) * 0.05;
    spirit.y += (targetY - spirit.y) * 0.05;

    // 2. Ajouter des particules de traînée à la position de l'esprit
    particles.push(new TrailParticle(spirit.x, spirit.y));
    
    // Ajouter une particule centrale plus brillante (le coeur de l'esprit)
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#FFD700';
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(spirit.x, spirit.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset pour les particules de traînée

    // 3. Mettre à jour et dessiner la traînée
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Supprimer les particules mortes
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();

/**
 * ANIMATION DE LA CARTE (3D & APPARITION)
 */
const card = document.getElementById('card');

// Effet 3D doux
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Apparition au chargement
window.addEventListener('load', () => {
    card.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';

    // Apparition des liens en cascade
    const links = document.querySelectorAll('.link-item');
    links.forEach((link, i) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-10px)';
        link.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.transform = 'translateX(0)';
        }, 400 + (i * 100));
    });
    
    // Apparition du bouton retour (léger délai)
    const backBtn = document.querySelector('.back-btn');
    if(backBtn) {
        backBtn.style.opacity = '0';
        backBtn.style.transition = 'opacity 0.5s ease 0.8s'; // Délai de 0.8s
        setTimeout(() => {
            backBtn.style.opacity = '1';
        }, 800);
    }
});