from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import enum
from .database import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"


class ProductForm(str, enum.Enum):
    TABLET = "tablet"
    SYRUP = "syrup"
    CAPSULE = "capsule"
    INJECTION = "injection"
    OINTMENT = "ointment"
    SPRAY = "spray"
    OTHER = "other"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    role = Column(SQLEnum(UserRole), default=UserRole.VIEWER, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    audit_logs = relationship("AuditLog", back_populates="user")


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name_ru = Column(String(255), nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_en = Column(String(255))
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description_ru = Column(Text)
    description_uz = Column(Text)
    description_en = Column(Text)
    icon = Column(String(255))
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    
    # Multilingual fields
    name_ru = Column(String(255), nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_en = Column(String(255))
    
    slug = Column(String(255), unique=True, index=True)
    
    form = Column(SQLEnum(ProductForm), nullable=False)
    
    instructions_ru = Column(Text)
    instructions_uz = Column(Text)
    instructions_en = Column(Text)
    
    composition_ru = Column(Text)
    composition_uz = Column(Text)
    composition_en = Column(Text)
    
    storage_conditions_ru = Column(Text)
    storage_conditions_uz = Column(Text)
    storage_conditions_en = Column(Text)
    
    side_effects_ru = Column(Text)
    side_effects_uz = Column(Text)
    side_effects_en = Column(Text)
    
    image = Column(String(500))
    pdf_file = Column(String(500))
    
    is_active = Column(Boolean, default=True)
    featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    category = relationship("Category", back_populates="products")


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    
    title_ru = Column(String(500), nullable=False)
    title_uz = Column(String(500), nullable=False)
    title_en = Column(String(500))
    
    slug = Column(String(500), unique=True, index=True, nullable=False)
    
    excerpt_ru = Column(Text)
    excerpt_uz = Column(Text)
    excerpt_en = Column(Text)
    
    content_ru = Column(Text, nullable=False)
    content_uz = Column(Text, nullable=False)
    content_en = Column(Text)
    
    image = Column(String(500))
    published_date = Column(DateTime(timezone=True))
    is_published = Column(Boolean, default=False)
    views = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    
    name_ru = Column(String(255), nullable=False)
    name_uz = Column(String(255), nullable=False)
    name_en = Column(String(255))
    
    description_ru = Column(Text)
    description_uz = Column(Text)
    description_en = Column(Text)
    
    certificate_type = Column(String(100))  # ISO, GMP, Halal, etc.
    image = Column(String(500))
    pdf_file = Column(String(500))
    issue_date = Column(DateTime(timezone=True))
    expiry_date = Column(DateTime(timezone=True))
    
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Career(Base):
    __tablename__ = "careers"

    id = Column(Integer, primary_key=True, index=True)
    
    title_ru = Column(String(255), nullable=False)
    title_uz = Column(String(255), nullable=False)
    title_en = Column(String(255))
    
    description_ru = Column(Text, nullable=False)
    description_uz = Column(Text, nullable=False)
    description_en = Column(Text)
    
    requirements_ru = Column(Text)
    requirements_uz = Column(Text)
    requirements_en = Column(Text)
    
    location = Column(String(255))
    employment_type = Column(String(100))  # Full-time, Part-time, Contract
    salary_range = Column(String(100))
    
    is_active = Column(Boolean, default=True)
    deadline = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    applications = relationship("JobApplication", back_populates="career")


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    career_id = Column(Integer, ForeignKey("careers.id"), nullable=False)
    
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    resume_file = Column(String(500))
    cover_letter = Column(Text)
    
    status = Column(String(50), default="pending")  # pending, reviewed, accepted, rejected
    notes = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    career = relationship("Career", back_populates="applications")


class Partner(Base):
    __tablename__ = "partners"

    id = Column(Integer, primary_key=True, index=True)
    
    company_name = Column(String(255), nullable=False)
    contact_person = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    country = Column(String(100))
    city = Column(String(100))
    address = Column(Text)
    
    message = Column(Text)
    status = Column(String(50), default="pending")  # pending, approved, rejected
    notes = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50))
    subject = Column(String(500))
    message = Column(Text, nullable=False)
    
    status = Column(String(50), default="new")  # new, read, replied, archived
    notes = Column(Text)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    
    filename = Column(String(500), nullable=False)
    original_filename = Column(String(500), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_type = Column(String(100))  # image, pdf, document
    mime_type = Column(String(100))
    file_size = Column(Integer)
    
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SiteSettings(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    
    site_name_ru = Column(String(255))
    site_name_uz = Column(String(255))
    site_name_en = Column(String(255))
    
    logo = Column(String(500))
    favicon = Column(String(500))
    
    email = Column(String(255))
    phone = Column(String(50))
    address_ru = Column(Text)
    address_uz = Column(Text)
    address_en = Column(Text)
    
    facebook_url = Column(String(500))
    instagram_url = Column(String(500))
    youtube_url = Column(String(500))
    linkedin_url = Column(String(500))
    telegram_url = Column(String(500))
    
    meta_title_ru = Column(String(500))
    meta_title_uz = Column(String(500))
    meta_title_en = Column(String(500))
    
    meta_description_ru = Column(Text)
    meta_description_uz = Column(Text)
    meta_description_en = Column(Text)
    
    google_maps_embed = Column(Text)
    google_analytics_id = Column(String(100))
    
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    action = Column(String(100), nullable=False)  # create, update, delete
    entity_type = Column(String(100), nullable=False)  # product, news, user, etc.
    entity_id = Column(Integer)
    changes = Column(Text)  # JSON string of changes
    ip_address = Column(String(50))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="audit_logs")


class PageSection(Base):
    __tablename__ = "page_sections"

    id = Column(Integer, primary_key=True, index=True)
    page_path = Column(String(255), nullable=False)  # e.g., "home", "about"
    section_key = Column(String(255), nullable=False)  # e.g., "hero", "mission"

    # Multilingual fields
    title_uz = Column(String(500))
    title_ru = Column(String(500))
    title_en = Column(String(500))

    subtitle_uz = Column(String(500))
    subtitle_ru = Column(String(500))
    subtitle_en = Column(String(500))

    content_uz = Column(Text)
    content_ru = Column(Text)
    content_en = Column(Text)

    image = Column(String(500))
    background_image = Column(String(500))
    video_url = Column(String(500))

    button_text_uz = Column(String(255))
    button_text_ru = Column(String(255))
    button_text_en = Column(String(255))
    button_link = Column(String(500))

    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
