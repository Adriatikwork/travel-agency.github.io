# Travel Agency Website

A modern, responsive travel agency website built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (Static Export)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **TypeScript**: Type-safe development
- **UI Components**: Radix UI + Custom Components
- **Animations**: Motion & Framer Motion
- **Forms**: React Hook Form + Zod validation

## 📦 Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm
- Docker & Docker Compose (for containerized deployment)

## 🛠️ Installation

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd travel-agency-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🐳 Docker Deployment

### Development Mode (with hot reload)

```bash
# Build and start development container
pnpm docker:dev

# Access at http://localhost:8909
```

### Production Mode (static build)

```bash
# Build and start production container
pnpm docker:prod

# Access at http://localhost:8908
```

### Other Docker Commands

```bash
# Stop all containers
pnpm docker:stop

# View logs
pnpm docker:logs

# Build image manually
pnpm docker:build

# Run built image
pnpm docker:run
```

### Direct Docker Commands

```bash
# Build production image
docker build -t travel-agency .

# Run production container
docker run -p 8908:3000 travel-agency

# Using docker-compose
docker compose up travel-agency-app -d    # Production
docker compose up travel-agency-dev -d    # Development
docker compose down                        # Stop all
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server at localhost:3000 |
| `pnpm build` | Build for production (static export) |
| `pnpm start` | Start production server (after build) |
| `pnpm lint` | Run ESLint |
| `pnpm export` | Build and export static site |
| `pnpm deploy` | Build, export, and prepare for deployment |
| `pnpm docker:build` | Build Docker image |
| `pnpm docker:run` | Run Docker container |
| `pnpm docker:dev` | Start development container (port 8909) |
| `pnpm docker:prod` | Start production container (port 8908) |
| `pnpm docker:stop` | Stop all Docker containers |
| `pnpm docker:logs` | View container logs |

## 🌐 Deployment

### GitHub Pages (Automated)

This project includes GitHub Actions workflow for automatic deployment:

1. **Push to main/master branch** - triggers automatic build and deploy
2. **GitHub Actions builds** the static site (typically 2-5 minutes)
3. **Deploys to GitHub Pages** automatically
4. **Pages update** - Changes appear on GitHub Pages within 1-5 minutes after deployment completes

**Note**: The first build may take longer as it generates all static destination pages. Subsequent builds are faster due to caching.

#### Setup GitHub Pages:

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Update `CNAME` file with your custom domain (if applicable)
4. Push changes to trigger deployment

#### Checking Deployment Status:

- View build progress: Go to your repository → Actions tab
- Check deployment: Repository Settings → Pages → See recent deployments
- Typical timeline: Build (2-5 min) → Deploy (1-2 min) → Pages update (1-5 min)

### Manual Deployment

```bash
# Build static export
pnpm run build

# The static files will be in the 'out' directory
# Upload the 'out' directory to your hosting provider
```

## 🗂️ Project Structure

```
travel-agency-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   ├── page.tsx           # Home page
│   └── destinations/      # Dynamic destination routes
│       └── [slug]/        # Individual destination pages (SSG)
│           └── page.tsx   # Destination detail page
├── components/            # React components
│   ├── ui/               # UI primitives (Radix UI)
│   ├── navbar.tsx        # Navigation
│   ├── hero-section.tsx  # Hero component
│   ├── footer.tsx        # Footer component
│   └── ...
├── data/                  # Static data (JSON)
│   ├── destinations.json
│   ├── packages.json
│   ├── testimonials.json
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/               # Static assets
├── styles/               # Additional styles
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml    # Auto-deploy configuration
├── Dockerfile            # Production Docker config
├── Dockerfile.dev        # Development Docker config
├── docker-compose.yml    # Docker Compose configuration
├── .dockerignore         # Docker ignore file
├── .gitignore            # Git ignore file
├── CNAME                 # Custom domain configuration
└── next.config.mjs       # Next.js configuration
```

## ⚙️ Configuration

### Port Configuration

- **Local Development**: `localhost:3000`
- **Docker Production**: `localhost:8908`
- **Docker Development**: `localhost:8909`

### Custom Domain

Update the `CNAME` file with your domain:
```
your-travel-domain.com
```

### Next.js Configuration

The project is configured for static export in `next.config.mjs`:
- Static export enabled (`output: 'export'`)
- Images unoptimized for static hosting
- TypeScript/ESLint errors ignored during build (configurable)

## 🎨 Features

- ✅ Fully responsive design
- ✅ Dark/Light mode support
- ✅ Static site generation (SSG) with dynamic routes
- ✅ Pre-generated destination pages for GitHub Pages
- ✅ SEO optimized
- ✅ Fast page loads
- ✅ Modern UI components
- ✅ Form validation
- ✅ Docker support
- ✅ CI/CD with GitHub Actions
- ✅ TypeScript for type safety

## 🔧 Environment Variables

Create `.env.local` for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 📝 Notes

- This project uses **static export** (`output: 'export'`), which means:
  - No server-side rendering (SSR)
  - No API routes
  - All pages are pre-rendered at build time
  - Dynamic routes (`/destinations/[slug]`) are statically generated using `generateStaticParams()`
  - Perfect for GitHub Pages and static hosting
  
- **Destination Pages**: All destination pages are pre-generated at build time:
  - `/destinations/bansko-family-vacation/`
  - `/destinations/prague-christmas-getaway/`
  - `/destinations/st-moritz-luxury-ski/`
  - `/destinations/vienna-winter-culture/`
  - `/destinations/barcelona-december-escape/`

- **Docker ports**:
  - Production: `8908:3000`
  - Development: `8909:3000`
  
- **GitHub Actions** automatically deploys to GitHub Pages on push to main/master

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Note**: Make sure to update the `CNAME` file with your actual domain before deploying to production.

