/* ============================================
   Module: Photo Drop Zone
   Usage: <div data-module="photo-drop"></div>

   After the user selects a photo, we show the
   preview and then redirect to the contact form
   with a prompt to mention the photo. There is
   no server-side upload endpoint yet — the user
   sends the photo through the chatbot or email.
   ============================================ */

export default function photoDrop(container) {
    container.innerHTML = `
        <div class="mod-photo">
            <div class="mod-photo__inner">
                <span class="section-tag">Quick Estimate</span>
                <h2 class="section-title">Send a Photo, <span class="text-accent">Get a Quote</span></h2>
                <p class="mod-photo__subtitle">Snap a photo of your furniture boxes or the item you need assembled. We'll reply with a flat-rate quote within 30 minutes.</p>

                <div class="mod-photo__zone" id="photo-drop-zone" tabindex="0" role="button" aria-label="Upload a photo">
                    <div class="mod-photo__zone-content">
                        <svg class="mod-photo__icon" width="48" height="48" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                        </svg>
                        <p class="mod-photo__label">Drag & drop a photo here</p>
                        <p class="mod-photo__sublabel">or <span class="mod-photo__browse">browse files</span></p>
                        <p class="mod-photo__formats">JPG, PNG, HEIC — up to 10 MB</p>
                    </div>
                    <input type="file" id="photo-file-input" accept="image/*" class="mod-photo__input" aria-hidden="true">
                </div>

                <div class="mod-photo__preview" style="display:none">
                    <div class="mod-photo__thumb-wrap">
                        <img class="mod-photo__thumb" src="" alt="Uploaded photo preview">
                        <button class="mod-photo__remove" aria-label="Remove photo">&times;</button>
                    </div>
                    <div class="mod-photo__info">
                        <span class="mod-photo__filename"></span>
                        <span class="mod-photo__filesize"></span>
                    </div>
                </div>

                <div class="mod-photo__next-steps" style="display:none">
                    <svg class="mod-photo__check" width="40" height="40" viewBox="0 0 24 24" fill="none"
                        stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3 class="mod-photo__next-title">Photo ready!</h3>
                    <p class="mod-photo__next-text">Send it to us via one of the options below and we'll reply with your flat-rate quote within <strong>30 minutes</strong>.</p>
                    <div class="mod-photo__next-actions">
                        <button class="btn btn--accent btn--lg mod-photo__open-chat" type="button">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                            </svg>
                            Send via Chat
                        </button>
                        <a href="mailto:info@asap.repair?subject=IKEA Assembly Quote Request – Photo Attached&body=Hi, I'd like a quote for IKEA furniture assembly. Please see the attached photo of my boxes/items."
                           class="btn btn--outline btn--lg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            Email Photo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    const zone = container.querySelector('#photo-drop-zone');
    const input = container.querySelector('#photo-file-input');
    const preview = container.querySelector('.mod-photo__preview');
    const thumb = container.querySelector('.mod-photo__thumb');
    const filename = container.querySelector('.mod-photo__filename');
    const filesize = container.querySelector('.mod-photo__filesize');
    const removeBtn = container.querySelector('.mod-photo__remove');
    const nextSteps = container.querySelector('.mod-photo__next-steps');
    const openChatBtn = container.querySelector('.mod-photo__open-chat');
    let currentFile = null;

    // Click zone → open file picker
    zone.addEventListener('click', (e) => {
        if (e.target === removeBtn) return;
        input.click();
    });

    zone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            input.click();
        }
    });

    // Drag events
    ['dragenter', 'dragover'].forEach(evt => {
        zone.addEventListener(evt, (e) => {
            e.preventDefault();
            zone.classList.add('mod-photo__zone--dragover');
        });
    });

    ['dragleave', 'drop'].forEach(evt => {
        zone.addEventListener(evt, (e) => {
            e.preventDefault();
            zone.classList.remove('mod-photo__zone--dragover');
        });
    });

    zone.addEventListener('drop', (e) => {
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleFile(file);
    });

    input.addEventListener('change', () => {
        if (input.files[0]) handleFile(input.files[0]);
    });

    function handleFile(file) {
        if (file.size > 10 * 1024 * 1024) {
            alert('File too large. Please upload an image under 10 MB.');
            return;
        }

        currentFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            thumb.src = e.target.result;
            filename.textContent = file.name;
            filesize.textContent = formatSize(file.size);
            zone.style.display = 'none';
            preview.style.display = '';
            nextSteps.style.display = '';
            nextSteps.classList.add('mod-photo__next-steps--visible');
        };
        reader.readAsDataURL(file);
    }

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentFile = null;
        input.value = '';
        preview.style.display = 'none';
        nextSteps.style.display = 'none';
        nextSteps.classList.remove('mod-photo__next-steps--visible');
        zone.style.display = '';
    });

    // "Send via Chat" — opens the chatbot widget with prefilled message
    openChatBtn.addEventListener('click', () => {
        const chatButton = document.querySelector('#repair-asap-chat-button');
        if (chatButton) {
            chatButton.click();
            // After a short delay, try to prefill the input
            setTimeout(() => {
                const chatInput = document.querySelector('#repair-asap-input');
                if (chatInput) {
                    chatInput.value = 'Hi, I have an IKEA assembly project. I have a photo of the boxes — can you give me a quote?';
                    chatInput.focus();
                }
            }, 500);
        }
    });

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
}
