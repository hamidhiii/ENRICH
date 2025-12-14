# ENRICH Pharmaceutical Website

A modern pharmaceutical company website with Python FastAPI backend and Next.js frontend.

## 🚀 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL/SQLite** - Database
- **JWT** - Authentication
- **Pydantic** - Data validation

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Axios** - API communication

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- PostgreSQL (optional, can use SQLite for development)

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file (copy from `env.example`):
```bash
copy env.example .env  # Windows
cp env.example .env    # Linux/Mac
```

6. Update `.env` with your settings (database URL, secret key, etc.)

7. Run database migrations and seed data:
```bash
python seed.py
```

8. Start the backend server:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API documentation at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## 🔑 Default Admin Credentials

After running `seed.py`, you can login with:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in production!

## 📁 Project Structure

```
enrich/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── database.py     # Database configuration
│   │   ├── auth.py         # Authentication utilities
│   │   ├── dependencies.py # Dependency injection
│   │   └── routers/        # API route handlers
│   ├── main.py             # FastAPI application
│   ├── seed.py             # Database seeding script
│   └── requirements.txt    # Python dependencies
├── app/                     # Next.js pages
├── components/              # React components
├── lib/                     # Utilities
│   └── api.ts              # API client
└── public/                  # Static files
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get single product
- `POST /api/products` - Create product (Auth required)
- `PUT /api/products/{id}` - Update product (Auth required)
- `DELETE /api/products/{id}` - Delete product (Auth required)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Auth required)
- `PUT /api/categories/{id}` - Update category (Auth required)
- `DELETE /api/categories/{id}` - Delete category (Auth required)

### News
- `GET /api/news` - Get all news
- `GET /api/news/{id}` - Get single news article
- `POST /api/news` - Create news (Auth required)
- `PUT /api/news/{id}` - Update news (Auth required)
- `DELETE /api/news/{id}` - Delete news (Auth required)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (Auth required)

### Upload
- `POST /api/upload/image` - Upload image (Auth required)
- `POST /api/upload/pdf` - Upload PDF (Auth required)

## 🎨 Design System

The website uses the ENRICH brand colors:
- **Primary Green**: `#8BC34A`
- **Secondary Gold**: `#D4AF37`
- **Dark**: `#2C3E50`
- **Accent Orange**: `#FFA726`

## 📝 Features

### Public Website
- ✅ Home page with banner, products, news
- ✅ Products catalog with categories
- ✅ Product detail pages
- ✅ News/Blog section
- ✅ Contact form
- ✅ Multi-language support (RU/UZ/EN)
- ✅ Responsive design

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Product management (CRUD)
- ✅ Category management
- ✅ News management
- ✅ Contact message viewer
- ✅ File upload (images, PDFs)
- ✅ User management
- ✅ Role-based access control

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (Admin, Editor, Viewer)
- CORS configuration
- File upload validation

## 📦 Building for Production

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

Proprietary - ENRICH Pharmaceutical Company

## 📞 Support

For support, email: enrich@mail.com
Phone: +998 98 305-25-35
