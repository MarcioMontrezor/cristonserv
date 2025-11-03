"use strict";

// Variável para o ano atual no Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

const header = document.getElementById('header');
const sections = document.querySelectorAll('.section-animate');
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// 1. Função de Navegação Fixa (Sticky Header)
function handleScroll() {
    // Adiciona ou remove a classe de fundo escuro com base na posição do scroll
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled', 'shadow-lg');
        header.classList.remove('bg-transparent', 'py-4');
        header.classList.add('py-3');
    } else {
        header.classList.remove('header-scrolled', 'shadow-lg');
        header.classList.add('bg-transparent', 'py-4');
        header.classList.remove('py-3');
    }

    // Animação sutil de entrada/scroll
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        // Torna a seção visível quando ela entra 80% na viewport
        if (sectionTop < window.innerHeight * 0.8) {
            section.classList.add('section-visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
// Garante que o estado inicial das animações e header seja definido
window.addEventListener('load', () => {
     handleScroll(); // Chama a função na inicialização para verificar a posição
     
     // Simulação de lazy load para imagens que já estão no HTML, adiciona a classe no load
     document.querySelectorAll('.lazy-load img').forEach(img => {
        if (img.complete) {
             img.classList.add('lazy-loaded');
        } else {
             img.onload = () => img.classList.add('lazy-loaded');
        }
     });
});


// 2. Formulário de Contato (Lógica Anti-spam e Simulação de Envio)
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Lógica Anti-spam (Soma de 3 + 5 = 8)
    const captchaInput = this.querySelector('[name="captcha"]').value;
    if (parseInt(captchaInput) !== 8) {
        showMessage("Erro: Resposta anti-spam incorreta. Tente novamente.", "text-red-500");
        return;
    }

    // Simulação de integração Backend/API
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Remover Captcha da mensagem de log
    delete data.captcha;

    console.log("Dados do Formulário para envio (Backend/API):", data);

    // SIMULAÇÃO DE SUCESSO DE ENVIO
    setTimeout(() => {
        showMessage("Sua mensagem foi enviada com sucesso! Em breve, um de nossos especialistas entrará em contato.", "text-green-500");
        form.reset();
    }, 1500);
});

function showMessage(message, colorClass) {
    formMessage.textContent = message;
    formMessage.className = `mt-4 text-center text-sm font-semibold ${colorClass}`;
    formMessage.classList.remove('hidden');
}
