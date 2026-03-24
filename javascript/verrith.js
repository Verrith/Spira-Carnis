// 1. Effet Glitch sur les liens
        const links = document.querySelectorAll('.horror-link');

        links.forEach(link => {
            link.addEventListener('mouseover', () => {
                link.classList.add('glitch-active');
                const originalHTML = link.getAttribute('data-text');
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?';
                let iterations = 0;
                
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = originalHTML;
                const originalTextOnly = tempDiv.innerText || originalHTML;
                
                const interval = setInterval(() => {
                    const randomText = originalTextOnly.split('')
                        .map((letter, index) => {
                            if(index < iterations) return originalTextOnly[index];
                            if(letter === ' ') return ' ';
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('');
                    
                    link.innerText = randomText; 
                    
                    if(iterations >= originalTextOnly.length) {
                        clearInterval(interval);
                        link.innerHTML = originalHTML; 
                    }
                    iterations += 1/3;
                }, 30);
            });

            link.addEventListener('mouseleave', () => {
                link.classList.remove('glitch-active');
                link.innerHTML = link.getAttribute('data-text');
            });
        });

        // --- 2. MESSAGES FANTÔMES ---
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
            if(Math.random() > 0.6) createWhisper();
        }, Math.random() * 3000 + 2000);

        // --- 3. EFFET SUR LE NOM "VERRITH" ---
        const nameElement = document.querySelector('.profile-name');
        
        setInterval(() => {
            if(Math.random() > 0.92) {
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

        // --- 4. EFFET IMAGE AU CHARGEMENT ---
        window.addEventListener('load', () => {
            const img = document.getElementById('heather-img');
            img.style.filter = 'grayscale(100%) contrast(130%)';
            setTimeout(() => {
                img.style.filter = ''; // Retour à la classe CSS par défaut
            }, 800);
        });

        // --- 5. EFFET BANDE VHS (TRACKING) AMÉLIORÉ ---
        const vhsBar = document.getElementById('vhs-bar');
        const crtScreen = document.getElementById('crt-screen');
        
        function triggerVHSBar() {
            // Position aléatoire
            const randomTop = Math.random() * 100;
            vhsBar.style.top = randomTop + '%';
            vhsBar.style.opacity = '0.6';
            
            // Effet de distorsion rapide sur tout l'écran pendant la bande
            crtScreen.style.animation = 'none'; // Stop jitter
            crtScreen.offsetHeight; /* trigger reflow */
            crtScreen.style.animation = 'vhs-jitter 0.1s infinite'; // Jitter rapide

            setTimeout(() => {
                vhsBar.style.opacity = '0';
                crtScreen.style.animation = 'vhs-jitter 3s infinite'; // Retour jitter lent
            }, 200);

            // Relance aléatoire
            setTimeout(triggerVHSBar, Math.random() * 4000 + 2000);
        }
        
        // Démarrage
        setTimeout(triggerVHSBar, 2000);

        // --- 6. AJOUT DU JITTER GLOBAL DOUX ---
        // Appliqué via CSS sur .crt-wrapper, mais on peut l'activer ici si besoin
        crtScreen.style.animation = 'vhs-jitter 3s infinite';