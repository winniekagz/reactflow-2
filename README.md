# Workflow Builder

A visual workflow builder with drag-and-drop interface built using Next.js, ReactFlow, and PostgreSQL.

## 🚀 Features

- **Authentication** - NextAuth.js with email/password
- **Visual Editor** - Drag-and-drop workflow builder with ReactFlow
- **Custom Nodes** - Start, Condition, Delay, Webhook, Logger, End
- **Dashboard** - Workflow statistics and management
- **Real-time Editing** - Live workflow updates and saving

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Prisma ORM
- **Auth**: NextAuth.js
- **Workflow**: ReactFlow
- **DevOps**: Docker, GitHub Actions

## 🏃‍♂️ Quick Start

### Docker 
```bash
git clone https://github.com/winniekagz/reactflow-2.git
cd reactflow-2
cp env.example .env
docker-compose up --build
```

Visit http://localhost:3000

**Test Account:**
- Email: `test@example.com`
- Password: `test123`

### Local Development
```bash
npm install
cp env.example .env
npx prisma generate
npx prisma db push
npm run dev
```

## 📁 Project Structure

```
├── app/                 # Next.js pages & API routes
├── components/          # React components
│   ├── nodes/          # Custom ReactFlow nodes
│   └── ui/             # shadcn/ui components
├── lib/                # Utilities & configs
├── prisma/             # Database schema
└── docker-compose.yml  # Docker setup
```

## 🗄️ Database Schema

- **User** - Authentication & user data
- **Workflow** - Workflow metadata
- **Node** - Individual workflow nodes
- **Edge** - Node connections

## 🔧 Environment Variables

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/workflow_builder"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🚦 CI/CD Pipeline

GitHub Actions pipeline with:
- Linting & TypeScript validation
- Build verification  
- Docker image publishing
- Automated PR checks

## 📝 API Endpoints

- `GET/POST /api/workflows` - CRUD operations
- `GET /api/dashboard` - User statistics
- `/api/auth/*` - Authentication

## 🏗️ Built With

This project demonstrates:
- Modern React patterns with TypeScript
- Form validation with React Hook Form + Zod
- Full-stack Next.js development
- Database design with Prisma
- Docker containerization
- CI/CD with GitHub Actions
- Visual workflow editing with ReactFlow
