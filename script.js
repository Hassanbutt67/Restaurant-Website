// ========================================
// RESTAURANT WEBSITE - COMPLETE JAVASCRIPT
// ========================================

// ===== DOM ELEMENTS =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const reservationForm = document.getElementById('reservationForm');
const newsletterForm = document.getElementById('newsletterForm');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');

// ===== HAMBURGER MENU =====
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== RESERVATION FORM =====
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('resName').value.trim();
        const email = document.getElementById('resEmail').value.trim();
        const phone = document.getElementById('resPhone').value.trim();
        const date = document.getElementById('resDate').value;
        const time = document.getElementById('resTime').value;
        
        if (!name || !email || !phone || !date || !time) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        showToast(`✅ Table booked for ${name} on ${date} at ${time}! We'll confirm shortly.`, 'success');
        reservationForm.reset();
    });
}

// ===== CONTACT FORM =====
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        let allFilled = true;
        inputs.forEach(input => { if (!input.value.trim()) allFilled = false; });
        if (!allFilled) { showToast('Please fill in all fields.', 'error'); return; }
        showToast('✅ Thank you! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// ===== NEWSLETTER FORM =====
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const email = input.value.trim();
        if (!email) { showToast('Please enter your email address.', 'error'); return; }
        showToast('✅ Subscribed successfully! Check your email for updates.', 'success');
        input.value = '';
    });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.classList.remove('show'); }, 4000);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.stat .number[data-count]');
if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const increment = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = current;
                    }
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// ✨ UNIQUE FEATURE 1: MOOD-BASED MENU SUGGESTIONS
// ========================================
const moodCards = document.querySelectorAll('.mood-card');
const moodResult = document.getElementById('moodResult');

const moodRecommendations = {
    romantic: { dish: 'Butter Chicken with Garlic Naan', drink: 'Kashmiri Chai', desc: 'A romantic dinner with rich flavors' },
    adventurous: { dish: 'Karachi-Style Biryani', drink: 'Lassi', desc: 'Bold spices for the adventurous soul' },
    comfort: { dish: 'Nihari with Tandoori Roti', drink: 'Karak Chai', desc: 'Warm, hearty, and comforting' },
    healthy: { dish: 'Grilled Fish with Salad', drink: 'Fresh Juice', desc: 'Fresh, nutritious, and delicious' },
    celebratory: { dish: 'Dastarkhwan Special Platter', drink: 'Rooh Afza', desc: 'A celebration of Pakistani flavors' }
};

moodCards.forEach(card => {
    card.addEventListener('click', () => {
        moodCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const mood = card.dataset.mood;
        const rec = moodRecommendations[mood];
        
        moodResult.innerHTML = `
            <div class="recommendation">
                <p>🎯 Based on your <strong>${card.querySelector('h3').textContent}</strong> mood:</p>
                <p style="font-size: 1.3rem; margin-top: 0.5rem;">
                    We recommend <strong>${rec.dish}</strong> with <strong>${rec.drink}</strong>
                </p>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.3rem;">
                    ${rec.desc}
                </p>
                <a href="menu.html" class="btn btn-primary btn-sm" style="margin-top: 1rem;">
                    View Full Menu →
                </a>
            </div>
        `;
    });
});

// ========================================
// ✨ UNIQUE FEATURE 2: DRINK PAIRING CALCULATOR
// ========================================
const drinkRecommendBtn = document.getElementById('wineRecommendBtn');
const drinkDish = document.getElementById('wineDish');
const drinkResult = document.getElementById('wineResult');

const drinkPairings = {
    biryani: { name: 'Lassi', emoji: '🥤', desc: 'Refreshing yogurt drink to balance the spices' },
    nihari: { name: 'Karak Chai', emoji: '☕', desc: 'Strong, spicy tea to complement the richness' },
    kebab: { name: 'Rooh Afza', emoji: '🍹', desc: 'Rose-flavored drink with milk' },
    karahi: { name: 'Lemon Soda', emoji: '🥤', desc: 'Tangy and refreshing to cut through the richness' },
    dessert: { name: 'Kashmiri Chai', emoji: '☕', desc: 'Creamy pink tea with nuts' }
};

const dishNames = {
    biryani: 'Chicken Biryani',
    nihari: 'Nihari',
    kebab: 'Seekh Kebab',
    karahi: 'Chicken Karahi',
    dessert: 'Kheer'
};

if (drinkRecommendBtn) {
    drinkRecommendBtn.addEventListener('click', () => {
        const dish = drinkDish.value;
        const pair = drinkPairings[dish];
        
        drinkResult.innerHTML = `
            <div class="wine-glass">${pair.emoji}</div>
            <div class="wine-name">${pair.name}</div>
            <div class="wine-desc">${pair.desc}</div>
            <p style="color: var(--text-light); font-size: 0.85rem; margin-top: 0.3rem;">
                Perfect pairing for <strong>${dishNames[dish]}</strong>
            </p>
        `;
        showToast(`🥤 Drink recommendation ready!`, 'success');
    });
}

