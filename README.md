# WoodMind Studio

A professional wood design platform that allows users to upload images, convert them to SVG, visualize designs in 3D with realistic wood textures, and calculate pricing automatically.

## Features

- **Smart Editor**: Upload images and convert to SVG with intelligent tracing
- **3D Visualization**: Real-time 3D rendering with realistic wood materials
- **Instant Pricing**: Automated cost calculation based on materials and complexity
- **Technical Validation**: Automated manufacturability checks
- **Multiple Export Formats**: SVG, PNG, DXF support

## Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS with custom wood color palette
- Three.js + React Three Fiber for 3D visualization
- Zustand for state management
- React Query for API calls
- React Router for navigation

### Backend
- Node.js + Express
- Sharp for image processing
- Potrace for SVG conversion
- SQLite database with better-sqlite3
- Multer for file uploads
- Express validation and rate limiting

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd woodmind-studio
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Environment setup**

Backend (.env):
```env
PORT=3001
NODE_ENV=development
UPLOAD_DIR=./uploads
EXPORT_DIR=./exports
MAX_FILE_SIZE=10485760
DB_PATH=./database.sqlite
```

Frontend (.env):
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=WoodMind Studio
VITE_APP_VERSION=1.0.0
```

## Running the Application

### Development Mode

1. **Start the backend server**
```bash
cd backend
npm run dev
```
The backend will start on http://localhost:3001

2. **Start the frontend development server**
```bash
cd frontend
npm run dev
```
The frontend will start on http://localhost:5173

### Production Mode

1. **Build the frontend**
```bash
cd frontend
npm run build
```

2. **Start the backend in production**
```bash
cd backend
npm start
```

## Available Routes

### Frontend Routes
- `/` - Home/Landing page
- `/editor` - Design editor workspace
- `/viewer` - 3D visualization workspace
- `/pricing` - Pricing calculator workspace

### Backend API Routes
- `GET /api/health` - Health check endpoint
- `POST /api/upload/image` - Upload image for conversion
- `POST /api/export` - Export design in various formats
- `GET /api/textures` - Get available wood textures
- `GET /api/pricing/materials` - Get material pricing
- `POST /api/pricing/calculate` - Calculate project price
- `POST /api/pricing/validate` - Validate design for manufacturing

## Project Structure

```
woodmind-studio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor/      # Design editor components
│   │   │   ├── Viewer3D/    # 3D visualization components
│   │   │   ├── Pricing/     # Pricing calculator components
│   │   │   ├── UI/          # Reusable UI components
│   │   │   └── Layout/      # Layout and navigation
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service functions
│   │   ├── utils/           # Utility functions
│   │   └── store/           # Zustand stores
│   └── public/              # Static assets
├── backend/
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── controllers/     # Business logic controllers
│   │   ├── services/        # Backend services
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   └── db/              # Database setup and migrations
│   ├── uploads/             # User uploaded files
│   └── exports/             # Generated export files
└── README.md
```

## Development Notes

- The application uses ESM modules throughout
- Frontend proxy is configured to forward `/api` requests to the backend
- Database is automatically initialized with seed data on first run
- File uploads are limited to 10MB and images only
- Rate limiting is applied to prevent abuse

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
# Vercel Deployment Trigger
# Deployment Trigger - Fri Feb 20 19:51:54 -03 2026
