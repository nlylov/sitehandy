/* ============================================
   Module: Photo Drop Zone → GHL Upload Form
   Usage: <div data-module="photo-drop"></div>

   Embeds the GoHighLevel upload form via iframe.
   The form submits directly to the CRM (prosbuddy).
   Layout: two-column — selling points (left) + form (right).
   ============================================ */

export default function photoDrop(container) {
    container.innerHTML = `
        <div class="mod-photo">
            <div class="mod-photo__header">
                <span class="section-tag">Quick Estimate</span>
                <h2 class="section-title">Send a Photo, <span class="text-accent">Get a Quote</span></h2>
                <p class="mod-photo__subtitle">Upload a photo of your furniture boxes or the item — we'll reply with a flat-rate quote within 30 minutes.</p>
            </div>
            <div class="mod-photo__layout">
                <div class="mod-photo__selling">
                    <h3 class="mod-photo__sell-title">Get an Exact Quote:</h3>
                    <ul class="mod-photo__steps">
                        <li class="mod-photo__step">
                            <span class="mod-photo__step-icon">✅</span>
                            <span>Upload photo of box/link</span>
                        </li>
                        <li class="mod-photo__step">
                            <span class="mod-photo__step-icon">✅</span>
                            <span>We identify the model</span>
                        </li>
                        <li class="mod-photo__step">
                            <span class="mod-photo__step-icon">✅</span>
                            <span>We text you a flat-rate quote</span>
                        </li>
                    </ul>

                    <h4 class="mod-photo__trust-title">WHY NYC LOCALS LOVE US</h4>
                    <ul class="mod-photo__trust-list">
                        <li>🧤 We protect floors & walls</li>
                        <li>📦 We handle packaging neatly</li>
                        <li>🏢 Experienced in apartments</li>
                    </ul>

                    <div class="mod-photo__fast-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span><strong>Fast response</strong> — often within 15–30 minutes during business hours</span>
                    </div>

                    <div class="mod-photo__alt-contact">
                        <p>Need a quicker way?</p>
                        <div class="mod-photo__alt-links">
                            <a href="sms:+17753107770?body=Hi, I'd like a quote for furniture assembly. Here's a photo of my items:" class="mod-photo__alt-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                                </svg>
                                Text Us Photos
                            </a>
                            <a href="tel:+17753107770" class="mod-photo__alt-link">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                Call for Quote
                            </a>
                        </div>
                    </div>
                </div>
                <div class="mod-photo__form-wrap">
                    <iframe
                        src="https://api.prosbuddy.com/widget/form/65sBXd38rcq1TBr04Unm"
                        style="width:100%;height:100%;border:none;border-radius:12px"
                        id="inline-65sBXd38rcq1TBr04Unm"
                        data-layout="{'id':'INLINE'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Upload Form"
                        data-height="607"
                        data-layout-iframe-id="inline-65sBXd38rcq1TBr04Unm"
                        data-form-id="65sBXd38rcq1TBr04Unm"
                        title="Upload Form"
                    ></iframe>
                </div>
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
