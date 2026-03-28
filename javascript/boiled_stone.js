const socialData = {
        twitch: "https://www.twitch.tv/boiling_stone",
        discord: "https://discord.gg/votre_invite",
        youtube: "https://youtube.com/@votre_chaine",
        twitter: "https://twitter.com/votre_compte"
    };

    const textToType = "HOLD ONTO YOUR BUTTCHEEKS!";

    function setLinks() {
        const ids = ['link-twitch', 'link-discord', 'link-youtube', 'link-twitter'];
        const keys = ['twitch', 'discord', 'youtube', 'twitter'];
        
        ids.forEach((id, index) => {
            const el = document.getElementById(id);
            if(el && socialData[keys[index]]) {
                el.href = socialData[keys[index]];
            }
        });
    }

    function typeWriter() {
        const el = document.getElementById('typewriter');
        if(!el) return;
        
        let i = 0;
        el.innerHTML = "";
        
        function type() {
            if (i < textToType.length) {
                el.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(type, Math.random() * 50 + 30);
            }
        }
        setTimeout(type, 600);
    }

    function footerChaos() {
        const footer = document.getElementById('footerText');
        if(!footer) return;
        setInterval(() => {
            footer.style.transform = `scale(${1 + Math.random() * 0.2}) rotate(${Math.random() * 4 - 2}deg)`;
            footer.style.color = Math.random() > 0.8 ? '#fff' : '#e0e0e0';
        }, 150);
    }

    window.addEventListener('DOMContentLoaded', () => {
        setLinks();
        typeWriter();
        footerChaos();
    });