// ========================================
// ✨ UNIQUE FEATURE 3: GUEST PHOTO WALL
// ========================================
const addPhotoBtn = document.getElementById('addPhotoBtn');
const photoWall = document.getElementById('photoWall');

const photoMessages = [
    { emoji: '🍛', text: 'Amazing biryani!', user: '@foodie_lahore' },
    { emoji: '🥩', text: 'Best nihari ever!', user: '@karachi_foodie' },
    { emoji: '🎂', text: 'Birthday celebration!', user: '@birthday_girl' },
    { emoji: '🍚', text: 'Kheer was amazing', user: '@sweet_tooth' },
    { emoji: '🍗', text: 'Best karahi in town!', user: '@karahi_lover' },
    { emoji: '🥙', text: 'Seekh kebabs were perfect', user: '@kebab_king' }
];

if (addPhotoBtn) {
    addPhotoBtn.addEventListener('click', () => {
        const random = photoMessages[Math.floor(Math.random() * photoMessages.length)];
        const newPhoto = document.createElement('div');
        newPhoto.className = 'photo-item';
        newPhoto.style.animation = 'fadeIn 0.5s ease';
        newPhoto.innerHTML = `
            <div class="photo-placeholder">${random.emoji}</div>
            <div class="photo-overlay">
                <span>${random.text}</span>
                <small>${random.user}</small>
            </div>
        `;
        photoWall.prepend(newPhoto);
        showToast('📸 Thanks for sharing your moment!', 'success');
    });
}

// ========================================
// ✨ UNIQUE FEATURE 4: INTERACTIVE DISH HOVER
// ========================================
const interactiveDishes = document.querySelectorAll('.interactive-dish');

interactiveDishes.forEach(dish => {
    dish.addEventListener('mouseenter', () => {
        // The hover effect is already handled by CSS
    });
});

// ========================================
// MENU FILTER FUNCTIONALITY
// ========================================
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// 🎵 BACKGROUND MUSIC PLAYER - HIDDEN BY DEFAULT
// ========================================

// Get audio element
const audio = document.getElementById('bgAudio');
let isPlaying = false;
let currentTrack = 'sad';
let playerVisible = false;

// Track list
const tracks = {
    sad: {
        name: 'Sad',
        file: 'assets/music/sad.mp3'
    },
    qawwali: {
        name: 'Qawwali',
        file: 'assets/music/qawwali.mp3'
    },
    romantic: {
        name: 'Romantic',
        file: 'assets/music/romantic.mp3'
    }
};

// Show/Hide player
function showPlayer(show) {
    const playerDiv = document.querySelector('.audio-player');
    if (!playerDiv) return;
    
    if (show) {
        playerDiv.style.display = 'block';
        playerDiv.style.opacity = '0';
        playerDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            playerDiv.style.opacity = '1';
        }, 10);
        playerVisible = true;
    } else {
        playerDiv.style.opacity = '0';
        setTimeout(() => {
            playerDiv.style.display = 'none';
        }, 500);
        playerVisible = false;
    }
}

// Create audio player controls
function createAudioControls() {
    const playerDiv = document.querySelector('.audio-player');
    if (!playerDiv) {
        console.error('Audio player container not found!');
        return;
    }

    // Start hidden
    playerDiv.style.display = 'none';
    playerDiv.style.opacity = '0';

    const controls = document.createElement('div');
    controls.className = 'audio-controls';
    
    controls.innerHTML = `
        <span class="now-playing">🎵 <strong id="trackName">Sad</strong></span>
        <button class="audio-btn" id="playPauseBtn" title="Play/Pause">
            <i class="fas fa-play"></i>
        </button>
        <button class="audio-btn" id="prevTrackBtn" title="Previous">
            <i class="fas fa-step-backward"></i>
        </button>
        <button class="audio-btn" id="nextTrackBtn" title="Next">
            <i class="fas fa-step-forward"></i>
        </button>
        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="50" title="Volume">
    `;
    
    playerDiv.appendChild(controls);
    setupAudioControls();
}

// Setup audio controls
function setupAudioControls() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevTrackBtn = document.getElementById('prevTrackBtn');
    const nextTrackBtn = document.getElementById('nextTrackBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const trackNameEl = document.getElementById('trackName');
    
    // Play/Pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                this.innerHTML = '<i class="fas fa-play"></i>';
                console.log('⏸ Music paused');
            } else {
                const track = tracks[currentTrack];
                if (track) {
                    audio.src = track.file;
                    audio.load();
                }
                audio.play().then(() => {
                    isPlaying = true;
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                    console.log('▶ Music playing: ' + currentTrack);
                    if (trackNameEl) {
                        trackNameEl.textContent = tracks[currentTrack].name;
                    }
                }).catch((error) => {
                    console.error('Playback error:', error);
                    showToast('⚠️ Click play to start music.', 'error');
                });
            }
        });
    }
    
    // Previous track
    if (prevTrackBtn) {
        prevTrackBtn.addEventListener('click', function() {
            changeTrack('prev');
        });
    }
    
    // Next track
    if (nextTrackBtn) {
        nextTrackBtn.addEventListener('click', function() {
            changeTrack('next');
        });
    }
    
    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function(e) {
            if (audio) {
                audio.volume = this.value / 100;
            }
        });
    }
    
    // Audio ended - auto play next
    if (audio) {
        audio.addEventListener('ended', function() {
            changeTrack('next');
        });
        
        audio.addEventListener('loadeddata', function() {
            if (trackNameEl) {
                trackNameEl.textContent = tracks[currentTrack]?.name || 'Sad';
            }
        });
    }
}

