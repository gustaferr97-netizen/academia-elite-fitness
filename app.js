/* =====================
   CURSOR PERSONALIZADO
   ===================== */
const cursor     = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className     = 'cursor';
cursorRing.className = 'cursor-ring';
document.body.append(cursor, cursorRing);

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    cursorRing.style.left = mouseX + 'px';
    cursorRing.style.top  = mouseY + 'px';
});

document.querySelectorAll('a, button, .galeria-item, .tag-pagamento, .plano-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('expand'); cursorRing.classList.add('expand'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('expand'); cursorRing.classList.remove('expand'); });
});

/* =====================
   PROGRESS BAR
   ===================== */
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
});

/* =====================
   HEADER SHRINK
   ===================== */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

/* =====================
   SCROLL SUAVE
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* =====================
   NAVBAR ATIVA NO SCROLL
   ===================== */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

/* =====================
   SCROLL INDICATOR NO HERO
   ===================== */
const hero = document.querySelector('.hero');
if (hero) {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<span>scroll</span><div class="arrow"></div>';
    hero.appendChild(indicator);
}

/* =====================
   REVEAL ON SCROLL
   ===================== */
const revealEls = document.querySelectorAll(
    '.plano-card, .galeria-item, .info-contato, .pagamento-box, .tag-pagamento, .section-title'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // anima o underline do título
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* =====================
   CONTADOR ANIMADO NOS PREÇOS
   ===================== */
function animateCount(el, target, duration = 1000) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = 'R$ ' + Math.floor(start);
    }, 16);
}

const priceObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const value = parseInt(el.dataset.value);
            animateCount(el, value);
            priceObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.preco').forEach(el => {
    const match = el.textContent.match(/\d+/);
    if (match) {
        el.dataset.value = match[0];
        el.textContent = 'R$ 0';
        priceObserver.observe(el);
    }
});

/* =====================
   TOAST NOTIFICATION
   ===================== */
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Toast nos botões "Assinar"
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.trim() === 'Assinar') {
        btn.addEventListener('click', () => showToast('✅ Redirecionando para o pagamento...'));
    }
});

// Toast nos métodos de pagamento
document.querySelectorAll('.tag-pagamento').forEach(tag => {
    tag.addEventListener('click', () => {
        const nome = tag.querySelector('span')?.textContent?.trim() || 'método';
        showToast(`💳 Pagamento via ${nome} selecionado!`);
    });
});

/* =====================
   EFEITO PARALLAX NO HERO
   ===================== */
window.addEventListener('scroll', () => {
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        heroEl.style.backgroundPositionY = (window.scrollY * 0.4) + 'px';
    }
});

/* =====================
   BACK TO TOP
   ===================== */
const backBtn = document.createElement('button');
backBtn.id = 'back-to-top';
backBtn.innerHTML = '↑';
backBtn.title = 'Voltar ao topo';
document.body.appendChild(backBtn);

window.addEventListener('scroll', () => {
    backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
