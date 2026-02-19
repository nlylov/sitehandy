/* ============================================
   Component Loader — Header & Footer
   Fetches /components/header.html and footer.html,
   injects them, then fires 'components-loaded'.
   ============================================ */
(function () {
    'use strict';

    async function loadComponents() {
        try {
            const [headerRes, footerRes] = await Promise.all([
                fetch('/components/header.html'),
                fetch('/components/footer.html')
            ]);

            const headerEl = document.getElementById('site-header');
            const footerEl = document.getElementById('site-footer');

            if (headerEl && headerRes.ok) {
                headerEl.innerHTML = await headerRes.text();
                headerEl.classList.add('loaded');
            }

            if (footerEl && footerRes.ok) {
                footerEl.innerHTML = await footerRes.text();
                footerEl.classList.add('loaded');
            }

            // Signal to main.js that DOM components are ready
            document.dispatchEvent(new Event('components-loaded'));

            // Auto-discover and load spoke-page modules
            document.querySelectorAll('[data-module]').forEach(el => {
                const name = el.dataset.module;
                import(`/components/modules/${name}.js`)
                    .then(m => { if (m.default) m.default(el); })
                    .catch(err => console.warn(`[loader] Module "${name}" not found:`, err));
            });

            // Load chatbot on all pages
            const chatScript = document.createElement('script');
            chatScript.src = '/chat.js';
            chatScript.defer = true;
            document.body.appendChild(chatScript);
        } catch (err) {
            console.error('[loader] Failed to load components:', err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
})();
