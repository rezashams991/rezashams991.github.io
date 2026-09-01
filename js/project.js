// =========================================================
// Project Page
// Loads and renders a GitHub repository README.md
// =========================================================


// ---------------------------------------------------------
// Configuration
// ---------------------------------------------------------

const DEFAULT_BRANCH = "main";

// Allowed repository owners (edit this list)
const ALLOWED_OWNERS = ['rezashams991'];

// History of loaded Markdown files
let mdHistory = [];

// ---------------------------------------------------------
// DOM Elements
// ---------------------------------------------------------

const projectTitle = document.getElementById("project-title");
const projectDescription = document.getElementById("project-description");
const projectIcon = document.getElementById("project-icon");
const githubLink = document.getElementById("github-link");

const markdownLoading = document.getElementById("markdown-loading");
const markdownError = document.getElementById("markdown-error");
const markdownContent = document.getElementById("markdown-content");

const projectToc = document.getElementById("project-toc");

// ---------------------------------------------------------
// About Repository Description
// ---------------------------------------------------------

async function fetchRepoDescription(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (response.ok) {
            const data = await response.json();
            return data.description || "Project documentation and information.";
        }
    } catch (err) {}
    return "Project documentation and information.";
}

// ---------------------------------------------------------
// Get Repository From URL
// ---------------------------------------------------------

function getRepositoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("repo");
}

// ---------------------------------------------------------
// Validate Repository Name
// ---------------------------------------------------------

function isValidRepository(repo) {
    if (!repo) return false;
    return /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo);
}

// ---------------------------------------------------------
// Check Owner Allowlist
// ---------------------------------------------------------

function isOwnerAllowed(repo) {
    const parts = repo.split('/');
    const owner = parts[0];
    return ALLOWED_OWNERS.includes(owner);
}

// ---------------------------------------------------------
// Create GitHub URLs
// ---------------------------------------------------------

function getGitHubURL(repo) {
    return `https://github.com/${repo}`;
}

function getRawReadmeURL(repo) {
    return `https://raw.githubusercontent.com/${repo}/${DEFAULT_BRANCH}/README.md`;
}

function getRepositoryIconURL(repo) {
    return `https://raw.githubusercontent.com/${repo}/${DEFAULT_BRANCH}/icon.png`;
}

