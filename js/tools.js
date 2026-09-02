/**
 * tools.js – Tab switching & PDF tool loader
 * Uses existing CSS classes for consistent styling
 */

(function() {
    'use strict';

    // =========================================================
    // 1. Tab switching
    // =========================================================
    const tabs = document.querySelectorAll('.tools-tab');
    const panels = {
        pdf: document.getElementById('panel-pdf'),
        image: document.getElementById('panel-image')
    };

    function switchTab(tabId) {
        tabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        Object.keys(panels).forEach(key => {
            panels[key].classList.toggle('active', key === tabId);
        });
        if (tabId === 'pdf') loadPdfTools();
    }

    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            switchTab(this.dataset.tab);
        });
    });

    // =========================================================
    // 2. PDF Tools – lazy load
    // =========================================================
    let pdfToolsLoaded = false;
    const container = document.getElementById('pdf-tool-container');

    async function loadPdfTools() {
        if (pdfToolsLoaded) return;

        container.innerHTML = `<p style="color:#9da6b3; text-align:center; padding:30px 0;">⏳ Loading PDF tools...</p>`;

        try {
            // Try relative path first (if 991-pdftools is a sibling folder)
            let module;
            try {
                module = await import('../991-pdftools/src/index.js');
            } catch (_) {
                // Fallback to CDN (if published)
                module = await import('https://cdn.jsdelivr.net/gh/rezashams991/991-pdftools@main/src/index.js');
            }

            const toolNames = [
                'merge', 'split', 'extractPages', 'pdfToImage',
                'imageToPdf', 'watermark', 'pageNumber',
                'encrypt', 'decrypt', 'compress'
            ];

            // Render tool buttons (centered, with existing style)
            container.innerHTML = `
                <div class="tool-select-grid">
                    ${toolNames.map(name => `
                        <button class="tool-select-btn" data-tool="${name}">
                            ${name.charAt(0).toUpperCase() + name.slice(1)}
                        </button>
                    `).join('')}
                </div>
                <div id="pdf-tool-render-area" style="min-height:150px;">
                    <p style="color:#9da6b3; text-align:center; padding:20px 0;">Click a tool above to load it.</p>
                </div>
            `;

            // Attach click events
            container.querySelectorAll('.tool-select-btn').forEach(btn => {
                btn.addEventListener('click', async function() {
                    const toolName = this.dataset.tool;
                    const renderArea = document.getElementById('pdf-tool-render-area');
                    renderArea.innerHTML = `<p style="color:#9da6b3; text-align:center; padding:20px 0;">⏳ Loading ${toolName}...</p>`;

                    try {
                        const toolFn = module[toolName];
                        if (typeof toolFn !== 'function') {
                            throw new Error(`Tool "${toolName}" not found.`);
                        }
                        renderArea.innerHTML = ''; // clear
                        await toolFn(renderArea);
                    } catch (err) {
                        renderArea.innerHTML = `
                            <div style="color:#ff6b6b; padding:20px; border:1px solid #ff6b6b33; border-radius:12px; background:#ff6b6b11;">
                                <strong>❌ Error:</strong> ${err.message}
                            </div>
                        `;
                        console.error('Tool error:', err);
                    }
                });
            });

            pdfToolsLoaded = true;

        } catch (error) {
            container.innerHTML = `
                <div style="color:#ff6b6b; padding:30px; border:1px solid #ff6b6b33; border-radius:16px; background:#ff6b6b11; text-align:center;">
                    <strong>❌ Failed to load PDF tools.</strong><br>
                    <span style="color:#b8c0cc;">${error.message}</span>
                    <br><br>
                    <span style="font-size:0.9rem; color:#9da6b3;">
                        Check that <code>991-pdftools</code> is available at<br>
                        <code>../991-pdftools/src/index.js</code> or via CDN.
                    </span>
                </div>
            `;
            console.error('PDF tools load error:', error);
        }
    }

    // =========================================================
    // 3. Auto-load if PDF panel is active on page load
    // =========================================================
    if (document.getElementById('panel-pdf').classList.contains('active')) {
        loadPdfTools();
    }

})();