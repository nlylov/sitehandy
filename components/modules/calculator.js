/* ============================================
   Module: Instant Quote Calculator
   Usage: <div data-module="calculator" data-config="ikea"></div>
   ============================================ */

const CONFIGS = {
    ikea: {
        title: 'Get an Instant Estimate',
        subtitle: 'Select your IKEA furniture for an estimated price range.',
        categories: [
            {
                label: 'IKEA Series',
                id: 'series',
                options: [
                    { value: '', label: 'Choose a series…' },
                    { value: 'kallax', label: 'KALLAX (Shelving)' },
                    { value: 'pax', label: 'PAX (Wardrobe)' },
                    { value: 'malm', label: 'MALM (Dresser / Bed)' },
                    { value: 'hemnes', label: 'HEMNES (Dresser / Bed)' },
                    { value: 'besta', label: 'BESTÅ (TV / Storage)' },
                    { value: 'billy', label: 'BILLY (Bookcase)' },
                    { value: 'nordli', label: 'NORDLI (Dresser / Bed)' },
                    { value: 'other', label: 'Other IKEA Item' }
                ]
            },
            {
                label: 'Size / Complexity',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    kallax: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: '1×4 or 2×2 (small)' },
                        { value: 'md', label: '2×4 or 4×2 (medium)' },
                        { value: 'lg', label: '4×4 or 5×5 (large)' }
                    ],
                    pax: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Single frame (1 unit)' },
                        { value: 'md', label: 'Double frame (2 units)' },
                        { value: 'lg', label: 'Triple+ (3+ units)' }
                    ],
                    malm: [
                        { value: '', label: 'Choose item…' },
                        { value: 'sm', label: '2–3 drawer dresser' },
                        { value: 'md', label: '6 drawer dresser' },
                        { value: 'lg', label: 'Bed frame (Queen/King)' }
                    ],
                    hemnes: [
                        { value: '', label: 'Choose item…' },
                        { value: 'sm', label: '3 drawer chest' },
                        { value: 'md', label: '8 drawer dresser' },
                        { value: 'lg', label: 'Bed frame + nightstands' }
                    ],
                    besta: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Single TV unit' },
                        { value: 'md', label: 'TV unit + wall cabinets' },
                        { value: 'lg', label: 'Full wall system' }
                    ],
                    billy: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Single bookcase' },
                        { value: 'md', label: '2–3 bookcases' },
                        { value: 'lg', label: '4+ bookcases / wall-to-wall' }
                    ],
                    nordli: [
                        { value: '', label: 'Choose item…' },
                        { value: 'sm', label: 'Chest of drawers (small)' },
                        { value: 'md', label: 'Chest of drawers (large)' },
                        { value: 'lg', label: 'Bed frame + storage' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Simple (desk, nightstand)' },
                        { value: 'md', label: 'Medium (bookshelf, cabinet)' },
                        { value: 'lg', label: 'Complex (multi-part system)' }
                    ]
                }
            }
        ],
        pricing: {
            kallax: { sm: [80, 120], md: [120, 180], lg: [180, 260] },
            pax: { sm: [150, 220], md: [250, 380], lg: [380, 550] },
            malm: { sm: [80, 120], md: [100, 160], lg: [150, 230] },
            hemnes: { sm: [90, 140], md: [140, 200], lg: [220, 340] },
            besta: { sm: [120, 180], md: [200, 320], lg: [320, 480] },
            billy: { sm: [60, 100], md: [140, 200], lg: [220, 320] },
            nordli: { sm: [80, 130], md: [120, 180], lg: [180, 280] },
            other: { sm: [60, 120], md: [120, 200], lg: [200, 350] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Final price confirmed after review.'
    },
    beds: {
        title: 'Bed Assembly Estimate',
        subtitle: 'Select your bed type for an estimated price range.',
        categories: [
            {
                label: 'Bed Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose bed type…' },
                    { value: 'platform', label: 'Platform Bed' },
                    { value: 'storage', label: 'Storage Bed (Drawers / Hydraulic)' },
                    { value: 'bunk', label: 'Bunk Bed' },
                    { value: 'loft', label: 'Loft Bed' },
                    { value: 'adjustable', label: 'Adjustable Base' },
                    { value: 'daybed', label: 'Daybed / Trundle' },
                    { value: 'other', label: 'Other Bed Frame' }
                ]
            },
            {
                label: 'Size',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    platform: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Full' },
                        { value: 'md', label: 'Queen' },
                        { value: 'lg', label: 'King / Cal King' }
                    ],
                    storage: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Full' },
                        { value: 'md', label: 'Queen' },
                        { value: 'lg', label: 'King / Cal King' }
                    ],
                    bunk: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Standard bunk' },
                        { value: 'md', label: 'Bunk with trundle' },
                        { value: 'lg', label: 'Triple bunk / L-shaped' }
                    ],
                    loft: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Basic loft frame' },
                        { value: 'md', label: 'Loft with desk' },
                        { value: 'lg', label: 'Loft with desk + shelves' }
                    ],
                    adjustable: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin XL / Full' },
                        { value: 'md', label: 'Queen' },
                        { value: 'lg', label: 'Split King (2 bases)' }
                    ],
                    daybed: [
                        { value: '', label: 'Choose type…' },
                        { value: 'sm', label: 'Daybed only' },
                        { value: 'md', label: 'Daybed + trundle' },
                        { value: 'lg', label: 'Daybed + trundle + storage' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Simple frame' },
                        { value: 'md', label: 'Frame + headboard' },
                        { value: 'lg', label: 'Complex / multi-part' }
                    ]
                }
            }
        ],
        pricing: {
            platform: { sm: [80, 120], md: [100, 150], lg: [120, 180] },
            storage: { sm: [120, 180], md: [150, 250], lg: [200, 350] },
            bunk: { sm: [150, 220], md: [200, 300], lg: [280, 420] },
            loft: { sm: [140, 200], md: [180, 280], lg: [250, 380] },
            adjustable: { sm: [80, 130], md: [100, 160], lg: [180, 280] },
            daybed: { sm: [80, 130], md: [120, 180], lg: [160, 250] },
            other: { sm: [60, 120], md: [100, 180], lg: [160, 300] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Final price confirmed after review.'
    },
    wardrobes: {
        title: 'Wardrobe Assembly Estimate',
        subtitle: 'Select your wardrobe type for an estimated price range.',
        categories: [
            {
                label: 'Wardrobe Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose type…' },
                    { value: 'freestanding', label: 'Freestanding Wardrobe' },
                    { value: 'armoire', label: 'Armoire' },
                    { value: 'closet-system', label: 'Closet System (Multi-Unit)' },
                    { value: 'sliding-door', label: 'Sliding Door Wardrobe' },
                    { value: 'walk-in', label: 'Walk-In Closet Kit' },
                    { value: 'other', label: 'Other Wardrobe' }
                ]
            },
            {
                label: 'Size / Complexity',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    freestanding: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Single door / 2 doors' },
                        { value: 'md', label: '3 doors with drawers' },
                        { value: 'lg', label: '4+ doors / mirrored' }
                    ],
                    armoire: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Small / 2-door' },
                        { value: 'md', label: 'Standard with shelves' },
                        { value: 'lg', label: 'Large / multi-section' }
                    ],
                    'closet-system': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: '1–2 units' },
                        { value: 'md', label: '3–4 units' },
                        { value: 'lg', label: '5+ units / wall-to-wall' }
                    ],
                    'sliding-door': [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: '2-door (up to 150cm)' },
                        { value: 'md', label: '3-door (up to 250cm)' },
                        { value: 'lg', label: '4-door (250cm+)' }
                    ],
                    'walk-in': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Basic rods + shelves' },
                        { value: 'md', label: 'Full kit with drawers' },
                        { value: 'lg', label: 'Custom multi-section' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Simple' },
                        { value: 'md', label: 'Medium' },
                        { value: 'lg', label: 'Complex' }
                    ]
                }
            }
        ],
        pricing: {
            freestanding: { sm: [100, 160], md: [160, 240], lg: [240, 380] },
            armoire: { sm: [120, 180], md: [180, 280], lg: [280, 420] },
            'closet-system': { sm: [150, 250], md: [280, 420], lg: [420, 650] },
            'sliding-door': { sm: [160, 240], md: [250, 380], lg: [380, 550] },
            'walk-in': { sm: [200, 300], md: [300, 480], lg: [480, 750] },
            other: { sm: [80, 160], md: [160, 280], lg: [280, 450] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Final price confirmed after review.'
    },
    'wall-mounted': {
        title: 'Wall-Mounted Furniture Estimate',
        subtitle: 'Select your item type for an estimated price range.',
        categories: [
            {
                label: 'Item Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose item…' },
                    { value: 'floating-vanity', label: 'Floating Vanity' },
                    { value: 'wall-cabinet', label: 'Wall Cabinet' },
                    { value: 'floating-desk', label: 'Floating Desk' },
                    { value: 'wall-unit', label: 'Wall Entertainment Unit' },
                    { value: 'floating-shelf', label: 'Floating Shelves' },
                    { value: 'other', label: 'Other Wall-Mounted Item' }
                ]
            },
            {
                label: 'Scope',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    'floating-vanity': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Single vanity' },
                        { value: 'md', label: 'Vanity + mirror cabinet' },
                        { value: 'lg', label: 'Double vanity setup' }
                    ],
                    'wall-cabinet': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: '1 cabinet' },
                        { value: 'md', label: '2–3 cabinets' },
                        { value: 'lg', label: '4+ cabinets' }
                    ],
                    'floating-desk': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Small desk' },
                        { value: 'md', label: 'Desk + shelf above' },
                        { value: 'lg', label: 'Large desk / L-shaped' }
                    ],
                    'wall-unit': [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Single unit' },
                        { value: 'md', label: 'Unit + shelves' },
                        { value: 'lg', label: 'Full wall system' }
                    ],
                    'floating-shelf': [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1–2 shelves' },
                        { value: 'md', label: '3–5 shelves' },
                        { value: 'lg', label: '6+ shelves' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Simple / light item' },
                        { value: 'md', label: 'Medium / needs studs' },
                        { value: 'lg', label: 'Heavy / multi-point anchor' }
                    ]
                }
            }
        ],
        pricing: {
            'floating-vanity': { sm: [120, 180], md: [180, 280], lg: [280, 420] },
            'wall-cabinet': { sm: [80, 130], md: [160, 260], lg: [280, 420] },
            'floating-desk': { sm: [100, 160], md: [160, 250], lg: [250, 380] },
            'wall-unit': { sm: [120, 200], md: [220, 360], lg: [360, 550] },
            'floating-shelf': { sm: [60, 100], md: [120, 200], lg: [200, 320] },
            other: { sm: [60, 120], md: [120, 220], lg: [220, 380] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Final price confirmed after review.'
    }
};