// NEW: Build raw URL for any file in repo
function getRawFileURL(repo, filePath) {
    // Remove leading './' or '/'
    const cleanPath = filePath.replace(/^\.?\//, '');
    return `https://raw.githubusercontent.com/${repo}/${DEFAULT_BRANCH}/${cleanPath}`;
}

// ---------------------------------------------------------
// Load Marked
// ---------------------------------------------------------

function loadMarked() {
    return new Promise((resolve, reject) => {
        if (window.marked) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
        script.onload = () => resolve();
        script.onerror = () => {
            reject(new Error("Could not load Markdown parser."));
        };
        document.head.appendChild(script);
    });
}

// ---------------------------------------------------------
// Load DOMPurify
// ---------------------------------------------------------

function loadDOMPurify() {
    return new Promise((resolve, reject) => {
        if (window.DOMPurify) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/dompurify@3.2.6/dist/purify.min.js";
        script.onload = () => resolve();
        script.onerror = () => {
            reject(new Error("Could not load HTML sanitizer."));
        };
        document.head.appendChild(script);
    });
}

// ---------------------------------------------------------
// Fetch README
// ---------------------------------------------------------

async function fetchReadme(repo) {
    const url = getRawReadmeURL(repo);
    const response = await fetch(url, {
        cache: "no-cache"
    });
    if (!response.ok) {
        throw new Error(`README could not be loaded. HTTP ${response.status}`);
    }
    return await response.text();
}

// NEW: Fetch any Markdown file from repo
async function fetchMarkdownFile(repo, filePath) {
    const url = getRawFileURL(repo, filePath);
    const response = await fetch(url, {
        cache: "no-cache"
    });
    if (!response.ok) {
        throw new Error(`File could not be loaded. HTTP ${response.status}`);
    }
    return await response.text();
}

// ---------------------------------------------------------
// Extract Project Information
// ---------------------------------------------------------

function extractProjectInfo(markdown, repo) {
    const lines = markdown.split("\n");
    let title = null;
    let description = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("# ")) {
            title = trimmed.replace(/^#\s+/, "").trim();
            break;
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (
            !trimmed ||
            trimmed.startsWith("#") ||
            trimmed.startsWith("![") ||
            trimmed.startsWith("[![") ||
            trimmed.startsWith("- ") ||
            trimmed.startsWith("* ") ||
            trimmed.startsWith("> ") ||
            trimmed.startsWith("```")
        ) {
            continue;
        }
        description = trimmed;
        break;
    }

    if (!title) {
        const parts = repo.split("/");
        title = parts[1] || "Project";
    }

    return { title, description };
}

// ---------------------------------------------------------
// Fix Markdown Relative URLs
// ---------------------------------------------------------

function getRepositoryBaseURL(repo) {
    return `https://github.com/${repo}/blob/${DEFAULT_BRANCH}/`;
}

function getRepositoryRawBaseURL(repo) {
    return `https://raw.githubusercontent.com/${repo}/${DEFAULT_BRANCH}/`;
}

function isAbsoluteURL(url) {
    return (
        url.startsWith("http://") ||
        url.startsWith("https://") ||
        url.startsWith("//") ||
        url.startsWith("#") ||
        url.startsWith("mailto:") ||
        url.startsWith("tel:")
    );
}

// ---------------------------------------------------------
// Fix Images
// ---------------------------------------------------------

function fixImageURLs(repo) {
    const images = markdownContent.querySelectorAll("img");
    const rawBaseURL = getRepositoryRawBaseURL(repo);
    images.forEach(image => {
        const src = image.getAttribute("src");
        if (!src || isAbsoluteURL(src)) return;
        const cleanPath = src.replace(/^\.\/+/, "");
        image.src = rawBaseURL + cleanPath;
    });
}

// ---------------------------------------------------------
// Fix Links (non-MD links still open in new tab)
// ---------------------------------------------------------

function fixLinkURLs(repo) {
    const links = markdownContent.querySelectorAll("a");
    const githubBaseURL = getRepositoryBaseURL(repo);
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || isAbsoluteURL(href)) return;
        if (href.startsWith("#")) return;
        const cleanPath = href.replace(/^\.\/+/, "");
        link.href = githubBaseURL + cleanPath;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });
}

// ---------------------------------------------------------
// Generate Table of Contents
// ---------------------------------------------------------

function generateTableOfContents() {
    projectToc.innerHTML = "";
    const headings = markdownContent.querySelectorAll("h1, h2, h3");
    headings.forEach((heading, index) => {
        let id = heading.id;
        if (!id) {
            id = createHeadingID(heading.textContent, index);
            heading.id = id;
        }
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.classList.add(`toc-${heading.tagName.toLowerCase()}`);
        projectToc.appendChild(link);
    });

    if (headings.length === 0) {
        document.getElementById("sidebar").style.display = "none";
    } else {
        document.getElementById("sidebar").style.display = "block";
    }
}

// ---------------------------------------------------------
// Create Heading ID
// ---------------------------------------------------------

function createHeadingID(text, index) {
    let id = text
        .toLowerCase()
        .trim()
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w\u0600-\u06FF-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    if (!id) id = `section-${index}`;
    return id;
}

// ---------------------------------------------------------
// Smooth Scroll for TOC
// ---------------------------------------------------------

function enableTOCScrolling() {
    projectToc.addEventListener("click", event => {
        const link = event.target.closest("a");
        if (!link) return;
        const targetID = link.getAttribute("href");
        if (!targetID || !targetID.startsWith("#")) return;
        const target = document.querySelector(targetID);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        history.replaceState(null, "", targetID);
    });
}

// ---------------------------------------------------------
// Render Markdown
// ---------------------------------------------------------

async function renderMarkdown(markdown) {
    await loadMarked();
    await loadDOMPurify();

    marked.setOptions({
        gfm: true,
        breaks: true
    });

    const rawHTML = marked.parse(markdown);
    const cleanHTML = DOMPurify.sanitize(rawHTML, {
        USE_PROFILES: { html: true }
    });
    markdownContent.innerHTML = cleanHTML;
}

// ---------------------------------------------------------
// Show Error
// ---------------------------------------------------------

function showError(message) {
    markdownLoading.hidden = true;
    markdownContent.innerHTML = "";
    markdownError.hidden = false;
    const paragraph = markdownError.querySelector("p");
    paragraph.textContent = message;
}

