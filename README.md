# Vignan Feedback System

**AI-Powered Smart Campus Complaint Management Platform**

A modern, production-grade web application that streamlines campus facility complaint management using AI-driven analysis, interactive dashboards, and heatmap visualizations.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## ✨ Features

- **AI-Powered Complaint Analysis** – Automatic categorization, priority scoring, and sentiment detection for submitted complaints.
- **Interactive Dashboards** – Real-time analytics with Chart.js visualizations for students and administrators.
- **Campus Heatmap** – Leaflet-based geographic heatmap showing complaint hotspots across the campus.
- **Complaint Tracking** – End-to-end lifecycle tracking from submission to resolution.
- **Student & Admin Portals** – Dedicated registration, login, and dashboard views for all user roles.
- **Responsive Design** – Fully mobile-friendly SaaS-style UI built with modern design principles.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS (custom design system) |
| Logic | Vanilla JavaScript (SPA architecture) |
| Charts | Chart.js 4.x (via CDN) |
| Maps | Leaflet 1.9 + Leaflet.heat (via CDN) |
| Animations | AOS (Animate On Scroll) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts (Inter, Outfit) |

## 📁 Project Structure

```
vignan-feedback-system/
├── index.html          # Main entry point (SPA shell)
├── css/
│   └── styles.css      # Complete design system & component styles
├── js/
│   ├── app.js          # Application initializer & router
│   ├── ai.js           # AI analysis engine (categorization, sentiment)
│   ├── components.js   # Reusable UI components (navbar, modals, toasts)
│   ├── dashboard.js    # Dashboard charts & analytics logic
│   ├── data.js         # Data store & mock data management
│   ├── heatmap.js      # Leaflet heatmap integration
│   └── pages.js        # Page templates & rendering logic
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, or Safari)
- No build tools, Node.js, or server required!

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/vignan-feedback-system.git
   cd vignan-feedback-system
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser, or use a local server:
   # With Python:
   python -m http.server 8000

   # With VS Code:
   # Install "Live Server" extension → Right-click index.html → "Open with Live Server"
   ```

3. **Visit** `http://localhost:8000` in your browser.

## 🌐 Deployment

This is a fully static site — deploy it anywhere:

| Platform | How |
|----------|-----|
| **GitHub Pages** | Push to GitHub → Settings → Pages → Select `main` branch |
| **Netlify** | Drag & drop project folder at [netlify.com](https://www.netlify.com/) |
| **Vercel** | Import from GitHub at [vercel.com](https://vercel.com/) |
| **Firebase** | `firebase init hosting` → `firebase deploy` |

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

For questions or feedback, open an issue on GitHub or reach out via the platform's contact page.

---

<p align="center">Built with ❤️ for smarter campuses</p>
