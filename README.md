# PerpPractice - Crypto Trading Practice Platform

A fully responsive, production-ready frontend for a simulated perpetuals trading platform. Built with React, TypeScript, TailwindCSS, and Framer Motion.

## 🚀 Features

### Core Platform Features
- **Landing Page** - Hero section with animated stats, features showcase, and CTAs
- **Authentication** - Login/Signup pages with wallet connection support
- **Trading Terminal** - Real-time simulated trading interface with live charts
- **Dashboard** - Performance overview with heatmaps, P&L charts, and recent trades
- **Analytics** - Deep dive into trading performance with multiple chart types
- **Leaderboard** - Global rankings with search and filtering
- **Portfolio** - Capital allocation tracking and position management
- **Client Portal** - Browse and fund top traders
- **Challenges** - Gamified achievement system
- **Settings** - Complete profile and preference management

### Design & UX
- Dark theme with electric blue/purple neon accents
- Glassmorphism effects and subtle glows
- Smooth Framer Motion animations
- Fully responsive (mobile, tablet, desktop)
- Professional crypto trading terminal aesthetic
- GitHub-style activity heatmaps
- Real-time data simulations

### Technical Highlights
- **React 18** with TypeScript
- **TailwindCSS** with custom design system
- **Recharts** for data visualizations
- **Framer Motion** for animations
- **React Router** for navigation
- **Mock WebSocket** hooks for live data simulation
- Fully typed with TypeScript
- Component-based architecture
- Custom hooks and utilities

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── Navbar.tsx       # Top navigation
│   ├── Sidebar.tsx      # Side navigation
│   ├── StatsCard.tsx    # Reusable stat display
│   ├── MiniChart.tsx    # Small chart component
│   └── Heatmap.tsx      # Activity heatmap
├── pages/
│   ├── Landing.tsx      # Landing page
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Signup page
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Trade.tsx        # Trading terminal
│   ├── Analytics.tsx    # Performance analytics
│   ├── Leaderboard.tsx  # Global rankings
│   ├── Portfolio.tsx    # Portfolio management
│   ├── Settings.tsx     # User settings
│   ├── Clients.tsx      # Client portal
│   └── Challenges.tsx   # Challenge system
├── data/
│   └── mockData.ts      # Mock data for simulation
├── App.tsx              # Main app component
├── index.css            # Global styles & design system
└── main.tsx             # Entry point
```

## 🎨 Design System

All colors are defined as HSL variables in `src/index.css`:
- **Primary**: Electric blue (`hsl(243 75% 59%)`)
- **Secondary**: Deep purple (`hsl(270 70% 60%)`)
- **Accent**: Teal (`hsl(174 72% 56%)`)
- **Success**: Green (`hsl(142 76% 36%)`)
- **Loss**: Red (`hsl(0 72% 51%)`)

Custom utility classes:
- `.glass` - Glassmorphism effect
- `.glass-hover` - Interactive glass panel
- `.glow-primary` - Primary color glow
- `.glow-success` - Success color glow
- `.glow-loss` - Loss color glow
- `.gradient-text` - Gradient text effect

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 📊 Mock Data

The platform uses comprehensive mock data defined in `src/data/mockData.ts`:
- User profile information
- Trading history (P&L, trades, positions)
- Market data (prices, volumes)
- Leaderboard rankings
- Funding offers
- Activity heatmaps

All data is designed to simulate a real trading environment for demonstration purposes.

## 🎯 Key Pages

### Landing Page (`/`)
- Hero section with platform tagline
- Animated statistics
- Features showcase
- Footer with links

### Dashboard (`/dashboard`)
- Quick stats cards (P&L, Win Rate, Streak, Rank)
- Activity heatmap
- Weekly P&L chart
- Recent trades list
- Funding offers

### Trade Terminal (`/trade`)
- Real-time price charts
- Order panel (Long/Short)
- Market selector
- Open positions tracker
- Trade history

### Analytics (`/analytics`)
- Performance metrics
- P&L over time chart
- Win/loss ratio pie chart
- Trades by pair
- Achievement badges
- AI insights

### Leaderboard (`/leaderboard`)
- Global rankings
- Timeframe filters
- Trader search
- Performance metrics
- View profiles

## 🔒 Authentication Flow

1. User visits landing page
2. Clicks "Get Started" or "Login"
3. Enters credentials or connects wallet
4. Redirected to Dashboard

*Note: Current implementation is mock authentication. Integrate with your backend for production.*

## 🚢 Deployment

This project is ready to deploy to:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting service

Simply connect your Git repository and deploy!

## 🎨 UI Components

Built with Shadcn UI components:
- Buttons, Inputs, Labels
- Cards, Tabs, Tooltips
- Dialogs, Dropdowns
- Charts (Recharts)

All components are customized to match the dark crypto theme.

## 📱 Responsive Design

- **Mobile**: Simplified layouts, collapsible sections
- **Tablet**: Adapted grid layouts
- **Desktop**: Full experience with sidebar

## 🔮 Future Enhancements

- Real WebSocket integration for live data
- Backend API integration
- User authentication system
- Real funding marketplace
- Social features (follow traders, copy trading)
- Advanced charting tools
- Mobile app version

## 📄 License

This project is built for demonstration purposes.

## 🤝 Contributing

This is a frontend showcase project. Feel free to fork and customize for your needs.

---

