// --- 1. SCRIPT GLITCH SUR LES LIENS ---
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

        // --- 2. EFFET LIGNE VHS (TRACKING) ---
        const vhsLine = document.getElementById('vhs-line');
        
        function triggerVHSLine() {
            const randomTop = Math.random() * 100;
            vhsLine.style.top = randomTop + '%';
            vhsLine.style.opacity = Math.random() * 0.5 + 0.2;
            
            const duration = Math.random() * 200 + 100;

            setTimeout(() => {
                vhsLine.style.opacity = '0';
            }, duration);

            setTimeout(triggerVHSLine, Math.random() * 3000 + 1000);
        }
        
        setTimeout(triggerVHSLine, 1000);

        // --- 3. EFFET GLITCH TEXTUEL ALÉATOIRE SUR LE TITRE ---
        const title = document.querySelector('h1');
        
        setInterval(() => {
            if(Math.random() > 0.95) {
                const skew = (Math.random() * 20 - 10) + 'deg';
                const blur = (Math.random() * 2) + 'px';
                
                title.style.transform = `skew(${skew})`;
                title.style.filter = `blur(${blur})`;
                title.style.textShadow = `${Math.random()*4 - 2}px 0 red, ${Math.random()*4 - 2}px 0 blue`;

                setTimeout(() => {
                    title.style.transform = 'skew(0deg)';
                    title.style.filter = 'blur(0px)';
                    title.style.textShadow = 'none';
                }, 100);
            }
        }, 500);

        // --- 4. MESSAGES FANTÔMES ---
        const whispers = [
            "In my restless dreams", "I see that town", "Waiting for you...", "Silent Hill"
        ];

        function createWhisper() {
            const whisper = document.createElement('div');
            whisper.innerText = whispers[Math.floor(Math.random() * whispers.length)];
            whisper.style.position = 'fixed';
            whisper.style.color = 'rgba(255, 255, 255, 0.3)';
            whisper.style.fontFamily = "'Special Elite', cursive";
            whisper.style.pointerEvents = 'none';
            whisper.style.zIndex = '5';
            whisper.style.transition = 'opacity 2s';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            whisper.style.left = `${x}px`;
            whisper.style.top = `${y}px`;
            
            document.body.appendChild(whisper);

            setTimeout(() => { whisper.style.opacity = 0.8; }, 100);
            setTimeout(() => { whisper.style.opacity = 0; }, 4000);
            setTimeout(() => { whisper.remove(); }, 6000);
        }

        setInterval(() => {
            if(Math.random() > 0.7) createWhisper();
        }, 3000);