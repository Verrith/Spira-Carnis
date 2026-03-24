// --- 1. Effet Machine à écrire pour le sous-titre ---
        const subtitleText = "INSERT COIN TO START...";
        const subtitleElement = document.getElementById('typewriter');
        let i = 0;

        function typeWriter() {
            if (i < subtitleText.length) {
                subtitleElement.innerHTML += subtitleText.charAt(i);
                i++;
                setTimeout(typeWriter, 50 + Math.random() * 50); // Vitesse aléatoire pour effet rétro
            } else {
                // Clignotement à la fin
                subtitleElement.style.borderRight = "2px solid var(--accent-green)";
                setInterval(() => {
                    subtitleElement.style.borderRight = subtitleElement.style.borderRight === "2px solid transparent" ? "2px solid var(--accent-green)" : "2px solid transparent";
                }, 500);
            }
        }
        
        // Lancer l'écriture après un court délai
        setTimeout(typeWriter, 500);

        // --- 2. Effet Glitch Aléatoire ---
        const container = document.getElementById('mainCard');
        const title = document.getElementById('mainTitle');
        const footer = document.getElementById('footerText');
        const messages = ["SYSTEM ERROR", "RELOADING...", "DON'T BLINK", "BUCKSHOT", "12 GAUGE", "WAITING..."];

        function triggerGlitch() {
            // Ajoute la classe de tremblement
            container.classList.add('glitch-active');
            title.classList.add('text-glitch');
            
            // Change le texte du footer aléatoirement pendant le glitch
            const originalFooter = footer.innerText;
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            footer.innerText = randomMsg;
            footer.style.color = "var(--accent-green)";

            // Son simulé (visuel seulement ici, mais prêt pour audio)
            // if(audio) audio.play(); 

            setTimeout(() => {
                container.classList.remove('glitch-active');
                title.classList.remove('text-glitch');
                footer.innerText = originalFooter;
                footer.style.color = "";
            }, 300); // Durée du glitch

            // Prochain glitch aléatoire entre 2 et 6 secondes
            const nextGlitch = Math.random() * 4000 + 2000;
            setTimeout(triggerGlitch, nextGlitch);
        }

        // Lancer le premier glitch
        setTimeout(triggerGlitch, 3000);

        // --- 3. Effet de parallaxe souris (3D Tilt) ---
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Applique une légère rotation au conteneur
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset de la position quand la souris sort
        document.addEventListener('mouseleave', () => {
            container.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });

        // --- 4. Interaction Boutons (Son de clic simulé visuellement) ---
        const buttons = document.querySelectorAll('.link-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousedown', () => {
                btn.style.transform = "scale(0.95)";
                btn.style.borderColor = "#fff";
            });
            btn.addEventListener('mouseup', () => {
                btn.style.transform = "scale(1)";
                btn.style.borderColor = "var(--text-main)";
            });
        });