// Change track
function changeTrack(direction) {
    if (!audio) return;
    
    const trackNames = Object.keys(tracks);
    let currentIndex = trackNames.indexOf(currentTrack);
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % trackNames.length;
    } else {
        currentIndex = (currentIndex - 1 + trackNames.length) % trackNames.length;
    }
    
    currentTrack = trackNames[currentIndex];
    const track = tracks[currentTrack];
    
    audio.src = track.file;
    audio.load();
    
    const trackNameEl = document.getElementById('trackName');
    if (trackNameEl) {
        trackNameEl.textContent = track.name;
    }
    
    if (isPlaying) {
        audio.play().catch((err) => {
            console.error('Auto-play failed:', err);
        });
    }
    
    const playPauseBtn = document.getElementById('playPauseBtn');
    if (playPauseBtn) {
        if (isPlaying) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
    
    showToast(`🎵 Now playing: ${track.name} music`, 'success');
}

// ========================================
// AMBIENT CONTROLS - SHOW PLAYER ON SONG SELECT
// ========================================
const ambientBtns = document.querySelectorAll('.ambient-btn');

ambientBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        ambientBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const sound = this.dataset.sound;
        
        if (!audio) return;
        
        if (sound === 'off') {
            audio.pause();
            isPlaying = false;
            const playBtn = document.getElementById('playPauseBtn');
            if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
            // HIDE the player when music is off
            showPlayer(false);
            showToast('🔇 Music turned off', 'info');
            return;
        }
        
        // SHOW the player when a song is selected
        showPlayer(true);
        
        const trackMap = {
            'sad': 'sad',
            'qawwali': 'qawwali',
            'romantic': 'romantic'
        };
        
        if (trackMap[sound]) {
            currentTrack = trackMap[sound];
            const track = tracks[currentTrack];
            audio.src = track.file;
            audio.load();
            
            const trackNameEl = document.getElementById('trackName');
            if (trackNameEl) {
                trackNameEl.textContent = track.name;
            }
            
            audio.play().then(() => {
                isPlaying = true;
                const playBtn = document.getElementById('playPauseBtn');
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch((err) => {
                console.error('Playback error:', err);
                const playBtn = document.getElementById('playPauseBtn');
                if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
                showToast('🎵 Click play to start music', 'info');
            });
            
            const soundNames = {
                'sad': '🎵 Sad Music',
                'qawwali': '🎤 Qawwali',
                'romantic': '💕 Romantic Music'
            };
            showToast(`🎵 Now playing: ${soundNames[sound]}`, 'success');
        }
    });
});

// ========================================
// BLOG CATEGORY FILTER
// ========================================
const blogCategoryBtns = document.querySelectorAll('.blog-categories .category-btn');
const blogCards = document.querySelectorAll('.blog-card');

if (blogCategoryBtns.length > 0) {
    blogCategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            blogCategoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// GALLERY CATEGORY FILTER
// ========================================
const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// LOAD MORE BLOG POSTS
// ========================================
const loadMoreBtn = document.getElementById('loadMoreBlog');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        showToast('📝 More blog posts coming soon!', 'info');
    });
}

// ========================================
// CONSOLE GREETING
// ========================================
console.log('🍽️ Welcome to Single Butt Restaurant!');
console.log('✨ Features:');
console.log('   🎵 Background Music (Sad, Qawwali, Romantic)');
console.log('   🎯 Mood-Based Menu Suggestions');
console.log('   🥤 Drink Pairing Calculator');
console.log('   📸 Guest Photo Wall');
console.log('   📝 Blog & Gallery Pages');
console.log('📧 Email: info@singlebutt.com');
console.log('📱 Phone: +92 300 1234567');
console.log('🇵🇰 Authentic Pakistani Flavors Since 2020');

// ========================================
// INITIALIZE AUDIO ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    createAudioControls();
    
    // Player starts hidden
    showPlayer(false);
    
    if (audio) {
        audio.src = 'assets/music/sad.mp3';
        audio.load();
        console.log('🎵 Audio player initialized! Click Sad, Qawwali, or Romantic to start music.');
        console.log('📂 Music files should be in: assets/music/');
        console.log('   - sad.mp3');
        console.log('   - qawwali.mp3');
        console.log('   - romantic.mp3');
    }
});