// ---------------------------------------------------------
// Show Loading
// ---------------------------------------------------------

function showLoading() {
    markdownLoading.hidden = false;
    markdownError.hidden = true;
    markdownContent.innerHTML = "";
}

// ---------------------------------------------------------
// Show Content
// ---------------------------------------------------------

function showContent() {
    markdownLoading.hidden = true;
    markdownError.hidden = true;
}

// ---------------------------------------------------------
// Update Page Information
// ---------------------------------------------------------

async function updateProjectHeader(repo, markdown) {
    const info = extractProjectInfo(markdown, repo);
    projectTitle.textContent = info.title;

    projectDescription.textContent = await fetchRepoDescription(repo);

    const iconURL = getRepositoryIconURL(repo);
    projectIcon.src = iconURL;
    projectIcon.alt = `${info.title} repository`;
    projectIcon.onerror = () => {
        projectIcon.onerror = null;
        projectIcon.src = `https://opengraph.githubassets.com/1/${repo}`;
    };

    githubLink.href = getGitHubURL(repo);

    document.querySelectorAll("link[rel*='icon']").forEach(icon => {
        icon.href = iconURL;
    });
}

// ---------------------------------------------------------
// Update Browser Title (just repo name or file name)
// ---------------------------------------------------------

function updateBrowserTitle(repo, filePath) {
    let name = repo.split('/').pop() || 'Project';
    if (filePath && filePath !== 'README.md') {
        // extract filename without path and extension
        const fileName = filePath.split('/').pop().replace(/\.md$/i, '');
        if (fileName) name = fileName;
    }
    document.title = name;
}

// ---------------------------------------------------------
// Enable Mobile TOC (hamburger)
// ---------------------------------------------------------

function enableMobileTOC() {
    const btn = document.getElementById('mobile-toc-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (!btn || !sidebar || !overlay) return;

    const toggle = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        btn.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
    };

    btn.addEventListener('click', toggle);
    overlay.addEventListener('click', toggle);
}

// =========================================================
// Handle internal Markdown links
// =========================================================

function extractRepoAndPathFromLink(href, currentRepo) {
    // Ignore internal anchors
    if (href.startsWith('#')) return null;

    // Check if it points to a .md file (case insensitive)
    const mdRegex = /\.md$/i;
    if (!mdRegex.test(href)) return null;

    // If it's a relative path, use current repo
    if (!href.startsWith('http://') && !href.startsWith('https://')) {
        // Remove leading './' and any query/hash
        const clean = href.split('?')[0].split('#')[0];
        return { repo: currentRepo, path: clean };
    }

    // Absolute GitHub URL
    // Try to match: https://github.com/username/repo/blob/branch/path/to/file.md
    // or https://raw.githubusercontent.com/username/repo/branch/path/to/file.md
    const githubMatch = href.match(/github\.com\/([^\/]+\/[^\/]+)\/blob\/[^\/]+\/(.+?)(\?|#|$)/i);
    if (githubMatch) {
        return { repo: githubMatch[1], path: githubMatch[2] };
    }

    // raw.githubusercontent.com pattern
    const rawMatch = href.match(/raw\.githubusercontent\.com\/([^\/]+\/[^\/]+)\/[^\/]+\/(.+?)(\?|#|$)/i);
    if (rawMatch) {
        return { repo: rawMatch[1], path: rawMatch[2] };
    }

    // Not a recognized GitHub MD link
    return null;
}

async function loadAndRenderMarkdownFile(repo, filePath, isBack = false) {
    showLoading();

    try {
        const markdown = await fetchMarkdownFile(repo, filePath);
        
        await updateProjectHeader(repo, markdown); 
        updateBrowserTitle(repo, filePath);

        await renderMarkdown(markdown);
        fixImageURLs(repo);
        fixLinkURLs(repo); 
        generateTableOfContents();
        enableTOCScrolling();
        setupMDLinks(); 
        enableMobileTOC();

        
        if (!isBack) {
            mdHistory.push({ repo: repo, path: filePath });
        }

        const currentUrl = new URL(window.location);
        currentUrl.searchParams.set('repo', repo);
        window.history.replaceState(null, '', currentUrl);

        showContent();
    } catch (error) {
        console.error("Failed to load Markdown file:", error);
        showError(`Unable to load "${filePath}" from ${repo}. Make sure the file exists and the repository is public.`);
    }
}

function setupMDLinks() {
    const links = markdownContent.querySelectorAll('a');
    links.forEach(link => {
        // Remove any previous listener by cloning? We'll use a flag to avoid duplicate listeners.
        if (link.dataset.mdHandler) return;
        const href = link.getAttribute('href');
        if (!href) return;

        // Check if it's a Markdown link
        const info = extractRepoAndPathFromLink(href, getRepositoryFromURL());
        if (!info) return;

        // Check owner permission
        if (!isOwnerAllowed(info.repo)) {
            // Optionally, we can still let it open in new tab but with a warning?
            // We'll block it and show error.
            link.style.cursor = 'not-allowed';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showError(`Access denied. Owner "${info.repo.split('/')[0]}" is not allowed.`);
            });
            link.dataset.mdHandler = 'blocked';
            return;
        }

        // Allow internal MD loading
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadAndRenderMarkdownFile(info.repo, info.path);
        });
        link.dataset.mdHandler = 'internal';
        // Optionally style internal links differently
        link.style.textDecoration = 'underline wavy #6fb7ff';
    });
}

