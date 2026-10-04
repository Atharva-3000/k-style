// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      // Offset for sticky header
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Parallax Images
gsap.utils.toArray('.parallax-img').forEach(img => {
  gsap.to(img, {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
      trigger: img.parentElement,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// Fade Up Elements
gsap.utils.toArray('.fade-up').forEach(elem => {
  gsap.fromTo(elem, 
    { y: 40, opacity: 0 },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      ease: "power3.out",
      scrollTrigger: {
        trigger: elem,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});

// Staggered Fade Up for Grids (Services, Reviews)
const staggerSections = ['.service-grid', '.review-grid'];
staggerSections.forEach(sectionSelector => {
  const section = document.querySelector(sectionSelector);
  if (section) {
    const items = section.querySelectorAll('.fade-up-stagger');
    if (items.length > 0) {
      gsap.fromTo(items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }
});

// Subtle Float Animations for Hero & Editorial Images
gsap.to('.float-1', {
  y: -15,
  duration: 4,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

gsap.to('.float-2', {
  y: 20,
  duration: 5,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  delay: 0.5
});

// Isometric 3D Hover Effect for Glass Panels
document.querySelectorAll('.glass-panel').forEach(panel => {
  panel.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  panel.addEventListener('mouseleave', () => {
    panel.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Ambient blobs slight mouse reaction
const blobs = document.querySelectorAll('.blob');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  
  blobs.forEach((blob, index) => {
    const speed = (index + 1) * 0.5;
    gsap.to(blob, {
      x: x * speed,
      y: y * speed,
      duration: 2,
      ease: "power2.out"
    });
  });
});
