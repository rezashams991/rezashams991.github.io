#Personal Portfolio Website

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript. It features a dynamic banner with a parallax effect, profile avatar border transitions based on scroll position, a fully responsive layout with a mobile-friendly navigation menu, **and an integrated Markdown reader** that can display any GitHub repository’s `README.md` (or any Markdown file) in a clean, documentation‑style layout.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
  - [Main Website](#main-website)
  - [Markdown Reader (Project Page)](#markdown-reader-project-page)
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
  - [Markdown Reader – Repository Allowlist](#markdown-reader--repository-allowlist)
  - [Markdown Reader – Customization](#markdown-reader--customization)
- [Third-Party Trademarks](#third-party-trademarks)
- [Credits](#credits)
- [License](#license)

---

## Features

- **Parallax Banner** – Fixed background image with smooth vertical parallax and fade‑out overlay text.
- **Dynamic Profile Border** – The avatar’s border color and glow change automatically as you scroll through different sections.
- **Card‑Based Layout** – Glass‑morphism cards with optional protruding visual placeholders (images, widgets, or any HTML).
- **Fully Responsive** – Optimized for desktop, tablet, and mobile with a collapsible sidebar menu.
- **Modular & Extensible** – Easily add new cards, visual elements, or sidebar links without modifying core CSS/JS.
- **Integrated Markdown Reader** – View any GitHub repository’s `README.md` (or any `.md` file) with a table of contents, syntax highlighting, and automatic link fixing. The reader supports internal navigation between Markdown files and respects a configurable owner allowlist for security.

---

## Technologies Used

- **HTML5** – Semantic markup.
- **CSS3** – Flexbox, Grid, glass‑morphism, and responsive media queries.
- **Vanilla JavaScript** – Scroll animations, border updates, mobile menu toggling, and Markdown rendering.
- **Marked** – Markdown‑to‑HTML parser.
- **DOMPurify** – HTML sanitizer for secure rendering.
- **External APIs** – Used for dynamic content (e.g., Exophase cards, GitHub profile summaries).

---

## File Structure

```
project/
├── index.html              # Main portfolio page
├── MDreader.html           # Markdown reader / project documentation page
├── css/
│   ├── style.css           # Core styles (desktop & shared)
│   ├── mobile.css          # Mobile‑specific overrides
│   └── project.css         # Markdown reader specific styles
├── js/
│   ├── script.js           # Main page functionality (parallax, border, mobile menu)
│   └── project.js          # Markdown reader logic (fetch, render, TOC, link handling)
├── assets/
│   ├── banner.png          # Banner background image
│   ├── avatar.png          # Icon for the Gaming card placeholder
│   ├── about.png           # Pattern for About card
│   ├── gaming.png          # Pattern for Gaming card
│   ├── social.png          # Pattern for Social card
│   ├── github.png          # Pattern for GitHub card
│   ├── projects.png        # Pattern for Projects card
│   ├── favicon-32x32.png
│   ├── favicon-16x16.png
│   └── apple-touch-icon.png
├── LICENSE                 # MIT License with asset exceptions
└── README.md               # This file
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

### Main Website

- **Scroll** – The banner text fades out and the background image shifts vertically.
- As you scroll through each card section, the **profile avatar’s border color** updates to match the active section (e.g., blue for About, green for Gaming, etc.).
- Click any **sidebar link** to smoothly navigate to the corresponding section.
- Hover over card images to see a subtle scale effect.

### Markdown Reader (Project Page)

The Markdown reader is accessible via `MDreader.html` and is designed to display documentation from public GitHub repositories.

**Basic usage:**
```
https://your-domain.com/MDreader.html?repo=username/repository
```

Example:  
`https://rezashams991.github.io/MDreader.html?repo=rezashams991/OpenAppointments`

**What it does:**
- Fetches the `README.md` from the specified repository’s default branch (usually `main`).
- Extracts the project title (from the first `#` heading) and a short description.
- Displays the project icon (`icon.png` from the repository root, falling back to an OpenGraph image).
- Renders the full Markdown content with:
  - A **Table of Contents** (generated from `h1`, `h2`, and `h3` headings).
  - Fixed relative image and link URLs (so they point to the correct files in the repository).
  - Internal links to other Markdown files inside the same repository become **clickable** – they will load and render the target file without a full page reload (single‑page application behaviour).
- Respects a configurable **owner allowlist** – by default only repositories owned by `rezashams991` can be viewed (see [Customization](#markdown-reader--repository-allowlist)).

On mobile, the Table of Contents collapses into a slide‑in menu accessible via a hamburger button (☰) at the top‑left.

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
  - Higher number (e.g., `6`) = faster fade‑out.
  - Lower number (e.g., `2`) = slower fade‑out.

---

### Social & Platform Links

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

### Markdown Reader – Repository Allowlist

For security and privacy, the Markdown reader only allows repositories owned by specific GitHub users. This is controlled by the `ALLOWED_OWNERS` array in `project.js`:

```javascript
const ALLOWED_OWNERS = ['rezashams991'];
```

**To add or remove owners:**
1. Open `js/project.js`.
2. Locate the `ALLOWED_OWNERS` constant.
3. Edit the array – each entry must be a GitHub username (string).
   ```javascript
   const ALLOWED_OWNERS = ['rezashams991', 'octocat', 'another-user'];
   ```
4. Save the file. The reader will now only accept repositories owned by these users.

**Behaviour when a repository owner is not allowed:**
- The page displays an “Access Denied” error message.
- No Markdown content is fetched or rendered.

---

### Markdown Reader – Customization

#### Changing the default branch
The default branch is set to `main`. To change it, edit the `DEFAULT_BRANCH` constant in `project.js`:

```javascript
const DEFAULT_BRANCH = "main";  // change to "master" or other branch name
```

#### Modifying the Markdown rendering style
The rendered Markdown content is styled via `css/project.css`. You can customise:
- Font sizes, colours, margins for headings, paragraphs, lists, etc.
- Code block backgrounds and syntax highlighting (via `pre` and `code` rules).
- Table of Contents appearance (links, indentation, hover effects).

#### Enabling / disabling the Table of Contents
If you prefer not to show a Table of Contents, you can hide the sidebar in `MDreader.html` by adding a `hidden` attribute to the `<aside id="sidebar">` element, or by setting its `display` to `none` via CSS.

#### Handling internal Markdown links
The reader automatically intercepts clicks on links that point to other `.md` files (either relative paths or absolute GitHub URLs) and loads them dynamically. This behaviour is implemented in `project.js` inside the `setupMDLinks()` function.

To disable this feature, comment out the `setupMDLinks()` call in the `initializeProjectPage()` function.

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
- **Marked** – Markdown parser used by the reader.
- **DOMPurify** – HTML sanitizer used for secure rendering.

---

## License

The **source code** (HTML, CSS, JavaScript) of this project is open‑source and available under the [MIT License](LICENSE). You are free to use, modify, and distribute the code for personal or commercial purposes.

**However**, all **assets** (images, icons, patterns, and logos) located in the `/assets` directory, as well as all personal profile links and usernames, are the exclusive property of Reza Shams and are **not** covered by the MIT License. You may not use or reproduce them without explicit permission.

See the [LICENSE](LICENSE) file for full details.

---

### Notes on Using This License

The MIT License with asset exceptions is a practical choice for open‑source projects that contain both code and personal media. Here are some additional considerations and ideas for improvement:

- **If you fork this project** to create your own portfolio, you **must** replace all assets (`/assets/*`) and personal profile links with your own content. The code itself is free to reuse.
- **If you plan to use this code in a commercial product**, the MIT License allows that, but remember that the assets (images, patterns, icons) are **not** licensed – you would need to provide your own.
- **If you want to contribute** to this project by improving the code, feel free to open a pull request. The code is MIT‑licensed, so your contributions will also be under the same license, but assets remain protected.
- **If you need a stricter license** (e.g., GPL) for the code, you can change it, but note that the Markdown reader depends on external libraries (Marked, DOMPurify) which have their own licenses (mostly MIT or BSD). Mixing licenses is possible but requires care.

> **Recommendation:** Keep the license as is – it strikes a good balance: the code is open for everyone, but your personal identity and visual identity remain under your control.

---

*Built with ❤ by [Reza Shams](https://github.com/rezashams991)*
