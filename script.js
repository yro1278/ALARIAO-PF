document.addEventListener('DOMContentLoaded', function() {
    // Chatbot elements
    var chatbotToggle = document.getElementById('chatbotToggle');
    var chatbotContainer = document.getElementById('chatbotContainer');
    var chatbotClose = document.getElementById('chatbotClose');
    var chatbotInput = document.getElementById('chatbotInput');
    var chatbotSend = document.getElementById('chatbotSend');
    var chatbotMessages = document.getElementById('chatbotMessages');

    chatbotToggle.onclick = function() {
        chatbotContainer.classList.toggle('active');
    };

    chatbotClose.onclick = function() {
        chatbotContainer.classList.remove('active');
    };

    function addMessage(text, sender) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message ' + sender;
        messageDiv.innerText = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function sendMessage() {
        var message = chatbotInput.value;
        if (!message.trim()) return;

        addMessage(message, 'user');
        
        var userMsg = message.toLowerCase();
        var response = "Ask about my skills, projects, certificates, or contact info!";
        
        if (userMsg.indexOf('who') > -1 || userMsg.indexOf('about') > -1) {
            response = "Hi! I'm Tyrone, an IT student & Web Developer.";
        } else if (userMsg.indexOf('skill') > -1) {
            response = "My skills: HTML, CSS, JavaScript, PHP, MySQL, Figma, Java, Python";
        } else if (userMsg.indexOf('project') > -1) {
            response = "Projects: FundHarmony, Liberation of Luzon, Mac's Medical Clinic";
        } else if (userMsg.indexOf('certificate') > -1 || userMsg.indexOf('cert') > -1) {
            response = "Certificates: C++, Web Dev, Python";
        } else if (userMsg.indexOf('contact') > -1 || userMsg.indexOf('email') > -1) {
            response = "Contact: tyronealariao06@gmail.com | 09919094456";
        } else if (userMsg.indexOf('hello') > -1 || userMsg.indexOf('hi') > -1) {
            response = "Hello! How can I help you?";
        }
        
        setTimeout(function() {
            addMessage(response, 'bot');
            chatbotInput.value = '';
        }, 300);
    }

    chatbotSend.onclick = function() {
        sendMessage();
    };
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    var navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for ALL clickable links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                const targetPosition = target.offsetTop - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const animatedElements = document.querySelectorAll('.section-header, .about-card, .project-card, .cert-card, .contact-card, .skill-tag');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    function animateOnScroll() {
        animatedElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 80);
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    setTimeout(animateOnScroll, 100);

    // Skill bars animation
    const skillItems = document.querySelectorAll('.skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Certificate tilt effect
    const certCards = document.querySelectorAll('.cert-card');
    
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Hero animations on load
    const heroBadge = document.querySelector('.hero-badge');
    const heroTitle = document.querySelector('.hero-title');
    const heroRole = document.querySelector('.hero-role');
    const heroIntro = document.querySelector('.hero-intro');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    const heroElements = [heroBadge, heroTitle, heroRole, heroIntro, heroButtons, scrollIndicator];
    
    heroElements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 150));
        }
    });

    // Scroll indicator bounce
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        setInterval(() => {
            scrollArrow.style.transform = 'translateY(5px)';
            setTimeout(() => {
                scrollArrow.style.transform = 'translateY(0)';
            }, 500);
        }, 1500);
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                <span>Sending...</span>
            `;
            
            setTimeout(() => {
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>Sent!</span>
                `;
                btn.style.background = 'var(--success)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // Background shapes parallax
    const shapes = document.querySelectorAll('.shape');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse cursor effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20;
            const y = (e.clientY / window.innerHeight) * 20;
            
            hero.style.backgroundPosition = `${x}% ${y}%`;
        });
    }

    // Intersection Observer for section animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.about-grid, .project-card, .certificates-grid, .skills-grid, .contact-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        animateOnScroll.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed, .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-link.active {
            color: var(--primary);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Button hover sound effect (optional - commented out)
    // document.querySelectorAll('.btn').forEach(btn => {
    //     btn.addEventListener('mouseenter', () => {
    //         // Add sound effect here if needed
    //     });
    // });

    // Typing effect for hero role
    const roleText = document.querySelector('.hero-role');
    if (roleText) {
        const text = roleText.innerHTML;
        roleText.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                roleText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1200);
    }

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Page load complete animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.remove(), 500);
            }
        }, 500);
    });

    // Chatbot functionality
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', sender);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Smart responses
    function getResponse(message) {
        const msg = message.toLowerCase();
        
        if (msg.includes('who') || msg.includes('about') || msg.includes('yourself')) {
            return "Hi! I'm Tyrone, an IT student passionate about web development, game design, and tech projects.";
        }
        else if (msg.includes('skill')) {
            return "My skills: HTML, CSS, JavaScript, PHP, MySQL, Figma, Java, Python. Want to see my projects?";
        }
        else if (msg.includes('project')) {
            return "Projects: FundHarmony (Loan System), Liberation of Luzon (Game), Mac's Medical Clinic. Check the Featured Work section!";
        }
        else if (msg.includes('certificate') || msg.includes('cert')) {
            return "Certificates: C++ (KodeGo), Web Dev (FILPAS), Python (KodeGo). Scroll to Certificates section!";
        }
        else if (msg.includes('contact') || msg.includes('email') || msg.includes('hire')) {
            return "Contact: tyronealariao06@gmail.com | 09919094456 | GitHub: github.com/yro1278 | LinkedIn | Instagram: @im_yro";
        }
        else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return "Hello! 👋 Ask me about Tyrone's skills, projects, or how to contact him!";
        }
        else if (msg.includes('favorite') || msg.includes('best project')) {
            return "I really enjoyed making Liberation of Luzon because of the historical accuracy and engaging gameplay!";
        }
        else if (msg.includes('why hire') || msg.includes('hire you')) {
            return "I'm passionate about turning ideas into interactive projects and delivering clean, functional solutions!";
        }
        else {
            return "Ask me about Tyrone's skills, projects, certificates, or contact info!";
        }
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, 'bot');
        }, 500);
    }

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

});
