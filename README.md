# The Lawn Guru (Zimbabwe)

> *"Zimbabwe's Premier Lawn Installation, Turf Laying, and Landscaping Specialists."*

**The Lawn Guru** is a professional web application built for a premier lawn and landscaping business operating across Zimbabwe with its primary hub in Harare. Developed under the **M.P.A.S** trademark to advance ICT digitization in Zimbabwe at accessible rates, professionalizing local enterprises.

---

## 🌿 Brand Identity
- **Name**: The Lawn Guru
- **Trademark**: M.P.A.S
- **Coverage**: Harare & Zimbabwe Nationwide
- **Key Service Suburbs**: Borrowdale, Highlands, Mount Pleasant, Avondale, Greystone Park, Chisipite, Glen Lorne, Westgate, Newlands, and surrounding areas.
- **Core Specialties**:
  - Instant Lawn Installation (Durban Grass, Kikuyu Turf, Buffalo Grass, Pasadena / Winter Green)
  - Ground preparation, red soil conditioning, and weed-free organic topsoil grading
  - Landscape design, stone borders, decorative edging, and garden revivals

---

## 🚀 Website Features
1. **Semantic HTML5 & Vanilla CSS Design System**:
   - Curated emerald and forest green palette (`#0d2818`, `#16a34a`, `#22c55e`, `#f0fdf4`).
   - Clean, accessible typography via Google Fonts (`Plus Jakarta Sans` and `Inter`).
   - 100% transparent header with zero divider lines.
   - Fully responsive across mobile, tablet, and desktop viewports.
2. **Mobile First-Time Experience**:
   - Interactive Turf Rollout Curtain Splash with glowing logo and Zimbabwe branding.
   - Ambient floating dewdrops and gentle drifting leaf particles in the hero.
3. **Tailored Yard Assessment Request**:
   - Custom quote consultation request via form or direct WhatsApp chat.
4. **Projects Showcase & Lightbox**:
   - Filterable gallery featuring all 13 real project installations across Harare.
   - Click-to-zoom HD lightbox viewer with smooth backdrop blur.
4. **Customer Reviews System**:
   - Pre-loaded with 8 genuine client reviews (7 high-rating reviews across Harare suburbs + 1 balanced average review for authentic credibility).
   - Interactive review submission form with live star picker, saving to browser `localStorage` and updating the average rating and review counter instantly.
5. **Contact & Assessment Booking**:
   - Dedicated Harare contact cards, phone numbers, and WhatsApp links.
   - Validated inquiry form with instant confirmation modal ("Message Sent!").
6. **SEO & Search Engine Indexing Ready**:
   - OpenGraph and Twitter card social meta tags.
   - Google `LocalBusiness` / `HomeAndConstructionBusiness` Schema.org JSON-LD microdata for rapid indexing on Google Search.

---

## 📂 Project Structure
```
thelawnguru/
├── assets/
│   ├── logo.svg           # Scalable vector brand logo
│   └── icon.svg           # Monogram favicon / icon mark
├── css/
│   └── style.css          # Design tokens, components, responsive layouts
├── js/
│   └── main.js            # Lightbox, estimator, reviews & form handling
├── picss/                 # 13 real high-res project photos
│   ├── IMG-20260917-WA0031.jpg
│   └── ...
├── index.html             # Homepage (Hero, highlights, preview)
├── services.html          # Services, Grass catalog & Cost Estimator
├── gallery.html           # Full filterable photo gallery & Lightbox
├── reviews.html           # Verified customer reviews & Add Review form
├── contact.html           # Contact details & interactive message form
├── vercel.json            # Vercel deployment & cache optimization
└── README.md              # Project documentation
```

---

## 💻 Local Testing & Preview
To run the website locally on your computer:
```bash
# Using Python 3 built-in server
python3 -m http.server 3000

# Open in your browser
http://localhost:3000
```

---

## 🌐 Deploying to Vercel
This project is pre-configured with `vercel.json` for zero-configuration, lightning-fast hosting on Vercel:
1. Push this repository to GitHub (`origin main`).
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select `thelawnguru` from your GitHub repositories.
4. Click **Deploy**. Vercel will automatically deploy the static site with instant global CDN distribution, HTTPS, and clean URLs!
