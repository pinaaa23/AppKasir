```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🎨 LOGIN DESIGN SPECIFICATIONS 🎨                         ║
╚══════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────────────────────────────────────────────────────────────┐
│ COLOR PALETTE                                                                │
└──────────────────────────────────────────────────────────────────────────────┘

Primary Colors:
  Purple:        #667eea    ███ (Main brand color)
  Dark Purple:   #764ba2    ███ (Secondary brand)
  Accent Pink:   #f093fb    ███ (Highlights)

Neutral Colors:
  White:         #ffffff    ███ (Card background)
  Light Gray:    #f9fafb    ███ (Light backgrounds)
  Gray:          #e5e7eb    ███ (Borders, dividers)
  Dark Gray:     #6b7280    ███ (Secondary text)
  Black Gray:    #1f2937    ███ (Main text)

Status Colors:
  Error:         #ef4444    ███ (Error messages)
  Success:       #10b981    ███ (Success states)
  Warning:       #f59e0b    ███ (Warnings)

┌──────────────────────────────────────────────────────────────────────────────┐
│ TYPOGRAPHY                                                                   │
└──────────────────────────────────────────────────────────────────────────────┘

Font Family:
  "Segoe UI", Tahoma, Geneva, Verdana, sans-serif

Title:
  Size:      2.5rem (40px)
  Weight:    800 (Extra Bold)
  Color:     Gradient (#667eea → #764ba2)
  Letter Sp: -0.5px
  Example:   "KasirKu Admin"

Subtitle:
  Size:      1rem (16px)
  Weight:    500 (Medium)
  Color:     #6b7280 (Gray)
  Example:   "Masuk ke dashboard admin"

Labels:
  Size:      0.95rem (15px)
  Weight:    600 (Semi-bold)
  Color:     #374151 (Dark Gray)
  Example:   "Email"

Body Text:
  Size:      0.9rem (14px)
  Weight:    400 (Normal)
  Color:     #6b7280 (Gray)
  Example:   Error messages, hints

┌──────────────────────────────────────────────────────────────────────────────┐
│ COMPONENTS DESIGN                                                            │
└──────────────────────────────────────────────────────────────────────────────┘

BACKGROUND:
  Type:        Linear Gradient 135deg
  Colors:      #667eea → #764ba2 → #f093fb
  Opacity:     100%
  Blobs:       Animated floating elements
              └─ 400px circle top-left (8s animation)
              └─ 300px circle bottom-right (10s animation)

CARD:
  Background:   rgba(255, 255, 255, 0.95)
  Backdrop:     blur(20px)
  Border:       1px solid rgba(255,255,255,0.3)
  Border Radius: 25px
  Padding:      3.5rem 3rem
  Shadow:       0 25px 60px rgba(0,0,0,0.25)
  Max Width:    420px
  Animation:    fadeInUp 0.8s ease

INPUTS:
  Background:   #ffffff
  Border:       2px solid #e5e7eb
  Border Radius: 12px
  Padding:      0.85rem 1rem
  Font:         inherit, 1rem
  Transition:   all 0.3s ease
  
  Focus State:
  └─ Border Color: #667eea
  └─ Box Shadow:   0 0 0 3px rgba(102,126,234,0.1)
  
  Placeholder:   Light gray text

BUTTONS:
  Background:   Gradient (#667eea → #764ba2)
  Color:        #ffffff
  Border:       none
  Padding:      1rem 1.5rem
  Border Radius: 12px
  Font Size:    1.05rem, Bold
  Shadow:       0 8px 20px rgba(102,126,234,0.3)
  Cursor:       pointer
  Transition:   all 0.3s ease
  
  Hover State:
  └─ Transform:   translateY(-2px)
  └─ Box Shadow:  0 12px 28px rgba(102,126,234,0.4)
  
  Disabled State:
  └─ Opacity:     0.7
  └─ Cursor:      not-allowed

ERROR MESSAGES:
  Background:   rgba(239,68,68,0.1)
  Border:       1px solid #ef4444
  Color:        #dc2626
  Padding:      0.75rem 1rem
  Border Radius: 10px
  Animation:    shake 0.5s ease

SECONDARY BUTTONS:
  Background:   rgba(102,126,234,0.1)
  Border:       1px solid #667eea
  Color:        #667eea
  Padding:      0.7rem 1.5rem
  Border Radius: 10px
  
  Hover:
  └─ Background: rgba(102,126,234,0.2)

┌──────────────────────────────────────────────────────────────────────────────┐
│ ANIMATIONS                                                                   │
└──────────────────────────────────────────────────────────────────────────────┘

Float (Background blobs):
  Duration:     8s & 10s
  Easing:       ease-in-out
  Keyframes:    0% 100% {translateY(0)} → 50% {translateY(30px)}
  Repeat:       infinite
  Direction:    Reverse untuk blob kanan

FadeInUp (Card entrance):
  Duration:     0.8s
  Easing:       ease
  Keyframes:    from {opacity:0, translateY(40px)} → to {opacity:1, translateY(0)}
  Direction:    forwards

Shake (Error feedback):
  Duration:     0.5s
  Easing:       ease
  Keyframes:    0% 100% {translateX(0)} → 25% {translateX(-5px)} → 75% {translateX(5px)}
  Direction:    -

Button Hover:
  Property:     transform, box-shadow
  Duration:     0.3s
  Easing:       ease
  Transform:    translateY(-2px)

┌──────────────────────────────────────────────────────────────────────────────┐
│ RESPONSIVE DESIGN                                                            │
└──────────────────────────────────────────────────────────────────────────────┘

Desktop (1024px+):
  ✓ Full size card (420px max-width)
  ✓ Large padding
  ✓ All animations active
  ✓ Hover effects enabled

Tablet (768px - 1023px):
  ✓ Adjusted card width
  ✓ Medium padding
  ✓ Animations still smooth
  ✓ Touch-friendly buttons

Mobile (< 768px):
  ✓ Card width: 90% of screen
  ✓ Reduced padding (2rem)
  ✓ Optimized for touch
  ✓ Readable font sizes
  ✓ Full height viewport

┌──────────────────────────────────────────────────────────────────────────────┐
│ SPACING                                                                      │
└──────────────────────────────────────────────────────────────────────────────┘

Margin/Padding Scale:
  xs:    0.5rem   (8px)
  sm:    1rem     (16px)
  md:    1.5rem   (24px)
  lg:    2rem     (32px)
  xl:    3rem     (48px)

Form Spacing:
  Input vertical gap:     1.5rem
  Label to input:         0.5rem
  Error to next input:    1.5rem
  Button to text:         1.5rem

Card Internal:
  Title margin:           1.5rem bottom
  Subtitle margin:        2rem bottom
  Form margin:            Width 100%
  Footer separator:       2rem top

┌──────────────────────────────────────────────────────────────────────────────┐
│ INTERACTIVE STATES                                                           │
└──────────────────────────────────────────────────────────────────────────────┘

Input Focus:
  Border Color:    #667eea
  Shadow:          0 0 0 3px rgba(102,126,234,0.1)
  Transition:      smooth
  Outline:         none (handled by shadow)

Input Blur:
  Border Color:    #e5e7eb
  Shadow:          none
  Transition:      smooth

Button Active (Hover):
  Transform:       translateY(-2px)
  Shadow:          0 12px 28px rgba(102,126,234,0.4)
  Cursor:          pointer

Button Disabled:
  Background:      linear-gradient(#cbd5e1 → #94a3b8)
  Opacity:         0.7
  Cursor:          not-allowed
  Shadow:          reduced

Link Hover:
  Color:           #764ba2
  Underline:       keep
  Transition:      all 0.2s ease

┌──────────────────────────────────────────────────────────────────────────────┐
│ ACCESSIBILITY                                                                │
└──────────────────────────────────────────────────────────────────────────────┘

✓ Color Contrast:    WCAG AA compliant
✓ Font Size:         Readable (min 14px)
✓ Focus Indicators:   Clear blue shadow
✓ Error Messages:     Color + text (not color alone)
✓ Labels:            Connected to inputs
✓ Button Text:       Clear action description
✓ Loading States:    Button text changes
✓ Touch Targets:     Min 44px (mobile)

┌──────────────────────────────────────────────────────────────────────────────┐
│ GLASS MORPHISM EFFECT                                                        │
└──────────────────────────────────────────────────────────────────────────────┘

The modern "glass" look is achieved with:

1. Backdrop Filter:
   backdrop-filter: blur(20px)

2. Transparency:
   background: rgba(255,255,255,0.95)
   (95% opaque white with glass effect)

3. Border:
   1px solid rgba(255,255,255,0.3)
   (Semi-transparent white border)

4. Shadow:
   0 25px 60px rgba(0,0,0,0.25)
   (Depth shadow)

Result: Professional frosted glass appearance on gradient background

╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    Design System: Modern & Professional                      ║
║                      Clean, Not Flashy (Tidak Alay)                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```
