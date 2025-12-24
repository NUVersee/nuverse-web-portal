# NUverse Frontend

Welcome to the **NUverse** frontend, an immersive virtual reality portal for Nile University. This application allows users to explore the campus in 360°, interact with AI professors, and experience virtual laboratories.

## 🚀 Features

- **360° Campus Tour**: High-resolution panoramic views of Nile University.
- **AI Professor**: Interact with AI-driven academic advisors.
- **VR Labs**: Virtual experiments in Chemistry and Circuits.
- **Modern UI/UX**: Premium design with glassmorphism, dark mode support, and smooth animations.
- **Responsive Design**: Optimized for desktops, tablets, and phones.

## 🛠️ Requirements

Before you begin, ensure you have the following installed:

- **Node.js**: `v18.x` or higher (tested with `v20.x`)
- **npm**: `v9.x` or higher

## 📦 Installation

1. Clone the repository (if you haven't already):
   ```bash
   git clone <repository-url>
   cd nuverse-web-portal/nuverse-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🏃 How to Run

### Development Mode

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To build the application for production:
```bash
npm run build
```

Then, you can start the production server:
```bash
npm run start
```

## 🏗️ Technology Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State/Theme**: React Context API
- **Fonts**: Outfit (Google Fonts)

## 🎨 Design System

The project uses a modern design system defined in `src/app/globals.css`:
- **Glassmorphism**: Use the `.glass` and `.dark-glass` utility classes.
- **Typography**: `font-sans` maps to the **Outfit** font.
- **Colors**: Semantic CSS variables for background and foreground colors.
- **Dark Mode**: Automatically respects system preferences or user toggle.

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m "feat: adds some feature"`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a Pull Request.
