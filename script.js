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

    // Scroll to top
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 0);
}

function updateNavigation(screenId) {
    // Get current active screen
    const activeScreen = document.getElementById(screenId);
    if (!activeScreen) return;

    // Update nav items in this screen
    const navItems = activeScreen.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    if (screenId === 'discover-screen') {
        navItems[0] && navItems[0].classList.add('active');
    } else if (screenId === 'map-screen') {
        navItems[1] && navItems[1].classList.add('active');
    } else if (screenId === 'profile-screen') {
        navItems[2] && navItems[2].classList.add('active');
    }
}

function toggleFavorite(event) {
    event.stopPropagation();
    const btn = event.target.closest('.icon-button');
    if (btn) {
        btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
        if (btn.textContent === '♥') {
            btn.style.color = '#FF6B9D';
        } else {
            btn.style.color = '#131B2E';
        }
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        alert('Até logo!');
        switchScreen('discover-screen');
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Neighborly App Initialized!');

    // Set discover screen as default
    switchScreen('discover-screen');

    // Setup all button click handlers
    setupButtons();

    // Setup search inputs
    setupSearch();

    // Setup category buttons
    setupCategories();

    // Setup business cards
    setupBusinessCards();

    // Setup profile form
    setupProfileForm();

    // Setup navigation buttons
    setupNavigation();
});

function setupButtons() {
    // Discover screen buttons
    const discoverScreen = document.getElementById('discover-screen');
    if (discoverScreen) {
        const favBtn = discoverScreen.querySelector('.icon-button');
        if (favBtn) {
            favBtn.addEventListener('click', toggleFavorite);
        }

        const profileBtn = discoverScreen.querySelector('#profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => switchScreen('profile-screen'));
        }

        const profileNavBtn = discoverScreen.querySelector('#profile-btn-nav');
        if (profileNavBtn) {
            profileNavBtn.addEventListener('click', () => switchScreen('profile-screen'));
        }

        const mapNavBtn = discoverScreen.querySelector('#map-btn');
        if (mapNavBtn) {
            mapNavBtn.addEventListener('click', () => switchScreen('map-screen'));
        }
    }

    // Map screen buttons
    const mapScreen = document.getElementById('map-screen');
    if (mapScreen) {
        const mapBtn = mapScreen.querySelector('.map-button');
        if (mapBtn) {
            mapBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Abrindo localização no mapa...');
            });
        }
    }

    // Profile screen buttons
    const profileScreen = document.getElementById('profile-screen');
    if (profileScreen) {
        const saveBtn = profileScreen.querySelector('.save-button');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const originalText = saveBtn.textContent;
                saveBtn.textContent = '✓ Salvo!';
                saveBtn.style.background = 'linear-gradient(135deg, #25D366, #20BA5C)';
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                    saveBtn.style.background = 'linear-gradient(135deg, #6063EE, #4648D4)';
                }, 2000);
            });
        }

        const logoutBtn = profileScreen.querySelector('.logout-button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout);
        }

        const helpBtns = profileScreen.querySelectorAll('.help-button');
        helpBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Abrindo: ' + btn.querySelector('span:nth-child(2)').textContent);
            });
        });
    }

    // All notification toggles
    const toggles = document.querySelectorAll('.toggle-checkbox');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const title = this.closest('.notification-item').querySelector('.notification-title');
            if (title) {
                title.style.opacity = this.checked ? '1' : '0.6';
            }
        });
    });
}

function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(96, 99, 238, 0.2)';
        });

        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });

        input.addEventListener('input', function(e) {
            console.log('Pesquisando:', e.target.value);
        });
    });
}

function setupCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => {
                b.style.opacity = '0.7';
                b.style.transform = 'scale(1)';
            });
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
            console.log('Categoria selecionada:', this.textContent);
        });
    });
}

function setupBusinessCards() {
    const cards = document.querySelectorAll('.business-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });

        card.addEventListener('click', function() {
            const name = this.querySelector('.business-name').textContent;
            alert('Visualizando: ' + name);
        });
    });

    // Nearby items
    const nearbyItems = document.querySelectorAll('.nearby-item');
    nearbyItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const name = this.querySelector('h3').textContent;
            alert('Abrindo detalhes de: ' + name);
        });
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

function setupProfileForm() {
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#6063EE';
            this.style.backgroundColor = 'white';
            this.style.boxShadow = '0 0 0 3px rgba(96, 99, 238, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#E8E7FF';
            this.style.boxShadow = 'none';
        });
    });
}

function setupNavigation() {
    // Discover screen nav
    const discoverNav = document.getElementById('discover-screen')?.querySelectorAll('.nav-item');
    if (discoverNav && discoverNav.length >= 3) {
        discoverNav[0].addEventListener('click', () => switchScreen('discover-screen'));
        discoverNav[1].addEventListener('click', () => switchScreen('map-screen'));
        discoverNav[2].addEventListener('click', () => switchScreen('profile-screen'));
    }

    // Map screen nav
    const mapNav = document.getElementById('map-screen')?.querySelectorAll('.nav-item');
    if (mapNav && mapNav.length >= 3) {
        mapNav[0].addEventListener('click', () => switchScreen('discover-screen'));
        mapNav[1].addEventListener('click', () => switchScreen('map-screen'));
        mapNav[2].addEventListener('click', () => switchScreen('profile-screen'));
    }

    // Profile screen nav
    const profileNav = document.getElementById('profile-screen')?.querySelectorAll('.nav-item');
    if (profileNav && profileNav.length >= 3) {
        profileNav[0].addEventListener('click', () => switchScreen('discover-screen'));
        profileNav[1].addEventListener('click', () => switchScreen('map-screen'));
        profileNav[2].addEventListener('click', () => switchScreen('profile-screen'));
    }
}

// Add button press animation
document.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('mouseup', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(1)';
    }
});