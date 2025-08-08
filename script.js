// ===== إعدادات عامة =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== تهيئة الموقع =====
function initializeWebsite() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupNavigationEffects();
    setupParallaxEffects();
    setupInteractiveElements();
    setupLoadingAnimations();
    setupTypingEffect();
    setupParticleBackground();
    setupScrollToTop();
    setupImageLazyLoading();
}

// ===== التمرير السلس =====
function setupSmoothScrolling() {
    // إضافة تأثير التمرير السلس لجميع الروابط الداخلية
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // إضافة تأثير بصري للرابط المنقر عليه
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // التمرير السلس مع تأثير مخصص
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // إضافة تأثير وميض للقسم المستهدف
                targetSection.style.animation = 'sectionHighlight 2s ease-in-out';
                setTimeout(() => {
                    targetSection.style.animation = '';
                }, 2000);
            }
        });
    });
}

// ===== انيميشن التمرير =====
function setupScrollAnimations() {
    // إنشاء مراقب التقاطع للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // تأثيرات خاصة لأنواع مختلفة من العناصر
                if (entry.target.classList.contains('card')) {
                    animateCard(entry.target);
                } else if (entry.target.classList.contains('family-member')) {
                    animateFamilyMember(entry.target);
                } else if (entry.target.classList.contains('section-title')) {
                    animateSectionTitle(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر القابلة للانيميشن
    const animatedElements = document.querySelectorAll('.card, .family-member, .section-title, .about-text p');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== تأثيرات التنقل =====
function setupNavigationEffects() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // تأثير تغيير شريط التنقل عند التمرير
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // تحديد القسم النشط
        updateActiveNavLink();
    });
    
    // تأثيرات الهوفر المتقدمة للروابط
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.textShadow = '0 4px 8px rgba(212, 175, 55, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
                this.style.textShadow = '';
            }
        });
    });
}

// ===== تحديد الرابط النشط =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== تأثيرات البارالاكس =====
function setupParallaxEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
        
        // تأثير البارالاكس للخلفية
        document.body.style.backgroundPosition = `center ${scrolled * 0.2}px`;
    });
}

// ===== العناصر التفاعلية =====
function setupInteractiveElements() {
    // تأثيرات البطاقات
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.4)';
            
            // تأثير الوهج
            this.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            this.style.filter = '';
        });
        
        // تأثير النقر
        card.addEventListener('click', function() {
            this.style.animation = 'cardPulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // تأثيرات أعضاء العائلة
    const familyMembers = document.querySelectorAll('.family-member');
    familyMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.transform = 'scale(1.15) rotate(5deg)';
                image.style.boxShadow = '0 15px 30px rgba(212, 175, 55, 0.5)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const image = this.querySelector('.member-image');
            if (image) {
                image.style.transform = '';
                image.style.boxShadow = '';
            }
        });
    });
}

// ===== انيميشن التحميل =====
function setupLoadingAnimations() {
    // تأثير التحميل للصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transform = 'scale(0.8)';
            this.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// ===== تأثير الكتابة =====
function setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderLeft = '2px solid #d4af37';
        element.style.animation = 'blink 1s infinite';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                element.style.borderLeft = 'none';
                element.style.animation = 'none';
            }
        };
        
        // بدء التأثير عند ظهور العنصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== خلفية الجسيمات =====
function setupParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    // إنشاء الجسيمات
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: #d4af37;
        border-radius: 50%;
        opacity: 0.3;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
    
    // إزالة الجسيم وإعادة إنشاؤه
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (Math.random() * 10 + 10) * 1000);
}

// ===== زر العودة للأعلى =====
function setupScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37, #b8860b);
        color: #0a0a0a;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // إظهار/إخفاء الزر
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // وظيفة العودة للأعلى
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // تأثيرات الهوفر
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.5)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
    });
}

// ===== تحميل الصور الكسول =====
function setupImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== انيميشن البطاقات =====
function animateCard(card) {
    card.style.animation = 'slideInFromBottom 0.8s ease-out';
    
    // انيميشن متتالي للعناصر الفرعية
    const cardElements = card.querySelectorAll('h3, p, img');
    cardElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===== انيميشن أعضاء العائلة =====
function animateFamilyMember(member) {
    member.style.animation = 'bounceIn 1s ease-out';
    
    const image = member.querySelector('.member-image');
    const name = member.querySelector('.member-name');
    
    if (image) {
        setTimeout(() => {
            image.style.animation = 'rotateIn 0.8s ease-out';
        }, 300);
    }
    
    if (name) {
        setTimeout(() => {
            name.style.animation = 'fadeInUp 0.6s ease-out';
        }, 600);
    }
}

// ===== انيميشن عناوين الأقسام =====
function animateSectionTitle(title) {
    const h2 = title.querySelector('h2');
    if (h2) {
        h2.style.animation = 'titleGlow 2s ease-in-out, slideInFromTop 1s ease-out';
    }
}

// ===== وظائف المناسبات =====
function showEvents() {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
        eventsSection.style.display = 'block';
        eventsSection.scrollIntoView({ behavior: 'smooth' });
        
        // انيميشن ظهور المحتوى
        eventsSection.style.opacity = '0';
        eventsSection.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            eventsSection.style.transition = 'all 0.8s ease-out';
            eventsSection.style.opacity = '1';
            eventsSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===== تأثيرات الماوس المتقدمة =====
document.addEventListener('mousemove', (e) => {
    // تأثير المتابعة للماوس
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #d4af37, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    if (cursorElement) {
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    }
});

// ===== إضافة الانيميشن CSS الإضافي =====
const additionalStyles = `
    @keyframes sectionHighlight {
        0% { background-color: rgba(212, 175, 55, 0); }
        50% { background-color: rgba(212, 175, 55, 0.1); }
        100% { background-color: rgba(212, 175, 55, 0); }
    }
    
    @keyframes cardPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes rotateIn {
        from {
            opacity: 0;
            transform: rotate(-200deg);
        }
        to {
            opacity: 1;
            transform: rotate(0deg);
        }
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes blink {
        0%, 50% { border-color: #d4af37; }
        51%, 100% { border-color: transparent; }
    }
    
    .nav-link.active {
        background: linear-gradient(135deg, #d4af37, #b8860b) !important;
        color: #0a0a0a !important;
        transform: translateY(-2px) scale(1.05) !important;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4) !important;
    }
`;

// إضافة الستايلات الإضافية
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== تحسين الأداء =====
// تأخير تنفيذ بعض التأثيرات لتحسين الأداء
window.addEventListener('load', () => {
    setTimeout(() => {
        setupParticleBackground();
    }, 1000);
});

// تنظيف الذاكرة عند إغلاق الصفحة
window.addEventListener('beforeunload', () => {
    const particles = document.querySelectorAll('.particle-container');
    particles.forEach(particle => particle.remove());
});

console.log('🌟 تم تحميل جميع التأثيرات بنجاح - الموقع جاهز للاستخدام! 🌟');