// ---------------------------------------------------------
// Main
// ---------------------------------------------------------

async function initializeProjectPage() {
    showLoading();
    const repo = getRepositoryFromURL();

    if (!isValidRepository(repo)) {
        showError("No valid GitHub repository was specified.");
        projectTitle.textContent = "Project not found";
        projectDescription.textContent = "Please provide a valid repository in the URL.";
        return;
    }

    if (!isOwnerAllowed(repo)) {
        showError("Access denied. Owner is not allowed.");
        projectTitle.textContent = "Access Denied";
        projectDescription.textContent = "This repository owner is not in the allowed list.";
        return;
    }

    try {
        const markdown = await fetchReadme(repo);
        
        await updateProjectHeader(repo, markdown); 
        updateBrowserTitle(repo, 'README.md');

        await renderMarkdown(markdown);
        fixImageURLs(repo);
        fixLinkURLs(repo);
        generateTableOfContents();
        enableTOCScrolling();
        setupMDLinks(); 
        enableMobileTOC();

        showContent();

        // save main page to memory
        if (mdHistory.length === 0) {
            mdHistory.push({ repo: repo, path: 'README.md' });
        }
    } catch (error) {
        console.error("Project page error:", error);
        showError("Unable to load this project's README. Please make sure the repository exists, the README.md file is available, and the repository is public.");
    }
}

// ---------------------------------------------------------
// Start
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", initializeProjectPage);

/* =========================================================
   Mobile Menu Functionality
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    // Ensure elements exist before adding listeners
    if (menuBtn && sidebar && overlay) {
        const toggleMobileMenu = () => {
            // Toggle classes for sidebar and overlay
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
            
            // Toggle button icon (Hamburger / Close)
            menuBtn.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
        };

        // Attach click events
        menuBtn.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', toggleMobileMenu);
    }
});


// =========================================================
// smart scroll and back button
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. منطق دکمه Back
    const backButton = document.getElementById("back-button");
    if (backButton) {
        backButton.addEventListener("click", (e) => {
            e.preventDefault(); 
            if (mdHistory.length > 1) {
                mdHistory.pop(); 
                const prev = mdHistory[mdHistory.length - 1]; 
                loadAndRenderMarkdownFile(prev.repo, prev.path, true); 
            } else {
                window.location.href = "index.html"; 
            }
        });
    }

    window.addEventListener('scroll', () => {
        const headings = document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3');
        const tocLinks = document.querySelectorAll('#project-toc a');
        if(headings.length === 0 || tocLinks.length === 0) return;

        let currentId = '';
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            
            if (rect.top <= 150) {
                currentId = heading.id;
            }
        });

        // defult content
        if(!currentId && headings.length > 0) currentId = headings[0].id;

        tocLinks.forEach(link => {
            link.classList.remove('toc-active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('toc-active');
                
                // send active content to sidebar
                const toc = document.getElementById('project-toc');
                const linkTop = link.offsetTop;
                toc.scrollTop = linkTop - (toc.clientHeight / 2) + (link.clientHeight / 2);
            }
        });
    });
});
