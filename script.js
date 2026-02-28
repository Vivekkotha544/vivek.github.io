document.addEventListener('DOMContentLoaded', () => {

    // ========== PARTICLES ==========
    const particlesContainer = document.getElementById('particles');

    if (particlesContainer) {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        particlesContainer.appendChild(canvas);

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        setCanvasSize();

        const particles = [];
        const particleCount = 80;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.color = Math.random() > 0.5 ? '#00ff88' : '#0066ff';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (
                    this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height
                ) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = '#00ff88';
                        ctx.globalAlpha = 0.05;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        animateParticles();

        window.addEventListener('resize', () => {
            setCanvasSize();
            particles.forEach(p => p.reset());
        });
    }

    // ========== TYPING EFFECT ==========
    const typingEl = document.getElementById('typing');

    if (typingEl) {

        const texts = [
            'Cybersecurity Analyst',
            'IAM Specialist',
            'Big 4 Consultant',
            'Security Expert',
            'Threat Hunter'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typingEl.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        typeEffect();
    }

    // ========== SKILL BARS ==========
    const skillsSection = document.querySelector('.skills');

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);
    }

    // ========== NAVBAR SCROLL ==========
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.background =
                window.scrollY > 50
                    ? 'rgba(10, 10, 15, 0.98)'
                    : 'rgba(10, 10, 15, 0.95)';
        });
    }

    // ========== HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            if (!btn) return;

            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#28c840';

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    // ========== SCROLL ANIMATIONS ==========
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.skill-card, .project-card, .blog-card'
    ).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateObserver.observe(el);
    });

});
