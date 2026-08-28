// ===== Banner Parallax =====
const banner = document.getElementById("banner");
const bannerImage = document.getElementById("banner-image");
const welcomeText = document.getElementById("welcome-text");
const scrollHint = document.getElementById("scroll-hint");

window.addEventListener("scroll", () => {
    const bannerScroll = banner.offsetHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / bannerScroll, 1);

    if (progress < 1) {
        const fade = Math.exp(-progress * 4);
        welcomeText.style.opacity = fade;
        scrollHint.style.opacity = fade;
        bannerImage.style.backgroundPosition = `center ${progress * 100}%`;
    } else {
        welcomeText.style.opacity = 0;
        scrollHint.style.opacity = 0;
        bannerImage.style.backgroundPosition = "center 100%";
    }
});

// ===== Profile Avatar Border Update (based on scroll) =====
const profileAvatar = document.getElementById("profile-avatar");
const borderMap = {
    "about-card": "#6fb7ff",
    "gaming-card": "#4CAF50",
    "social-card": "#5865F2",
    "github-card": "#ffffff",
    "projects-card": "#ffb347"
};

const cards = document.querySelectorAll(".card");
let activeSection = null;

function updateBorder() {
    let currentId = null;
    const viewportTop = window.scrollY;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY;
        const cardBottom = rect.bottom + window.scrollY;

        if (cardTop <= viewportTop + 100 && cardBottom > viewportTop + 100) {
            currentId = card.id;
        }
    });

    // Fallback to last card if none matches (bottom of page)
    if (!currentId && cards.length > 0) {
        const lastCard = cards[cards.length - 1];
        const rect = lastCard.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            currentId = lastCard.id;
        }
    }

    if (currentId && currentId !== activeSection) {
        const color = borderMap[currentId];
        if (color) {
            activeSection = currentId;
            profileAvatar.style.borderColor = color;
            profileAvatar.style.boxShadow = `0 0 18px ${color}`;
        }
    }
}

// Set initial border (About card)
if (cards.length > 0 && borderMap[cards[0].id]) {
    const color = borderMap[cards[0].id];
    activeSection = cards[0].id;
    profileAvatar.style.borderColor = color;
    profileAvatar.style.boxShadow = `0 0 18px ${color}`;
}

window.addEventListener("scroll", updateBorder);
window.addEventListener("resize", updateBorder);

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("mobile-overlay");

menuBtn.onclick = () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
    menuBtn.innerHTML = sidebar.classList.contains("open") ? "✕" : "☰";
};

overlay.onclick = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    menuBtn.innerHTML = "☰";
};