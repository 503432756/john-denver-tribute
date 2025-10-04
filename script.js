// Lightweight JavaScript for the John Denver Tribute Page
// Focused on performance and accessibility

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for any internal links (if added later)
    const smoothScroll = (target) => {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Audio player enhancements
    const audioPlayer = document.getElementById('johnDenverPlayer');
    
    if (audioPlayer) {
        // Ensure no autoplay (extra safety)
        audioPlayer.autoplay = false;
        audioPlayer.preload = 'none'; // Don't preload for performance
        
        // Add keyboard accessibility
        audioPlayer.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                if (audioPlayer.paused) {
                    audioPlayer.play();
                } else {
                    audioPlayer.pause();
                }
            }
        });

        // Simple play/pause feedback
        audioPlayer.addEventListener('play', function() {
            console.log('Playing tribute music...');
        });

        audioPlayer.addEventListener('pause', function() {
            console.log('Music paused.');
        });
    }

    // Add subtle animation to song items on scroll (performance-conscious)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe song items for subtle entrance animation
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Performance: Lazy load any future images
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

    // Add a subtle parallax effect to the hero section (optional, lightweight)
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.mountain-silhouette');
        
        if (parallaxElement && scrolled < window.innerHeight) {
            const speed = scrolled * 0.5;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
        
        ticking = false;
    };

    const handleScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    };

    // Only add parallax on larger screens for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Console message for developers
    console.log(`
    🎵 John Denver Tribute Page 🏔️
    
    "Country roads, take me home
    To the place I belong..."
    
    Built with love and respect for the folk legend.
    Remember to replace the sample audio with properly licensed music.
    `);

});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}