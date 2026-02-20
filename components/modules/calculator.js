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
    },
    tv: {
        title: 'TV Mounting Estimate',
        subtitle: 'Select your TV size and wall type for an estimated price range.',
        categories: [
            {
                label: 'TV Size',
                id: 'series',
                options: [
                    { value: '', label: 'Choose TV size…' },
                    { value: 'small', label: '32″ – 43″' },
                    { value: 'medium', label: '50″ – 55″' },
                    { value: 'large', label: '60″ – 75″' },
                    { value: 'xlarge', label: '77″ – 85″+' }
                ]
            },
            {
                label: 'Wall Type & Mount',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    small: [
                        { value: '', label: 'Choose setup…' },
                        { value: 'sm', label: 'Drywall — Fixed / Tilt Mount' },
                        { value: 'md', label: 'Drywall — Full-Motion Mount' },
                        { value: 'lg', label: 'Brick / Concrete — Any Mount' }
                    ],
                    medium: [
                        { value: '', label: 'Choose setup…' },
                        { value: 'sm', label: 'Drywall — Fixed / Tilt Mount' },
                        { value: 'md', label: 'Drywall — Full-Motion Mount' },
                        { value: 'lg', label: 'Brick / Concrete — Any Mount' }
                    ],
                    large: [
                        { value: '', label: 'Choose setup…' },
                        { value: 'sm', label: 'Drywall — Fixed / Tilt Mount' },
                        { value: 'md', label: 'Drywall — Full-Motion Mount' },
                        { value: 'lg', label: 'Brick / Concrete — Any Mount' }
                    ],
                    xlarge: [
                        { value: '', label: 'Choose setup…' },
                        { value: 'sm', label: 'Drywall — Fixed / Tilt Mount' },
                        { value: 'md', label: 'Drywall — Full-Motion Mount' },
                        { value: 'lg', label: 'Brick / Concrete — Any Mount' }
                    ]
                }
            }
        ],
        pricing: {
            small: { sm: [120, 180], md: [160, 220], lg: [200, 280] },
            medium: { sm: [150, 220], md: [200, 280], lg: [250, 340] },
            large: { sm: [200, 280], md: [250, 350], lg: [300, 420] },
            xlarge: { sm: [280, 380], md: [340, 450], lg: [400, 550] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates include mount, cable concealment, and labor. Mount hardware not included unless specified.'
    },
    shelf: {
        title: 'Shelf Mounting Estimate',
        subtitle: 'Select your shelf type and quantity for an estimated price range.',
        categories: [
            {
                label: 'Shelf Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose shelf type…' },
                    { value: 'floating', label: 'Floating Shelf' },
                    { value: 'bracket', label: 'Bracket Shelf' },
                    { value: 'ledge', label: 'Picture Ledge / Decorative' },
                    { value: 'heavy', label: 'Heavy-Duty / Garage Shelf' },
                    { value: 'corner', label: 'Corner Shelf' },
                    { value: 'other', label: 'Other Shelf Type' }
                ]
            },
            {
                label: 'How Many?',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    floating: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 shelf' },
                        { value: 'md', label: '2–3 shelves' },
                        { value: 'lg', label: '4+ shelves' }
                    ],
                    bracket: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 shelf' },
                        { value: 'md', label: '2–3 shelves' },
                        { value: 'lg', label: '4+ shelves' }
                    ],
                    ledge: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 ledge' },
                        { value: 'md', label: '2–3 ledges' },
                        { value: 'lg', label: '4+ ledges' }
                    ],
                    heavy: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 shelf' },
                        { value: 'md', label: '2–3 shelves' },
                        { value: 'lg', label: '4+ shelves / full wall' }
                    ],
                    corner: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 corner shelf' },
                        { value: 'md', label: '2–3 corner shelves' },
                        { value: 'lg', label: '4+ corner shelves' }
                    ],
                    other: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 shelf' },
                        { value: 'md', label: '2–3 shelves' },
                        { value: 'lg', label: '4+ shelves' }
                    ]
                }
            }
        ],
        pricing: {
            floating: { sm: [60, 100], md: [120, 200], lg: [200, 320] },
            bracket: { sm: [50, 80], md: [100, 160], lg: [160, 260] },
            ledge: { sm: [50, 80], md: [90, 150], lg: [150, 240] },
            heavy: { sm: [80, 130], md: [160, 260], lg: [260, 400] },
            corner: { sm: [60, 100], md: [120, 190], lg: [190, 300] },
            other: { sm: [50, 100], md: [100, 180], lg: [180, 300] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard installation. Final price confirmed after reviewing your wall and shelves.'
    },
    'curtain-rod': {
        title: 'Curtain Rod Estimate',
        subtitle: 'Select your rod type and number of windows for an estimated price range.',
        categories: [
            {
                label: 'Rod Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose rod type…' },
                    { value: 'single', label: 'Single Rod' },
                    { value: 'double', label: 'Double Rod' },
                    { value: 'ceiling', label: 'Ceiling Track' },
                    { value: 'bay', label: 'Bay Window Rod' },
                    { value: 'tension', label: 'Tension Rod' },
                    { value: 'other', label: 'Other Rod Type' }
                ]
            },
            {
                label: 'How Many Windows?',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    single: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 window' },
                        { value: 'md', label: '2–3 windows' },
                        { value: 'lg', label: '4+ windows' }
                    ],
                    double: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 window' },
                        { value: 'md', label: '2–3 windows' },
                        { value: 'lg', label: '4+ windows' }
                    ],
                    ceiling: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 window' },
                        { value: 'md', label: '2–3 windows' },
                        { value: 'lg', label: '4+ windows / room divider' }
                    ],
                    bay: [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: '3-sided bay' },
                        { value: 'md', label: '5-sided bay' },
                        { value: 'lg', label: 'Multiple bay windows' }
                    ],
                    tension: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 rod' },
                        { value: 'md', label: '2–3 rods' },
                        { value: 'lg', label: '4+ rods' }
                    ],
                    other: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 window' },
                        { value: 'md', label: '2–3 windows' },
                        { value: 'lg', label: '4+ windows' }
                    ]
                }
            }
        ],
        pricing: {
            single: { sm: [50, 80], md: [120, 200], lg: [200, 320] },
            double: { sm: [70, 110], md: [160, 260], lg: [260, 400] },
            ceiling: { sm: [80, 130], md: [180, 300], lg: [300, 460] },
            bay: { sm: [100, 160], md: [160, 250], lg: [280, 420] },
            tension: { sm: [30, 50], md: [70, 120], lg: [120, 200] },
            other: { sm: [50, 100], md: [120, 220], lg: [220, 360] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard installation. Final price confirmed after reviewing your windows and rods.'
    },
    mirror: {
        title: 'Mirror Mounting Estimate',
        subtitle: 'Select your mirror type and size for an estimated price range.',
        categories: [
            {
                label: 'Mirror Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose mirror type…' },
                    { value: 'vanity', label: 'Bathroom Vanity Mirror' },
                    { value: 'full-length', label: 'Full-Length Mirror' },
                    { value: 'decorative', label: 'Decorative / Accent Mirror' },
                    { value: 'oversized', label: 'Oversized / Heavy Mirror' },
                    { value: 'frameless', label: 'Frameless Mirror' },
                    { value: 'other', label: 'Other Mirror' }
                ]
            },
            {
                label: 'Size & Wall',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    vanity: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Small (up to 24″)' },
                        { value: 'md', label: 'Medium (24″–48″)' },
                        { value: 'lg', label: 'Large (48″+) or tile wall' }
                    ],
                    'full-length': [
                        { value: '', label: 'Choose mount…' },
                        { value: 'sm', label: 'Leaner (secured to wall)' },
                        { value: 'md', label: 'Wall-hung (drywall)' },
                        { value: 'lg', label: 'Wall-hung (brick / concrete)' }
                    ],
                    decorative: [
                        { value: '', label: 'Choose weight…' },
                        { value: 'sm', label: 'Light (under 15 lbs)' },
                        { value: 'md', label: 'Medium (15–40 lbs)' },
                        { value: 'lg', label: 'Heavy (40+ lbs)' }
                    ],
                    oversized: [
                        { value: '', label: 'Choose wall type…' },
                        { value: 'sm', label: 'Drywall (into studs)' },
                        { value: 'md', label: 'Plaster wall' },
                        { value: 'lg', label: 'Brick / concrete' }
                    ],
                    frameless: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Small (up to 24″)' },
                        { value: 'md', label: 'Medium (24″–48″)' },
                        { value: 'lg', label: 'Large (48″+)' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Simple / light' },
                        { value: 'md', label: 'Medium weight' },
                        { value: 'lg', label: 'Heavy / complex' }
                    ]
                }
            }
        ],
        pricing: {
            vanity: { sm: [60, 90], md: [90, 140], lg: [140, 220] },
            'full-length': { sm: [60, 100], md: [100, 160], lg: [160, 250] },
            decorative: { sm: [50, 80], md: [80, 130], lg: [130, 200] },
            oversized: { sm: [120, 180], md: [180, 280], lg: [250, 380] },
            frameless: { sm: [70, 110], md: [110, 170], lg: [170, 260] },
            other: { sm: [50, 100], md: [100, 180], lg: [180, 300] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard installation. Final price confirmed after reviewing your mirror and wall.'
    },
    projector: {
        title: 'Projector Mounting Estimate',
        subtitle: 'Select your mount type and ceiling for an estimated price range.',
        categories: [
            {
                label: 'Mount Location',
                id: 'series',
                options: [
                    { value: '', label: 'Choose mount type…' },
                    { value: 'ceiling', label: 'Ceiling Mount' },
                    { value: 'wall', label: 'Wall Mount' },
                    { value: 'shelf', label: 'Shelf / Table Bracket' },
                    { value: 'other', label: 'Other Setup' }
                ]
            },
            {
                label: 'Ceiling / Wall Type',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    ceiling: [
                        { value: '', label: 'Choose surface…' },
                        { value: 'sm', label: 'Drywall ceiling' },
                        { value: 'md', label: 'Drop ceiling (suspended)' },
                        { value: 'lg', label: 'Concrete ceiling' }
                    ],
                    wall: [
                        { value: '', label: 'Choose surface…' },
                        { value: 'sm', label: 'Drywall' },
                        { value: 'md', label: 'Plaster' },
                        { value: 'lg', label: 'Brick / concrete' }
                    ],
                    shelf: [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Mount only' },
                        { value: 'md', label: 'Mount + cable routing' },
                        { value: 'lg', label: 'Mount + cable + alignment' }
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
            ceiling: { sm: [150, 220], md: [200, 300], lg: [280, 400] },
            wall: { sm: [120, 180], md: [160, 250], lg: [220, 340] },
            shelf: { sm: [60, 100], md: [100, 160], lg: [140, 220] },
            other: { sm: [100, 180], md: [180, 280], lg: [280, 420] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates include mount and cable routing. Projector and cables not included.'
    },
    'projector-screen': {
        title: 'Projector Screen Estimate',
        subtitle: 'Select your screen type and size for an estimated price range.',
        categories: [
            {
                label: 'Screen Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose screen type…' },
                    { value: 'fixed', label: 'Fixed-Frame Screen' },
                    { value: 'pulldown', label: 'Pull-Down (Manual)' },
                    { value: 'motorized', label: 'Motorized Electric' },
                    { value: 'tab-tension', label: 'Tab-Tensioned Screen' },
                    { value: 'other', label: 'Other Screen' }
                ]
            },
            {
                label: 'Screen Size',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    fixed: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Up to 100″' },
                        { value: 'md', label: '100″ – 120″' },
                        { value: 'lg', label: '120″+' }
                    ],
                    pulldown: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Up to 100″' },
                        { value: 'md', label: '100″ – 120″' },
                        { value: 'lg', label: '120″+' }
                    ],
                    motorized: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Up to 100″' },
                        { value: 'md', label: '100″ – 120″' },
                        { value: 'lg', label: '120″+' }
                    ],
                    'tab-tension': [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Up to 100″' },
                        { value: 'md', label: '100″ – 120″' },
                        { value: 'lg', label: '120″+' }
                    ],
                    other: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Small' },
                        { value: 'md', label: 'Medium' },
                        { value: 'lg', label: 'Large' }
                    ]
                }
            }
        ],
        pricing: {
            fixed: { sm: [120, 180], md: [180, 280], lg: [280, 400] },
            pulldown: { sm: [80, 130], md: [130, 200], lg: [200, 300] },
            motorized: { sm: [150, 230], md: [230, 350], lg: [350, 500] },
            'tab-tension': { sm: [160, 250], md: [250, 380], lg: [380, 550] },
            other: { sm: [80, 150], md: [150, 250], lg: [250, 400] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates include mounting and alignment. Screen hardware not included unless specified.'
    },
    desk: {
        title: 'Desk Assembly Estimate',
        subtitle: 'Select your desk type and complexity for an estimated price range.',
        categories: [
            {
                label: 'Desk Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose desk type…' },
                    { value: 'simple', label: 'Simple Writing Desk' },
                    { value: 'lshaped', label: 'L-Shaped / Corner Desk' },
                    { value: 'standing', label: 'Standing / Adjustable Desk' },
                    { value: 'executive', label: 'Executive / Large Desk' },
                    { value: 'gaming', label: 'Gaming Desk' },
                    { value: 'other', label: 'Other Desk' }
                ]
            },
            {
                label: 'Complexity',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    simple: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Basic (no drawers)' },
                        { value: 'md', label: 'With drawers / hutch' },
                        { value: 'lg', label: 'With hutch + shelving' }
                    ],
                    lshaped: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Basic L-shape' },
                        { value: 'md', label: 'With drawers / filing' },
                        { value: 'lg', label: 'With hutch + storage' }
                    ],
                    standing: [
                        { value: '', label: 'Choose type…' },
                        { value: 'sm', label: 'Manual crank' },
                        { value: 'md', label: 'Electric — single motor' },
                        { value: 'lg', label: 'Electric — dual motor + accessories' }
                    ],
                    executive: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Standard' },
                        { value: 'md', label: 'With credenza' },
                        { value: 'lg', label: 'With credenza + hutch' }
                    ],
                    gaming: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Basic frame' },
                        { value: 'md', label: 'With monitor arm / cable mgmt' },
                        { value: 'lg', label: 'Full setup + accessories' }
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
            simple: { sm: [60, 100], md: [100, 160], lg: [160, 240] },
            lshaped: { sm: [100, 160], md: [160, 240], lg: [240, 360] },
            standing: { sm: [80, 130], md: [130, 200], lg: [200, 300] },
            executive: { sm: [120, 180], md: [200, 300], lg: [300, 450] },
            gaming: { sm: [70, 120], md: [120, 200], lg: [200, 320] },
            other: { sm: [60, 120], md: [120, 200], lg: [200, 340] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Final price confirmed after reviewing your desk.'
    },
    dresser: {
        title: 'Dresser Assembly Estimate',
        subtitle: 'Select your dresser type and size for an estimated price range.',
        categories: [
            {
                label: 'Dresser Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose dresser type…' },
                    { value: 'standard', label: 'Standard Dresser' },
                    { value: 'tall', label: 'Tall / Chest of Drawers' },
                    { value: 'wide', label: 'Wide / Double Dresser' },
                    { value: 'combo', label: 'Dresser + Mirror Combo' },
                    { value: 'nightstand', label: 'Nightstand / Side Table' },
                    { value: 'other', label: 'Other Storage' }
                ]
            },
            {
                label: 'Size / Drawers',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    standard: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: '3–4 drawers' },
                        { value: 'md', label: '5–6 drawers' },
                        { value: 'lg', label: '7+ drawers' }
                    ],
                    tall: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: '4–5 drawers' },
                        { value: 'md', label: '6–7 drawers' },
                        { value: 'lg', label: '8+ drawers' }
                    ],
                    wide: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: '6 drawers' },
                        { value: 'md', label: '8 drawers' },
                        { value: 'lg', label: '10+ drawers' }
                    ],
                    combo: [
                        { value: '', label: 'Choose scope…' },
                        { value: 'sm', label: 'Dresser only' },
                        { value: 'md', label: 'Dresser + mirror mount' },
                        { value: 'lg', label: 'Dresser + mirror + wall anchor' }
                    ],
                    nightstand: [
                        { value: '', label: 'Choose quantity…' },
                        { value: 'sm', label: '1 nightstand' },
                        { value: 'md', label: '2 nightstands' },
                        { value: 'lg', label: '3+ nightstands' }
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
            standard: { sm: [60, 100], md: [100, 150], lg: [150, 220] },
            tall: { sm: [70, 110], md: [110, 170], lg: [170, 250] },
            wide: { sm: [80, 130], md: [130, 200], lg: [200, 300] },
            combo: { sm: [80, 130], md: [130, 200], lg: [200, 280] },
            nightstand: { sm: [40, 70], md: [70, 120], lg: [110, 170] },
            other: { sm: [50, 100], md: [100, 180], lg: [180, 280] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates based on standard assembly. Wall anchoring included where required.'
    },
    'wall-bed': {
        title: 'Murphy Bed Estimate',
        subtitle: 'Select your Murphy bed type and size for an estimated price range.',
        categories: [
            {
                label: 'Murphy Bed Type',
                id: 'series',
                options: [
                    { value: '', label: 'Choose bed type…' },
                    { value: 'vertical', label: 'Vertical Murphy Bed' },
                    { value: 'horizontal', label: 'Horizontal Murphy Bed' },
                    { value: 'cabinet', label: 'Cabinet / Wall Bed System' },
                    { value: 'bookcase', label: 'Bookcase Murphy Bed' },
                    { value: 'desk-combo', label: 'Desk + Murphy Bed Combo' },
                    { value: 'other', label: 'Other Wall Bed' }
                ]
            },
            {
                label: 'Bed Size',
                id: 'size',
                dependsOn: 'series',
                optionSets: {
                    vertical: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Twin XL' },
                        { value: 'md', label: 'Full / Queen' },
                        { value: 'lg', label: 'King / Cal King' }
                    ],
                    horizontal: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Twin XL' },
                        { value: 'md', label: 'Full' },
                        { value: 'lg', label: 'Queen' }
                    ],
                    cabinet: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Twin XL' },
                        { value: 'md', label: 'Full / Queen' },
                        { value: 'lg', label: 'Queen + side cabinets' }
                    ],
                    bookcase: [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin / Twin XL' },
                        { value: 'md', label: 'Full / Queen' },
                        { value: 'lg', label: 'Queen + shelving units' }
                    ],
                    'desk-combo': [
                        { value: '', label: 'Choose size…' },
                        { value: 'sm', label: 'Twin + small desk' },
                        { value: 'md', label: 'Full + desk' },
                        { value: 'lg', label: 'Queen + full desk system' }
                    ],
                    other: [
                        { value: '', label: 'Choose complexity…' },
                        { value: 'sm', label: 'Standard' },
                        { value: 'md', label: 'With storage' },
                        { value: 'lg', label: 'Full system' }
                    ]
                }
            }
        ],
        pricing: {
            vertical: { sm: [350, 500], md: [500, 750], lg: [750, 1100] },
            horizontal: { sm: [350, 500], md: [500, 700], lg: [700, 1000] },
            cabinet: { sm: [400, 600], md: [600, 900], lg: [900, 1400] },
            bookcase: { sm: [400, 600], md: [600, 900], lg: [900, 1300] },
            'desk-combo': { sm: [450, 650], md: [650, 1000], lg: [1000, 1500] },
            other: { sm: [350, 550], md: [550, 850], lg: [850, 1300] }
        },
        cta: { text: 'Get Exact Quote', href: '/#contact' },
        disclaimer: 'Estimates include assembly, wall anchoring, and mechanism testing. Hardware and bed frame included in estimate.'
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
