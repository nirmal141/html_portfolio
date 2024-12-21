function myMenuFunction() {
    var menuBtn = document.getElementById("myNavMenu");
    menuBtn.classList.toggle("responsive");
}

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById("myNavMenu").classList.remove("responsive");
    });
});

// Add shadow to navbar on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

function sendMail() {
    var params = {
        name: document.getElementById("name").value,      
        email: document.getElementById("email").value,      
        message: document.getElementById("message").value,      
    };
    const serviceID = "service_kspom3f";
    const templateID = "template_7t9b917";
    
    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            alert("Your message was sent successfully!");
        })
        .catch((err) => console.log(err));
}


//dark mode

const body = document.querySelector("body"),
    toggleSwitch = document.getElementById("toggle-switch");

toggleSwitch.addEventListener("click", ()=> {
    body.classList.toggle("dark");
});

//typing effect

var typingEffect = new Typed(".typedText", {
    strings:["Software Engineer", "Web Developer", "Creative Coder"],
    loop: true,
    typeSpeed: 10,
    backSpeed: 50,
    backDelay: 800,
})

//scroll-animation

const sr = scrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true,
});

sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".text-info", { delay: 200 });
sr.reveal(".text-btn", { delay: 200 });
sr.reveal(".social-icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 320 });


sr.reveal(".project-box", { interval: 200 });

sr.reveal(".top-header", {});

const srLeft = scrollReveal ({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
})

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = scrollReveal ({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true,
})

srLeft.reveal(".skill", { delay: 100 });
srLeft.reveal(".skill-box", { delay: 100 });


//active links

const sections = document.querySelectorAll(".section[id");

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {

        const sectionHeight = current.offsetHeight,

            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]")
            .classList.add("active-link");
        } else {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]")
            .classList.remove("active-link");
        }

    });
}

window.addEventListener("scroll", scrollActive);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all timeline items
document.querySelectorAll('.group').forEach((item) => {
    observer.observe(item);
});

// Enhanced skill filtering with animations
const skillFilters = document.querySelectorAll('.skill-filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

skillFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        skillFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const category = filter.dataset.filter;

        // Animate skill cards
        skillCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Add hover animations for skill bars
document.querySelectorAll('.skill-bar-container').forEach(container => {
    const progressBar = container.querySelector('.progress-bar');
    const percentage = progressBar.dataset.percentage;

    container.addEventListener('mouseenter', () => {
        progressBar.style.width = percentage;
    });

    container.addEventListener('mouseleave', () => {
        progressBar.style.width = '0%';
    });
});

// Initialize tooltips for tech tags
document.querySelectorAll('.tech-tag').forEach(tag => {
    const tooltip = tag.querySelector('.tooltip');
    
    tag.addEventListener('mousemove', (e) => {
        const rect = tag.getBoundingClientRect();
        const x = e.clientX - rect.left;
        tooltip.style.left = `${x}px`;
    });
});

// Rename the second observerOptions to skillObserverOptions
const skillObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.add('animate-slide-up');
            
            // Stagger animate child elements
            const children = entry.target.querySelectorAll('.skill-bar-container');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-fade-in');
                }, index * 100);
            });
            
            skillObserver.unobserve(entry.target);
        }
    });
}, skillObserverOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Tech Stack Tooltips
const techStackTags = document.querySelectorAll('.tech-stack span');

techStackTags.forEach(tag => {
    const tooltip = document.createElement('div');
    tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 px-3 py-1 bg-secondary-bg text-highlight text-sm rounded-md opacity-0 transition-opacity duration-300 pointer-events-none mb-2';
    tooltip.textContent = `Click to see related projects`;
    
    tag.appendChild(tooltip);
    tag.classList.add('relative', 'cursor-pointer');
    
    tag.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
    tag.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
    
    // Filter projects by technology when clicked
    tag.addEventListener('click', () => {
        const tech = tag.textContent.toLowerCase();
        filterProjectsByTech(tech);
    });
});

// Scroll-triggered animations with enhanced effects
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            
            // Add staggered animations to child elements
            const children = entry.target.querySelectorAll('.animate-child');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('animate-slide-up');
                }, index * 100);
            });
            
            observer.unobserve(entry.target);
        }
    });
};

// Enhanced scroll animations
const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1,
    rootMargin: '0px'
});

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// Particle effect for the hero section
const createParticleEffect = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 pointer-events-none';
    document.querySelector('#hero').appendChild(canvas);
    
    // Add particle animation logic here
};

// Initialize particle effect
createParticleEffect();

// Custom cursor effect
const cursor = {
    dot: document.querySelector('.cursor-dot'),
    outline: document.querySelector('.cursor-outline'),
    init: function() {
        document.addEventListener('mousemove', (e) => {
            this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.outline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        // Add hover effect for interactive elements
        document.querySelectorAll('a, button, .skill-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.style.transform = 'scale(1.5)';
                this.outline.style.borderColor = 'var(--highlight)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.outline.style.transform = 'scale(1)';
                this.outline.style.borderColor = 'var(--highlight)';
            });
        });
    }
};

// 3D card tilt effect
const cards = document.querySelectorAll('.transform-3d');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(50px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Particle system for background
const createParticleSystem = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'particle-canvas';
    document.querySelector('#skills').appendChild(canvas);

    // Particle system implementation
    const particles = [];
    
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.size = Math.random() * 3;
    }
    
    // Add particle animation logic
};

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    cursor.init();
    createParticleSystem();
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
document.addEventListener('DOMContentLoaded', () => {
    // Split text animation for hero title
    const heroText = new SplitType('.hero-title', { types: 'chars' });
    
    gsap.from(heroText.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
    });

    // Floating animation for profile picture
    gsap.to('.profile-picture', {
        y: 20,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });

    // Skill cards stagger animation
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '#skills',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 100,
        rotationY: 15,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });

    // Initialize particle effect
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#64ffda' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                out_mode: 'out'
            }
        }
    });

    // 3D Card Effect
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;
            
            gsap.to(card, {
                duration: 0.5,
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.5,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.magnetic-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.2,
                y: y * 0.2,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.3,
                x: 0,
                y: 0
            });
        });
    });

    // Scroll progress indicator
    gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });
});

// Three.js background effect
const initThreeJsBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-bg').appendChild(renderer.domElement);

    // Create animated background geometry
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x64ffda,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 30;

    const animate = () => {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.001;
        torus.rotation.y += 0.002;
        renderer.render(scene, camera);
    };

    animate();
};

initThreeJsBackground();