# Aaditya R. Tiwari - Portfolio Website

A high-performance creative portfolio website engineered with GSAP 3 animations, Three.js WebGL 3D elements, Lenis smooth scrolling, and Barba.js page transitions.

---

## 🚀 Quick Start (Local Development)

To run the portfolio locally:

```bash
npm start
```
*(or run `node server.js`)*

Then open your browser at:
```
http://localhost:3000
```

---

## 🌐 Vercel Deployment

This repository is pre-configured and 100% ready for instant deployment on **Vercel**.

### Option A: Deploy via GitHub (Recommended)
1. Push this folder to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Leave all settings at default (**Framework Preset: Other**, Root Directory: `./`).
5. Click **Deploy**. Vercel will automatically build and publish your site with clean URLs, HTTPS, global CDN caching, and custom domain support.

### Option B: Deploy via Vercel CLI
1. Log in to Vercel:
   ```bash
   npx vercel login
   ```
2. Deploy directly:
   ```bash
   npx vercel
   ```
3. To deploy directly to production:
   ```bash
   npx vercel --prod
   ```

---

## 📁 Project Structure

```
e:\bleibtgleich.dev/
├── vercel.json                 # ⚡ Vercel routing, clean URLs & CDN caching headers
├── .vercelignore               # 🛡️ Excludes unused large files from deployments
├── .gitignore                  # 🔒 Standard git ignore rules
├── site.config.js              # ⚙️ CENTRAL CONFIGURATION (Profile, works, socials)
├── index.html                  # 🏠 Homepage (Hero, Orbit Cards, 3D Globe, Awards, Footer)
├── work/
│   └── index.html              # 💼 All Works catalog
├── contact/
│   └── index.html              # ☎️ Interactive Rotary Dial Contact Page
├── archive/
│   └── index.html              # 🧪 Experiments & Archive
├── works/                      # 📁 Case Studies / Detail Pages
├── 404.html                    # 🚫 Custom 404 Page
├── assets/
│   ├── css/                    # Stylesheets & color theme variables
│   ├── fonts/                  # Webfonts (Akzidenz Grotesk Pro)
│   ├── photos/                 # Aaditya's photos & certificates
│   ├── images/                 # Icons & favicons
│   └── js/                     # GSAP, Three.js WebGL, Lenis, and Barba engine
├── server.js                   # Local development server
└── package.json                # Project scripts
```

---

## 🎨 How to Customize

All personalization settings are controlled from **[`site.config.js`](file:///e:/bleibtgleich.dev/site.config.js)**:
- `profile.name`: Full name
- `profile.tagline`: Professional title & specialization
- `profile.basedIn`: Location
- `profile.agency`: College / Organization affiliation
- `profile.bio`: Personal summary & vision
- `profile.email`: Contact email address
- `socials`: LinkedIn, GitHub, Instagram links
- `works`: Showcase cards, milestones & competitions
