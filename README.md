# Reza Shams – Personal Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. It features a dynamic banner with a parallax effect, profile avatar border transitions based on scroll position, and a fully responsive layout with a mobile-friendly navigation menu.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Customization](#customization)
  - [Colors & Border Map](#colors--border-map)
  - [Adding a New Card](#adding-a-new-card)
  - [Adding Visual Elements to a Card](#adding-visual-elements-to-a-card)
  - [Sidebar Links](#sidebar-links)
  - [Banner Image & Parallax Speed](#banner-image--parallax-speed)
  - [Social & Platform Links](#social--platform-links)
  - [Reusable Hover Effect](#reusable-hover-effect)
  - [Creating Custom Buttons](#creating-custom-buttons)
  - [Replacing Assets (Images, Icons & Patterns)](#replacing-assets-images-icons--patterns)
- [Third-Party Trademarks](#third-party-trademarks)
- [Credits](#credits)
- [License](#license)

---

## Features

- **Parallax Banner** – Fixed background image with smooth vertical parallax and fade-out overlay text.
- **Dynamic Profile Border** – The avatar’s border color and glow change automatically as you scroll through different sections.
- **Card-Based Layout** – Glass‑morphism cards with optional protruding visual placeholders (images, widgets, or any HTML).
- **Fully Responsive** – Optimized for desktop, tablet, and mobile with a collapsible sidebar menu.
- **Modular & Extensible** – Easily add new cards, visual elements, or sidebar links without modifying core CSS/JS.

---

## Technologies Used

- **HTML5** – Semantic markup.
- **CSS3** – Flexbox, Grid, glass‑morphism, and responsive media queries.
- **Vanilla JavaScript** – Scroll animations, border updates, and mobile menu toggling.
- **External APIs** – Used for dynamic content (e.g., Exophase cards, GitHub profile summaries).

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
│   ├── banner.png      # Banner background image
│   ├── avatar.png      # Icon for the Gaming card placeholder
│   ├── about.png       # Pattern for About card
│   ├── gaming.png      # Pattern for Gaming card
│   ├── social.png      # Pattern for Social card
│   ├── github.png      # Pattern for GitHub card
│   ├── projects.png    # Pattern for Projects card
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   └── apple-touch-icon.png
├── LICENSE             # MIT License with asset exceptions
└── README.md           # This file
```

---

## Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) Git and a code editor (VS Code, Sublime Text, etc.)

### Clone the Repository
```bash
git clone https://github.com/rezashams991/rezashams991.github.io.git
cd rezashams991.github.io
```

### Download as ZIP
1. Go to the repository on GitHub.
2. Click **Code** → **Download ZIP**.
3. Extract the ZIP file to your preferred location.

### Run Locally
Simply open `index.html` in your browser – no build tools or server required.

### Deploy to GitHub Pages (Optional)
1. Push the repository to GitHub.
2. Go to **Settings > Pages**.
3. Select the `main` branch as the source and save.
4. Your site will be live at `https://your-username.github.io/`.

---

## Usage

### Desktop View
- **Scroll** – The banner text fades out and the background image shifts vertically.
- As you scroll through each card section, the **profile avatar’s border color** updates to match the active section (e.g., blue for About, green for Gaming, etc.).
- Click any **sidebar link** to smoothly navigate to the corresponding section.
- Hover over card images to see a subtle scale effect.

### Mobile View (≤ 900px)
- The profile avatar moves to the **top-left corner** and shrinks to 65px.
- A **hamburger menu** (☰) appears – tap it to slide in the sidebar.
- Cards stack vertically with smaller padding and a smaller avatar placeholder (70px) on the left.
- All card images scale to 100% width.

---

## Customization

### Colors & Border Map
Border colors are defined in `script.js` inside the `borderMap` object:

```javascript
const borderMap = {
    "about-card": "#6fb7ff",    // Blue
    "gaming-card": "#4CAF50",   // Green
    "social-card": "#5865F2",   // Discord Blue
    "github-card": "#ffffff",   // White
    "projects-card": "#ffb347"  // Orange
};
```

To change a color, replace the hex value. The avatar’s border and glow will update automatically.

---

### Adding a New Card
1. Copy an existing card structure (e.g., the About card) from `index.html`.
2. Paste it inside the `#content` div.
3. Change the `id` to a unique name (e.g., `#blog-card`).
4. Add the new ID to the `borderMap` in `script.js` with your desired color.
5. Add a new pattern class in `style.css`:
   ```css
   .pattern-blog::before {
       background-image: url("../assets/blog.png");
   }
   ```
6. Add a sidebar link in `<nav id="sidebar-menu">`:
   ```html
   <a href="#blog-card">Blog</a>
   ```

---

### Adding Visual Elements to a Card
Each card includes a `card-image-placeholder` div designed to hold any HTML content – images, widgets, buttons, or text.

```html
<div class="card-image-placeholder">
    <img src="assets/your-image.png" alt="Description">
</div>
```

You can replace the `<img>` with any HTML (e.g., a widget, a button, an icon, or even an iframe). The element will automatically protrude from the left on desktop and adapt to a smaller size on mobile.

**Note:** If the placeholder is left empty, the card will not display any visual element.

---

### Sidebar Links
- Located in `<nav id="sidebar-menu">` inside `index.html`.
- Each `<a>` tag’s `href` must match the card’s `id` (e.g., `href="#about-card"`).
- To reorder or rename links, simply edit this list.

---

### Banner Image & Parallax Speed
- **Banner image**: Replace `assets/banner.png` with your own image (1920×1080 recommended).
- **Parallax speed**: In `script.js`, adjust the exponent in:
  ```javascript
  const fade = Math.exp(-progress * 4);
  ```
  - Higher number (e.g., `6`) = faster fade-out.
  - Lower number (e.g., `2`) = slower fade-out.

---

### Social & Platform Links
- **LinkedIn**: Edit the `href` in the `.btn-linkedin` anchor inside `#social-card`.
- **Xbox & Steam**: Edit the `href` attributes inside `#gaming-card` (two `.card-link` paragraphs).
- **GitHub**: Edit the `href` in the `.github-card-link` and the text link below it.
- **Projects**: Edit the `href` in the `.projects-card-link` and the text link below it.

To add a new platform link (e.g., Twitter, Instagram), create a new button (see [Creating Custom Buttons](#creating-custom-buttons)).

---

### Reusable Hover Effect
A subtle scale‑on‑hover effect is applied to `.github-card-link`, `.projects-card-link`, and `.exophase-card-link`. To reuse it on any image or link:

```css
.scale-on-hover {
    display: block;
    transition: transform 0.2s ease;
}
.scale-on-hover:hover {
    transform: scale(1.01);
}
```

Then apply it in HTML:
```html
<a href="#" class="scale-on-hover">
    <img src="...">
</a>
```

Text links (`.card-link a`) already have underline‑on‑hover and opacity transitions by default.

---

### Creating Custom Buttons
The LinkedIn button uses `.btn-linkedin`. To create a similar button with your own color:

```css
.btn-myplatform {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    padding: 10px 20px;
    background: #yourColor;
    color: white;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.2s;
}
.btn-myplatform:hover {
    background: #darkerShade;
}
```

Then in HTML:
```html
<a href="https://myplatform.com/username" target="_blank" class="btn-myplatform">
    <svg><!-- Your icon --></svg>
    My Platform
</a>
```

If you don’t have an SVG icon, you can use an emoji or plain text.

---

### Replacing Assets (Images, Icons & Patterns)

| File | Purpose | How to replace |
|------|---------|----------------|
| `banner.png` | Banner background | Replace with your own image (1920×1080 recommended) |
| `avatar.png` | Icon next to the Gaming card | Replace with any icon or logo |
| `about.png`, `gaming.png`, etc. | Repeating background patterns for each card | Replace with your own pattern designs |
| `favicon-*.png` | Browser favicon | Replace with your own favicon files |

**To replace:** Place your new file in `assets/` with the **same name**, or update the file path in `style.css` / `index.html` accordingly.

> Patterns are set to repeat (`background-repeat: repeat`) with a size of `650px`. You can adjust `background-size` in `style.css` if needed.

---

## Third-Party Trademarks

This project includes links and references to external platforms and services, including but not limited to:

- **GitHub** – owned by GitHub, Inc.
- **Xbox** – owned by Microsoft Corporation.
- **Steam** – owned by Valve Corporation.
- **LinkedIn** – owned by LinkedIn Corporation.
- **Exophase** – owned by Exophase Ltd.

All trademarks, service marks, and logos displayed in this project remain the property of their respective owners. Their inclusion does not imply endorsement or affiliation.

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