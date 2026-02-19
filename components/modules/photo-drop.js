/* ============================================
   Module: Photo Drop Zone → GHL Upload Form
   Usage: <div data-module="photo-drop"></div>

   Embeds the GoHighLevel upload form via iframe.
   The form submits directly to the CRM (prosbuddy).
   Centered single-column layout — "Upload Form - Navy" dark theme.
   ============================================ */

export default function photoDrop(container) {
    container.innerHTML = `
        <div class="mod-photo">
            <span class="section-tag">Quick Estimate</span>
            <h2 class="section-title">Send a Photo, <span class="text-accent">Get a Quote</span></h2>
            <p class="mod-photo__subtitle">Upload a photo of your furniture boxes or the item, leave your number — we'll text you a flat-rate quote within 30 minutes.</p>
            <div class="mod-photo__form-wrap">
                <iframe
                    src="https://api.prosbuddy.com/widget/form/nDWwAfdvUJavZMYAHbbH"
                    style="width:100%;height:100%;border:none;"
                    id="inline-nDWwAfdvUJavZMYAHbbH"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Upload Form - Navy"
                    data-height="607"
                    data-layout-iframe-id="inline-nDWwAfdvUJavZMYAHbbH"
                    data-form-id="nDWwAfdvUJavZMYAHbbH"
                    title="Upload Form"
                ></iframe>
            </div>
        </div>
    `;

    // Load GHL form embed script (only once)
    if (!document.querySelector('script[src*="prosbuddy.com/js/form_embed"]')) {
        const script = document.createElement('script');
        script.src = 'https://api.prosbuddy.com/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);
    }
}
