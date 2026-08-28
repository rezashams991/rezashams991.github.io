# Reza Shams - Personal Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. Features a dynamic banner with parallax effect, profile card border color transitions based on scroll position, and a fully responsive layout with mobile navigation.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Customization](#customization)
- [Credits](#credits)
- [License](#license)

---

## Features

- **Parallax Banner** – Fixed background image with smooth parallax scrolling and fade-out overlay text.
- **Dynamic Profile Border** – The avatar’s border color and glow change dynamically as you scroll through different sections.
- **Card-Based Layout** – Clean, glass-morphism cards with protruding placeholder images (avatars) on the left side.
- **Responsive Design** – Fully optimized for desktop, tablet, and mobile devices with a hamburger menu on smaller screens.
- **Gaming Widgets** – Displays Exophase achievement card with links to Xbox and Steam profiles.
- **Social Integration** – LinkedIn button with custom SVG icon.
- **GitHub & Project Cards** – Showcases GitHub profile summary and repository card with hover effects.

---

## Technologies Used

- **HTML5** – Semantic markup for structure.
- **CSS3** – Custom styles with flexbox, grid, glass-morphism, and responsive media queries.
- **Vanilla JavaScript** – Scroll-based animations, border updates, and mobile menu toggle.
- **External APIs** – Exophase card, GitHub profile summary, and GitHub repo card.

---

## File Structure

```
project/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Desktop styles
│   └── mobile.css      # Mobile-specific overrides
├── js/
│   └── script.js       # JavaScript functionality
├── assets/
│   ├── banner.png      # background image
│   ├── avatar.png      # Gaming card icon
│   ├── about.png       # Pattern for About card
│   ├── gaming.png      # Pattern for Gaming card
│   ├── social.png      # Pattern for Social card
│   ├── github.png      # Pattern for GitHub card
│   ├── projects.png    # Pattern for Projects card
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   └── apple-touch-icon.png
└── README.md           # This file
```

---

## Installation & Setup

1. **Clone or download** this repository to your local machine.
2. Place your own images inside the `assets/` folder (replace `banner.png`, `avatar.png`, and the pattern images).
3. Open `index.html` directly in your browser – no build tools or server required.
4. Optionally, update the profile avatar URL in `index.html`:
   ```html
   <img id="profile-avatar" src="https://avatars.githubusercontent.com/your-username" alt="Profile">
   ```
5. Customize the color map in `script.js` to match your preferred section colors:
   ```javascript
   const borderMap = {
       "about-card": "#6fb7ff",
       "gaming-card": "#4CAF50",
       // ...
   };
   ```

---

## Usage

### Desktop View
- Scroll down to see the banner text fade out and the background image shift.
- As you scroll through each card section, the profile avatar’s border color updates to match the active section.
- Click sidebar links to smoothly navigate to each section.

### Mobile View
- The profile avatar moves to the top-left corner and shrinks.
- A hamburger menu button appears – tap it to slide in the sidebar navigation.
- Cards stack vertically with smaller padding and a smaller avatar placeholder on the left.

---

## Customization

- **Change banner image** – Replace `assets/banner.png` with your own image.
- **Change section patterns** – Replace the corresponding `.png` files in `assets/`.
- **Adjust border colors** – Edit the `borderMap` object in `script.js`.
- **Modify card content** – Update the `<p>` text inside each `.card-content` in `index.html`.
- **Tweak parallax speed** – Adjust the exponent in `Math.exp(-progress * 4)` inside `script.js`.
- **Update social links** – Replace the `href` attributes in the LinkedIn, Xbox, and Steam links.

---

## Credits

- **Exophase** – Gaming achievement card provided by [Exophase](https://www.exophase.com/).
- **GitHub Profile Summary** – Powered by [GitHub Profile Summary Cards](https://github-profile-summary-cards.vercel.app/).
- **GitHub Repo Card** – Generated via [gh-card.dev](https://gh-card.dev/).
- **LinkedIn SVG Icon** – Official LinkedIn brand icon.

---

## License

The **source code** (HTML, CSS, JavaScript) of this project is open-source and available under the [MIT License](LICENSE). You are free to use, modify, and distribute the code for personal or commercial purposes.

**However**, all **assets** (images, icons, patterns, and logos) located in the `/assets` directory, as well as all personal profile links and usernames, are the exclusive property of Reza Shams and are **not** covered by the MIT License. You may not use or reproduce them without explicit permission.

See the [LICENSE](LICENSE) file for full details.

---

*Built with ❤ by [Reza Shams](https://github.com/rezashams991)*