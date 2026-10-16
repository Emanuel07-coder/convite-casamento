let bgAudio;

window.addEventListener('DOMContentLoaded', () => {
    bgAudio = document.getElementById('bg-music');
    
    if (bgAudio) {
        bgAudio.addEventListener('timeupdate', () => {
            const progress = document.getElementById('progress');
            if (progress && bgAudio.duration) {
                const percentage = (bgAudio.currentTime / bgAudio.duration) * 100;
                progress.style.width = percentage + '%';
            }
        });
    }
});

function abrirConvite() {
    const flap = document.getElementById('flap');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');

    if (flap) {
        flap.classList.add('open');
    }

    // 1. Aguarda a animação do flap
    setTimeout(() => {
        if (envelopeScreen) {
            envelopeScreen.style.opacity = '0';
        }

        // 2. Transição suave para o ecrã do convite
        setTimeout(() => {
            if (envelopeScreen) {
                envelopeScreen.style.display = 'none';
            }

            if (mainContent) {
                mainContent.style.display = 'flex';
                
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    document.body.style.overflowY = 'auto'; // Liberta o scroll
                }, 50);
            }

            // 3. Tenta iniciar a música
            if (bgAudio) {
                bgAudio.play()
                    .then(() => atualizarIconePlay(true))
                    .catch(err => {
                        console.log("Reprodução travada pelo browser. Aguardando interação manual.", err);
                        atualizarIconePlay(false);
                    });
            }
        }, 500);
    }, 1000);
}

function toggleMusic() {
    if (!bgAudio) return;
    
    if (bgAudio.paused) {
        bgAudio.play();
        atualizarIconePlay(true);
    } else {
        bgAudio.pause();
        atualizarIconePlay(false);
    }
}

function atualizarIconePlay(isTocar) {
    const playBtn = document.getElementById('play-btn');
    if (!playBtn) return;
    
    if (isTocar) {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
}

function confirmarPresenca() {
    const mensagem = encodeURIComponent("Oi! Estou mandando mensagem para confirmar a minha presença no casamento da Tallita e do Gustavo!");
    
    // Altere para o contacto de Ariquemes / RO (código do país + DDD + número)
    const numeroTelefone = "5569992702807"; 
    
    window.open(`https://wa.me/${numeroTelefone}?text=${mensagem}`, '_blank');
}