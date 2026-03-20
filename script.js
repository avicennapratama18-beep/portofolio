// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Reveal elements on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const Math_elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 80;

        if (Math_elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// Initial check
window.addEventListener('load', reveal);
window.addEventListener('scroll', reveal);

// Mobile Hamburger Menu 
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(5, 5, 5, 0.98)';
        navLinks.style.backdropFilter = 'blur(15px)';
        navLinks.style.padding = '30px';
        navLinks.style.textAlign = 'center';
        navLinks.style.gap = '25px';
        navLinks.style.borderBottom = '1px solid #1c1c20';
        
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
    }
});

// Reset menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.borderBottom = 'none';
        navLinks.style.backdropFilter = 'none';
    } else {
        navLinks.style.display = 'none';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

/* === SHINY ROCKET CURSOR TRACKING === */
const rocketCursor = document.getElementById('rocket-cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;
let targetAngle = 0;
let currentAngle = 0;

document.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 768 && rocketCursor) {
        // Calculate angle between old pos and new pos
        if (e.clientX !== currentX || e.clientY !== currentY) {
            const dx = e.clientX - currentX;
            const dy = e.clientY - currentY;
            targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;
        }
        
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});

document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
document.addEventListener('mouseup', () => document.body.classList.remove('clicking'));

function animateRocket() {
    if(window.innerWidth > 768 && rocketCursor) {
        // Smooth follow
        currentX += (mouseX - currentX) * 0.2;
        currentY += (mouseY - currentY) * 0.2;
        
        // Shortest path interpolation for angles
        let diff = targetAngle - currentAngle;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        currentAngle += diff * 0.15;
        
        // Make the body tilt/point
        rocketCursor.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentAngle}deg)`;
    }
    requestAnimationFrame(animateRocket);
}
animateRocket();

/* === 3D TILT EFFECT === */
const tiltCards = document.querySelectorAll('.tilt-card, .tilt-card-subtle');

tiltCards.forEach(card => {
    const glare = card.querySelector('.glare');
    const isSubtle = card.classList.contains('tilt-card-subtle');
    const maxTilt = isSubtle ? 3 : 6;
    
    card.addEventListener('mousemove', (e) => {
        if(window.innerWidth <= 768) return; 
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 
        
        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;
        
        const rotateX = yPercent * -maxTilt * 2;
        const rotateY = xPercent * maxTilt * 2;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        if (glare) {
            glare.style.opacity = '1';
            glare.style.transform = `translate(${xPercent * 50 - 50}%, ${yPercent * 50 - 50}%)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        if (glare) {
            glare.style.opacity = '0';
        }
    });
});
