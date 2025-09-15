# Todos TS

A full-stack TypeScript monorepo for a Todos application using modern technologies.

## 🏗️ Architecture

This project is structured as a TypeScript monorepo with npm workspaces:

- **📱 Client** (`client/`) - React + Vite + TypeScript frontend
- **🖥️ Server** (`server/`) - Fastify + Mongoose + TypeScript backend  
- **📦 Shared** (`shared/`) - Common TypeScript types and utilities

## 🛠️ Tech Stack

### Frontend (Client)
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend (Server)
- **Fastify** - Fast web framework
- **Mongoose** - MongoDB ODM
- **TypeScript** - Type safety
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Shared
- **TypeScript** - Common types and utilities
- **ESLint** - Code linting

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todos-ts
   ```

2. **Install dependencies for all workspaces**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   **Server environment:**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB connection string
   ```
   
   **Client environment:**
   ```bash
   cp client/.env.example client/.env
   # Edit client/.env if needed (default API URL should work)
   ```

4. **Build shared package**
   ```bash
   npm run build:shared
   ```

### Running the Application

**Development mode (recommended):**
```bash
# Start both client and server concurrently
npm run dev
```

This will start:
- 🖥️ **Server** on http://localhost:3001
- 📱 **Client** on http://localhost:5173

**Or run individually:**
```bash
# Terminal 1 - Start server
npm run dev:server

# Terminal 2 - Start client  
npm run dev:client
```

## 📂 Project Structure

```
todos-ts/
├── 📦 package.json                 # Root workspace configuration
├── 📱 client/                      # React frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API services
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── 🖥️ server/                      # Fastify backend  
│   ├── src/
│   │   ├── models/                 # Mongoose models
│   │   ├── routes/                 # API routes
│   │   ├── plugins/                # Fastify plugins
│   │   └── index.ts                # Server entry point
│   ├── package.json
│   └── tsconfig.json
└── 📦 shared/                      # Shared types & utilities
    ├── src/
    │   ├── types.ts                # Common TypeScript types
    │   └── index.ts                # Exports
    ├── package.json
    └── tsconfig.json
```

## 🔧 Available Scripts

### Root Level
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build all packages (shared → client → server)
- `npm run test` - Run tests in all workspaces
- `npm run lint` - Lint all workspaces
- `npm run clean` - Clean all build artifacts and node_modules

### Individual Workspaces
- `npm run dev:client` - Start client development server
- `npm run dev:server` - Start server in development mode
- `npm run build:client` - Build client for production
- `npm run build:server` - Build server for production
- `npm run build:shared` - Build shared package

## 🌐 API Endpoints

The server provides the following REST API endpoints:

### Health Check
- `GET /api/health` - Server health check

### Todos
- `GET /api/todos` - Get all todos (with pagination)
  - Query params: `page`, `limit`, `completed`
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Example API Response
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "title": "Learn TypeScript",
      "description": "Complete the TypeScript tutorial",
      "completed": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

## 🔒 CORS Configuration

The server is configured with CORS to allow requests from:
- `http://localhost:3000`
- `http://localhost:5173` 
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

For production, update the CORS configuration in `server/src/plugins/cors.ts`.

## 🛠️ Development

### Adding New Features

1. **Add shared types** in `shared/src/types.ts`
2. **Update API endpoints** in `server/src/routes/`
3. **Update frontend components** in `client/src/components/`
4. **Build shared package** with `npm run build:shared`

### Code Quality

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting for all packages
- **Consistent formatting** - Recommended VS Code extensions

### Testing

```bash
# Run all tests
npm run test

# Run tests for specific workspace
npm run test --workspace=server
```

## 🐳 Production Deployment

### Building for Production

```bash
# Build all packages
npm run build

# Or build individually
npm run build:shared
npm run build:client  
npm run build:server
```

### Environment Variables

**Server (.env):**
```
NODE_ENV=production
PORT=3001
HOST=0.0.0.0
MONGODB_URL=mongodb://localhost:27017/todos-ts
```

**Client (.env):**
```
VITE_API_URL=https://your-api-domain.com/api
```

### Docker Support

*Docker configuration can be added for containerized deployment.*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or update `MONGODB_URL` in server/.env

**CORS Errors:**
- Check that the client URL is included in the CORS configuration
- Verify API URL in client/.env

**Build Errors:**
- Run `npm run build:shared` before building other packages
- Clear node_modules and reinstall: `npm run clean && npm install`

**Port Conflicts:**
- Update ports in server/.env (server) or vite.config.ts (client)