export default function calculator(container) {
    const configKey = container.dataset.config || 'ikea';
    const cfg = CONFIGS[configKey];
    if (!cfg) return;

    // State
    let selected = {};

    // Build HTML
    container.innerHTML = `
        <div class="mod-calc">
            <div class="mod-calc__header">
                <span class="section-tag">Instant Estimate</span>
                <h2 class="section-title">${cfg.title}</h2>
                <p class="mod-calc__subtitle">${cfg.subtitle}</p>
            </div>
            <div class="mod-calc__body">
                <div class="mod-calc__selectors">
                    ${cfg.categories.map(cat => `
                        <div class="mod-calc__field" data-field="${cat.id}">
                            <label class="mod-calc__label" for="calc-${cat.id}">${cat.label}</label>
                            <div class="mod-calc__select-wrap">
                                <select class="mod-calc__select" id="calc-${cat.id}" data-cat="${cat.id}"
                                    ${cat.dependsOn ? 'disabled' : ''}>
                                    ${cat.options ? cat.options.map(o =>
        `<option value="${o.value}">${o.label}</option>`
    ).join('') : '<option value="">Choose…</option>'}
                                </select>
                                <svg class="mod-calc__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"/>
                                </svg>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mod-calc__result" aria-live="polite">
                    <div class="mod-calc__result-placeholder">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="1" x2="12" y2="23"/>
                            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                        </svg>
                        <span>Select furniture to see estimate</span>
                    </div>
                    <div class="mod-calc__result-price" style="display:none">
                        <div class="mod-calc__price-label">Estimated Price</div>
                        <div class="mod-calc__price-range">
                            <span class="mod-calc__price-lo">$0</span>
                            <span class="mod-calc__price-sep">–</span>
                            <span class="mod-calc__price-hi">$0</span>
                        </div>
                        <a href="${cfg.cta.href}" class="btn btn--accent btn--lg mod-calc__cta">${cfg.cta.text}</a>
                        <p class="mod-calc__disclaimer">${cfg.disclaimer}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // References
    const selects = container.querySelectorAll('.mod-calc__select');
    const placeholder = container.querySelector('.mod-calc__result-placeholder');
    const priceBox = container.querySelector('.mod-calc__result-price');
    const priceLo = container.querySelector('.mod-calc__price-lo');
    const priceHi = container.querySelector('.mod-calc__price-hi');
    const sizeSelect = container.querySelector('[data-cat="size"]');
    const sizeField = container.querySelector('[data-field="size"]');

    // Event: series change → populate size options
    selects.forEach(sel => {
        sel.addEventListener('change', () => {
            const cat = sel.dataset.cat;
            selected[cat] = sel.value;

            if (cat === 'series' && sizeSelect) {
                const optSet = cfg.categories[1].optionSets[sel.value];
                if (optSet) {
                    sizeSelect.innerHTML = optSet.map(o =>
                        `<option value="${o.value}">${o.label}</option>`
                    ).join('');
                    sizeSelect.disabled = false;
                    sizeSelect.value = '';
                    selected.size = '';
                    if (sizeField) sizeField.classList.add('mod-calc__field--active');
                } else {
                    sizeSelect.innerHTML = '<option value="">Choose…</option>';
                    sizeSelect.disabled = true;
                    selected.size = '';
                    if (sizeField) sizeField.classList.remove('mod-calc__field--active');
                }
            }

            updatePrice();
        });
    });

    function updatePrice() {
        const series = selected.series;
        const size = selected.size;

        if (!series || !size || !cfg.pricing[series] || !cfg.pricing[series][size]) {
            placeholder.style.display = '';
            priceBox.style.display = 'none';
            return;
        }

        const [lo, hi] = cfg.pricing[series][size];

        // Animate numbers
        animateNumber(priceLo, lo);
        animateNumber(priceHi, hi);

        placeholder.style.display = 'none';
        priceBox.style.display = '';
        priceBox.classList.remove('mod-calc__result-price--visible');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                priceBox.classList.add('mod-calc__result-price--visible');
            });
        });
    }

    function animateNumber(el, target) {
        const duration = 600;
        const start = parseInt(el.textContent.replace(/\D/g, '')) || 0;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            el.textContent = `$${current}`;
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }
}
