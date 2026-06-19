// Screen Navigation
function switchScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show selected screen
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.add('active');
    }

    // Update navigation highlighting
    updateNavigation(screenId);

    // Scroll to top of new screen
    window.scrollTo(0, 0);
}

function updateNavigation(screenId) {
    // Remove active state from all nav items across all screens
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => item.classList.remove('active'));

    // Add active state to current screen's nav items
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        const navItems = activeScreen.querySelectorAll('.nav-item');
        if (navItems.length > 0) {
            // Determine which nav item to activate based on screen
            if (screenId === 'discover-screen') {
                navItems[0].classList.add('active');
            } else if (screenId === 'map-screen') {
                navItems[1].classList.add('active');
            } else if (screenId === 'profile-screen') {
                navItems[2].classList.add('active');
            }
        }
    }
}

function navigateToDetail() {
    switchScreen('discover-screen');
}

function navigateBack() {
    switchScreen('discover-screen');
}

function toggleFavorite() {
    const btn = event.target.closest('.icon-button');
    if (btn) {
        btn.style.animation = 'heartBeat 0.6s ease-in-out';
        btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
        setTimeout(() => {
            btn.style.animation = 'none';
        }, 600);
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        alert('Saindo...');
        switchScreen('discover-screen');
    }
}

// Add heart beat animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBeat {
        0%, 100% {
            transform: scale(1);
        }
        10%, 20% {
            transform: scale(0.9);
        }
        30% {
            transform: scale(1.1);
        }
        40% {
            transform: scale(1.05);
        }
        50% {
            transform: scale(1);
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set discover screen as active on load
    switchScreen('discover-screen');

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add active state to buttons on click
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('nav-item')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });

    // Handle carousel scrolling
    const carousels = document.querySelectorAll('.horizontal-carousel');
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
});

// Search functionality
const searchInputs = document.querySelectorAll('.search-input');
searchInputs.forEach(searchInput => {
    searchInput.addEventListener('input', (e) => {
        console.log('Search:', e.target.value);
    });

    searchInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(96, 99, 238, 0.2)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

// Category button interactions
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active state from all buttons
        categoryButtons.forEach(b => {
            b.style.opacity = '0.7';
            b.style.transform = 'scale(1)';
        });
        // Add to clicked button
        this.style.opacity = '1';
        this.style.transform = 'scale(1.05)';
    });
});

// Business card click animations
const businessCards = document.querySelectorAll('.business-card');
businessCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });

    card.addEventListener('click', function() {
        switchScreen('discover-screen');
    });
});

// Form inputs
const formInputs = document.querySelectorAll('.form-input');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.opacity = '1';
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.style.opacity = '0.8';
        }
    });
});

// Save button functionality
const saveButtons = document.querySelectorAll('.save-button');
saveButtons.forEach(saveButton => {
    saveButton.addEventListener('click', function() {
        this.textContent = '✓ Salvo!';
        this.style.background = 'linear-gradient(135deg, #25D366, #20BA5C)';
        setTimeout(() => {
            this.textContent = 'Salvar Alterações';
            this.style.background = 'linear-gradient(135deg, #6063EE, #4648D4)';
        }, 2000);
    });
});

// Favorite button toggling
const favoriteBtns = document.querySelectorAll('.favorite-btn');
favoriteBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.textContent = this.textContent === '♡' ? '♥' : '♡';
        this.style.color = this.textContent === '♥' ? '#FF6B9D' : '#9E9BAF';
    });
});

// Notification toggle
const toggleCheckboxes = document.querySelectorAll('.toggle-checkbox');
toggleCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.parentElement.querySelector('.notification-title');
        if (label) {
            label.style.color = this.checked ? '#131B2E' : '#9E9BAF';
        }
    });
});

// Stats chip interactions
const statChips = document.querySelectorAll('.stat-chip');
statChips.forEach(chip => {
    chip.addEventListener('click', function() {
        const text = this.querySelector('.stat-text').textContent;
        console.log('Clicked stat:', text);
    });
});

// Video card overlay
const videoOverlays = document.querySelectorAll('.video-overlay');
videoOverlays.forEach(overlay => {
    const card = overlay.closest('.social-proof-card');
    if (card) {
        card.addEventListener('click', function() {
            console.log('Play video');
            alert('Reproduzindo vídeo...');
        });
    }
});

// More card (share experience)
const moreCards = document.querySelectorAll('.more-card');
moreCards.forEach(moreCard => {
    moreCard.addEventListener('click', function() {
        alert('Compartilhe sua experiência!\n\nRedirecionando para o formulário de experiência...');
    });
});

// Map button
const mapButtons = document.querySelectorAll('.map-button');
mapButtons.forEach(mapButton => {
    mapButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Abrindo mapa com localização...');
    });
});

// WhatsApp button
const whatsappButtons = document.querySelectorAll('.whatsapp-button');
whatsappButtons.forEach(whatsappButton => {
    whatsappButton.addEventListener('click', function() {
        console.log('Opening WhatsApp...');
        alert('Redirecionando para WhatsApp...');
    });
});

// View all buttons
const viewAllButtons = document.querySelectorAll('.view-all-button');
viewAllButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Ver todas as experiências');
    });
});

// Help buttons
const helpButtons = document.querySelectorAll('.help-button');
helpButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent.split('\n')[0].trim();
        console.log('Help:', text);
        alert('Abrindo: ' + text);
    });
});

// Profile buttons
const profileBtns = document.querySelectorAll('#profile-btn');
profileBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        switchScreen('profile-screen');
    });
});

const favoritesBtns = document.querySelectorAll('#favorites-btn');
favoritesBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        switchScreen('map-screen');
    });
});

// Navigation button clicks
document.addEventListener('click', function(e) {
    // Handle discover nav buttons
    if (e.target.closest('.nav-item')) {
        const btn = e.target.closest('.nav-item');
        const screen = btn.closest('.screen');
        
        if (screen.id === 'discover-screen') {
            const navItems = screen.querySelectorAll('.nav-item');
            if (btn === navItems[0]) switchScreen('discover-screen');
            if (btn === navItems[1]) switchScreen('map-screen');
            if (btn === navItems[2]) switchScreen('profile-screen');
        } else if (screen.id === 'map-screen') {
            const navItems = screen.querySelectorAll('.nav-item');
            if (btn === navItems[0]) switchScreen('discover-screen');
            if (btn === navItems[1]) switchScreen('map-screen');
            if (btn === navItems[2]) switchScreen('profile-screen');
        } else if (screen.id === 'profile-screen') {
            const navItems = screen.querySelectorAll('.nav-item');
            if (btn === navItems[0]) switchScreen('discover-screen');
            if (btn === navItems[1]) switchScreen('map-screen');
            if (btn === navItems[2]) switchScreen('profile-screen');
        }
    }
});

// Responsive adjustments
function handleResize() {
    const width = window.innerWidth;
    const frameContainer = document.querySelector('.frame-container');
    
    if (width < 360) {
        frameContainer.style.fontSize = '14px';
    } else if (width < 480) {
        frameContainer.style.fontSize = '15px';
    } else {
        frameContainer.style.fontSize = '16px';
    }
}

window.addEventListener('resize', handleResize);
handleResize();

console.log('✨ Neighborly App Initialized!');
