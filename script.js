// script.js

// Audio Objects 
const anthemAudio = new Audio('music/scoutmp.mp3');
anthemAudio.loop = true; 
let isAnthemPlaying = false;

const campfireAudio = new Audio('music/campfire.mp3');
campfireAudio.loop = true;

// Preloader 
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('preloader').style.display = 'none';
        }, 500);
    }, 1500);
    
    initParticles();
    createFireflies();
    animateCounters();
});

// Custom Toast Alert
function showToast(msg, icon = '⚜️') {
    const toast = document.getElementById('custom-toast');
    toast.innerHTML = `<span class="text-lg">${icon}</span> <span class="font-display">${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if(menuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenuBtn.click());
});

// Custom Cursor (Desktop Only)
if (window.innerWidth > 768) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });

    document.querySelectorAll('a, button, .glass-card, .accordion-btn').forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
}

// Particle System
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 40; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY;
            if (p.x > canvas.width) p.x = 0; if (p.x < 0) p.x = canvas.width;
            if (p.y > canvas.height) p.y = 0; if (p.y < 0) p.y = canvas.height;
            ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

// Fireflies
function createFireflies() {
    const container = document.querySelector('.fireflies-container');
    for (let i = 0; i < 15; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = Math.random() * 100 + '%';
        firefly.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        firefly.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
        firefly.style.animationDelay = Math.random() * 15 + 's';
        firefly.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(firefly);
    }
}

// Counter Animation (Updated to remove commas)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / (2000 / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString('bn-BD', { useGrouping: false });
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString('bn-BD', { useGrouping: false });
            }
        };
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) { updateCounter(); observer.disconnect(); }
        });
        observer.observe(counter);
    });
}

// Dynamic Typing Animation (Baden-Powell Roles)
const bpRoles = [
    "স্কাউটিংয়ের জনক", 
    "ব্রিটিশ সেনা কর্মকর্তা", 
    "প্রতিভাবান চিত্রশিল্পী", 
    "বেস্টসেলার লেখক", 
    "দক্ষ গুপ্তচর", 
    "বিশ্বের চিফ স্কাউট"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    if (!typingElement) return;

    const currentRole = bpRoles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % bpRoles.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

setTimeout(typeEffect, 1000);

// 3D Tilt Effect
if (window.innerWidth > 768) {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Theme Toggle
let isDayMode = false;
function toggleThemeMode() {
    isDayMode = !isDayMode;
    document.body.classList.toggle('day-mode');
    document.getElementById('theme-toggle').innerText = isDayMode ? '🌙' : '🏕️';
}
document.getElementById('theme-toggle').addEventListener('click', toggleThemeMode);
document.getElementById('theme-toggle-mobile').addEventListener('click', () => { toggleThemeMode(); mobileMenuBtn.click(); });

// Scroll & Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById('progressBar').style.width = (winScroll / height) * 100 + '%';
    const backToTop = document.getElementById('backToTop');
    if (winScroll > 400) { backToTop.classList.remove('opacity-0', 'pointer-events-none'); } 
    else { backToTop.classList.add('opacity-0', 'pointer-events-none'); }
});
document.getElementById('backToTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('svg');
        const isOpen = content.style.maxHeight;
        
        document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
        document.querySelectorAll('.accordion-btn svg').forEach(i => i.style.transform = 'rotate(0deg)');
        
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Lightbox
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Magnetic Buttons
if (window.innerWidth > 768) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
    });
}

// Campfire Mode & Audio
let campfireMode = false;
function toggleCampfireMode() {
    campfireMode = !campfireMode;
    if (campfireMode) {
        document.body.style.filter = 'sepia(0.3) contrast(1.1)';
        document.querySelector('.campfire-bg').style.boxShadow = 'inset 0 0 100px rgba(255, 100, 0, 0.3)';
        campfireAudio.play().catch(e => console.log('Audio play failed:', e));
        showToast('ক্যাম্পফায়ার মোড চালু হয়েছে 🔥');
        document.getElementById('campfire-icon').innerText = '⛺';
    } else {
        document.body.style.filter = '';
        document.querySelector('.campfire-bg').style.boxShadow = '';
        campfireAudio.pause();
        showToast('ক্যাম্পফায়ার মোড বন্ধ হয়েছে ⛺');
        document.getElementById('campfire-icon').innerText = '🔥';
    }
}

// Buttons Action & Anthem Audio Toggle
function playAnthem() { 
    if (isAnthemPlaying) {
        anthemAudio.pause();
        showToast('স্কাউট সংগীত থামানো হয়েছে ⏸️');
        document.getElementById('anthem-status').innerText = '';
    } else {
        anthemAudio.play().catch(e => console.log('Audio play failed:', e));
        showToast('স্কাউট সংগীত বাজানো হচ্ছে... 🎶'); 
        document.getElementById('anthem-status').innerText = ' ⏸️';
    }
    isAnthemPlaying = !isAnthemPlaying;
}

function showDetail(type) {
    const details = {
        brownsea: '১৯০৭ সালে ব্রাউনসি দ্বীপে ২০ জন কিশোর নিয়ে প্রথম ক্যাম্প অনুষ্ঠিত হয়।',
        book: '"Scouting for Boys" ১৯০৮ সালে প্রকাশিত হয় এবং ১০০ মিলিয়ন কপি বিক্রি হয়েছে।',
        jamboree: '১৯২০ সালের ১ম বিশ্ব জাম্বোরিতে বি.পি. কে "চিফ স্কাউট" ঘোষণা করা হয়।'
    };
    showToast(details[type], '📖');
}
