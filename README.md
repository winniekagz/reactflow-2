# Workflow Builder

A modern visual workflow builder application built with Next.js, ReactFlow, and PostgreSQL. This application allows users to create, edit, and manage workflow automations through an intuitive drag-and-drop interface.

## Features

### 🔐 Authentication
- Email/password authentication using NextAuth.js
- Secure session management
- Protected routes and API endpoints

### 📊 Dashboard
- Overview of workflow statistics
- Recent workflows display
- Quick action buttons for common tasks

### 🎨 Visual Workflow Builder
- Drag-and-drop interface using ReactFlow
- Custom node types:
  - **Start**: Entry point of workflows
  - **Condition**: Evaluate conditions and route accordingly
  - **Delay**: Add time delays to workflows
  - **Webhook**: Make HTTP requests to external services
  - **Logger**: Log information for debugging
  - **End**: Mark the end of workflows
- Real-time workflow editing and saving

### 📋 Workflow Management
- List all workflows with search functionality
- Create, edit, and delete workflows
- View workflow details and statistics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Workflow Engine**: ReactFlow
- **Deployment**: Docker & Docker Compose

## Prerequisites

- Node.js 18+ 
- Docker and Docker Compose
- PostgreSQL (if running locally)

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workflow-builder
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Open http://localhost:3000
   - Use the test account:
     - Email: `test@example.com`
     - Password: `test123`

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Set up the database**
   ```bash
   # Start PostgreSQL (if not using Docker)
   # Update DATABASE_URL in .env
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # Seed the database (optional)
   npx prisma db seed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open http://localhost:3000
   - Create an account or use the test account

## Environment Variables

Create a `.env` file based on `env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/workflow_builder"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Schema

The application uses the following main entities:

- **User**: Authentication and user management
- **Workflow**: Workflow definitions and metadata
- **Node**: Individual workflow nodes with positions and data
- **Edge**: Connections between nodes

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

### Workflows
- `GET /api/workflows` - List user workflows
- `POST /api/workflows` - Create new workflow
- `GET /api/workflows/[id]` - Get workflow details
- `PUT /api/workflows/[id]` - Update workflow
- `DELETE /api/workflows/[id]` - Delete workflow

### Dashboard
- `GET /api/dashboard` - Get user statistics and recent workflows

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── workflows/         # Workflow pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── nodes/            # Custom ReactFlow nodes
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── docker-compose.yml    # Docker configuration
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio
- `npx prisma db seed` - Seed database

## Deployment

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Database: localhost:5432

### Production Considerations

- Update environment variables for production
- Use a proper PostgreSQL instance
- Set up proper SSL certificates
- Configure proper logging and monitoring
- Set up CI/CD pipelines

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
