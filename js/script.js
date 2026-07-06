const hero = document.getElementById("hero");

const image = document.getElementById("hero-image");

const welcome = document.getElementById("welcome");

const subtitle = document.getElementById("subtitle");

window.addEventListener("scroll",()=>{

    const heroScroll = hero.offsetHeight - window.innerHeight;

    const progress = Math.min(window.scrollY / heroScroll ,1);


    welcome.style.opacity = 1-progress;

    subtitle.style.opacity = 1-progress;


    image.style.backgroundPosition = `center ${progress*100}%`;

});


const profileImage = document.getElementById("profile-image");

const avatars = {

    "about-card":{

        src:"https://avatars.githubusercontent.com/rezashams991",

        border:"#6fb7ff"

    },

    "gaming-card":{

        src:"https://avatars.githubusercontent.com/rezashams991",

        border:"#4CAF50"

    },

    "social-card":{

        src:"https://avatars.githubusercontent.com/rezashams991",

        border:"#5865F2"

    },

    "github-card":{

        src:"https://avatars.githubusercontent.com/rezashams991",

        border:"#ffffff"

    },

    "projects-card":{

        src:"https://avatars.githubusercontent.com/rezashams991",

        border:"#ffb347"

    }

};


const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        const data = avatars[entry.target.id];

        if(!data) return;

        if (profileImage.src.endsWith(data.src.split("/").pop())) return;
        profileImage.style.opacity="0";

        profileImage.style.transform="translateX(-50%) scale(.92)";

        setTimeout(()=>{

            profileImage.src=data.src;

            profileImage.style.borderColor = data.border;

            profileImage.style.boxShadow = `0 0 18px ${data.border}`;

            profileImage.style.borderColor=data.border;

            profileImage.style.opacity="1";

            profileImage.style.transform="translateX(-50%) scale(1)";

        },180);

    });

},{
    threshold:.55
});


document.querySelectorAll(".section-card").forEach(card=>{

    observer.observe(card);

});

const menu=document.getElementById("mobile-menu-btn");

const sidebar=document.getElementById("sidebar");

const overlay=document.getElementById("mobile-overlay");

menu.onclick=()=>{

    sidebar.classList.toggle("open");

    overlay.classList.toggle("show");

    menu.innerHTML=sidebar.classList.contains("open")?"✕":"☰";

};

overlay.onclick=()=>{

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

    menu.innerHTML="☰";

};
