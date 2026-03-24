        document.addEventListener('DOMContentLoaded', () => {
            
            /* ==========================================
               1. FOND FLUIDE SANGUIN (CANVAS)
               ========================================== */
            const canvas = document.getElementById('fluid-canvas');
            const ctx = canvas.getContext('2d');
            
            let width, height;
            let particles = [];
            
            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resize);
            resize();

            class FluidParticle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = (Math.random() - 0.5) * 0.5;
                    this.vy = (Math.random() - 0.5) * 0.5;
                    this.size = Math.random() * 50 + 20;
                    this.color = `rgba(${Math.random()*50 + 50}, 0, 0, ${Math.random() * 0.3 + 0.1})`;
                }
                update() {
                    this.x += this.vx;
                    this.y += this.vy;
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }

            for (let i = 0; i < 40; i++) particles.push(new FluidParticle());

            function animateFluid() {
                ctx.clearRect(0, 0, width, height);
                // Gradient de fond
                const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
                gradient.addColorStop(0, '#1a0505');
                gradient.addColorStop(1, '#000000');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);

                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                
                // Relier les particules proches
                ctx.strokeStyle = 'rgba(139, 0, 0, 0.05)';
                ctx.lineWidth = 1;
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }
                requestAnimationFrame(animateFluid);
            }
            animateFluid();

            /* ==========================================
               2. CURSOR MAGNÉTIQUE & PARTICULES
               ========================================== */
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorCircle = document.querySelector('.cursor-circle');
            const magnetElements = document.querySelectorAll('a, h1, h2, .member-card');
            let mouseX = 0, mouseY = 0;
            let dotX = 0, dotY = 0;
            let circleX = 0, circleY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                // Création de particules
                if (Math.random() > 0.7) {
                    createParticle(mouseX, mouseY);
                }
            });

            function createParticle(x, y) {
                const p = document.createElement('div');
                p.classList.add('particle');
                p.style.left = x + 'px';
                p.style.top = y + 'px';
                document.body.appendChild(p);
                setTimeout(() => p.remove(), 1000);
            }

            function animateCursor() {
                // Lerp pour le point
                dotX += (mouseX - dotX) * 0.3;
                dotY += (mouseY - dotY) * 0.3;
                cursorDot.style.left = dotX + 'px';
                cursorDot.style.top = dotY + 'px';

                // Lerp pour le cercle (plus lent)
                circleX += (mouseX - circleX) * 0.15;
                circleY += (mouseY - circleY) * 0.15;
                cursorCircle.style.left = circleX + 'px';
                cursorCircle.style.top = circleY + 'px';

                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            magnetElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
            });

            /* ==========================================
               3. PARALLAXE 3D & VIBRATION
               ========================================== */
            const hero = document.getElementById('hero');
            
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                
                hero.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            hero.addEventListener('mouseleave', () => {
                hero.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });

            // Vibration au clic
            document.addEventListener('click', () => {
                document.body.classList.add('shake-effect');
                setTimeout(() => document.body.classList.remove('shake-effect'), 500);
            });

            /* ==========================================
               4. APPARITION "DATA STREAM"
               ========================================== */
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Animer le texte
                        const texts = entry.target.querySelectorAll('.text-animate');
                        texts.forEach(text => {
                            const original = text.textContent;
                            text.innerText = '';
                            let i = 0;
                            const interval = setInterval(() => {
                                if (i < original.length) {
                                    text.innerText += original.charAt(i);
                                    i++;
                                } else {
                                    clearInterval(interval);
                                }
                            }, 30);
                        });
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.member-card').forEach(card => observer.observe(card));

            /* ==========================================
               5. VISUALIZER
               ========================================== */
            const visualizer = document.getElementById('visualizer');
            const bars = 60;
            
            for (let i = 0; i < bars; i++) {
                const bar = document.createElement('div');
                bar.classList.add('bar');
                bar.style.height = '10%';
                visualizer.appendChild(bar);
            }

            function updateVisualizer() {
                const bars = document.querySelectorAll('.bar');
                bars.forEach(bar => {
                    const height = Math.random() * 100;
                    bar.style.height = `${height}%`;
                });
                requestAnimationFrame(updateVisualizer);
            }
            updateVisualizer();

            /* ==========================================
               6. GLITCH ALÉATOIRE SUR LE TITRE
               ========================================== */
            setInterval(() => {
                if (Math.random() > 0.8) {
                    const h1 = document.querySelector('h1');
                    h1.classList.add('glitch');
                    setTimeout(() => h1.classList.remove('glitch'), 500);
                }
            }, 4000);
        });