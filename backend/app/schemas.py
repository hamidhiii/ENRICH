from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.models import UserRole, ProductForm


# ============= User Schemas =============
class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
    role: UserRole = UserRole.VIEWER


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ============= Category Schemas =============
class CategoryBase(BaseModel):
    name_ru: str
    name_uz: str
    name_en: Optional[str] = None
    slug: str
    description_ru: Optional[str] = None
    description_uz: Optional[str] = None
    description_en: Optional[str] = None
    icon: Optional[str] = None
    order: int = 0
    is_active: bool = True


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name_ru: Optional[str] = None
    name_uz: Optional[str] = None
    name_en: Optional[str] = None
    slug: Optional[str] = None
    description_ru: Optional[str] = None
    description_uz: Optional[str] = None
    description_en: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Product Schemas =============
class ProductBase(BaseModel):
    category_id: int
    name_ru: str
    name_uz: str
    name_en: Optional[str] = None
    slug: Optional[str] = None
    form: ProductForm
    instructions_ru: Optional[str] = None
    instructions_uz: Optional[str] = None
    instructions_en: Optional[str] = None
    composition_ru: Optional[str] = None
    composition_uz: Optional[str] = None
    composition_en: Optional[str] = None
    storage_conditions_ru: Optional[str] = None
    storage_conditions_uz: Optional[str] = None
    storage_conditions_en: Optional[str] = None
    side_effects_ru: Optional[str] = None
    side_effects_uz: Optional[str] = None
    side_effects_en: Optional[str] = None
    image: Optional[str] = None
    pdf_file: Optional[str] = None
    is_active: bool = True
    featured: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    category_id: Optional[int] = None
    name_ru: Optional[str] = None
    name_uz: Optional[str] = None
    name_en: Optional[str] = None
    slug: Optional[str] = None
    form: Optional[ProductForm] = None
    instructions_ru: Optional[str] = None
    instructions_uz: Optional[str] = None
    instructions_en: Optional[str] = None
    composition_ru: Optional[str] = None
    composition_uz: Optional[str] = None
    composition_en: Optional[str] = None
    storage_conditions_ru: Optional[str] = None
    storage_conditions_uz: Optional[str] = None
    storage_conditions_en: Optional[str] = None
    side_effects_ru: Optional[str] = None
    side_effects_uz: Optional[str] = None
    side_effects_en: Optional[str] = None
    image: Optional[str] = None
    pdf_file: Optional[str] = None
    is_active: Optional[bool] = None
    featured: Optional[bool] = None


class ProductResponse(ProductBase):
    id: int
    slug: Optional[str] = None
    created_at: datetime
    category: CategoryResponse

    class Config:
        from_attributes = True


# ============= News Schemas =============
class NewsBase(BaseModel):
    title_ru: str
    title_uz: str
    title_en: Optional[str] = None
    slug: str
    excerpt_ru: Optional[str] = None
    excerpt_uz: Optional[str] = None
    excerpt_en: Optional[str] = None
    content_ru: str
    content_uz: str
    content_en: Optional[str] = None
    image: Optional[str] = None
    published_date: Optional[datetime] = None
    is_published: bool = False


class NewsCreate(NewsBase):
    pass


class NewsUpdate(BaseModel):
    title_ru: Optional[str] = None
    title_uz: Optional[str] = None
    title_en: Optional[str] = None
    slug: Optional[str] = None
    excerpt_ru: Optional[str] = None
    excerpt_uz: Optional[str] = None
    excerpt_en: Optional[str] = None
    content_ru: Optional[str] = None
    content_uz: Optional[str] = None
    content_en: Optional[str] = None
    image: Optional[str] = None
    published_date: Optional[datetime] = None
    is_published: Optional[bool] = None


class NewsResponse(NewsBase):
    id: int
    views: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Certificate Schemas =============
class CertificateBase(BaseModel):
    name_ru: str
    name_uz: str
    name_en: Optional[str] = None
    description_ru: Optional[str] = None
    description_uz: Optional[str] = None
    description_en: Optional[str] = None
    certificate_type: Optional[str] = None
    image: Optional[str] = None
    pdf_file: Optional[str] = None
    issue_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    is_active: bool = True
    order: int = 0


class CertificateCreate(CertificateBase):
    pass


class CertificateUpdate(BaseModel):
    name_ru: Optional[str] = None
    name_uz: Optional[str] = None
    name_en: Optional[str] = None
    description_ru: Optional[str] = None
    description_uz: Optional[str] = None
    description_en: Optional[str] = None
    certificate_type: Optional[str] = None
    image: Optional[str] = None
    pdf_file: Optional[str] = None
    issue_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    is_active: Optional[bool] = None
    order: Optional[int] = None


class CertificateResponse(CertificateBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Career Schemas =============
class CareerBase(BaseModel):
    title_ru: str
    title_uz: str
    title_en: Optional[str] = None
    description_ru: str
    description_uz: str
    description_en: Optional[str] = None
    requirements_ru: Optional[str] = None
    requirements_uz: Optional[str] = None
    requirements_en: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    salary_range: Optional[str] = None
    is_active: bool = True
    deadline: Optional[datetime] = None


class CareerCreate(CareerBase):
    pass


class CareerUpdate(BaseModel):
    title_ru: Optional[str] = None
    title_uz: Optional[str] = None
    title_en: Optional[str] = None
    description_ru: Optional[str] = None
    description_uz: Optional[str] = None
    description_en: Optional[str] = None
    requirements_ru: Optional[str] = None
    requirements_uz: Optional[str] = None
    requirements_en: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[str] = None
    salary_range: Optional[str] = None
    is_active: Optional[bool] = None
    deadline: Optional[datetime] = None


class CareerResponse(CareerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Job Application Schemas =============
class JobApplicationBase(BaseModel):
    career_id: int
    full_name: str
    email: EmailStr
    phone: str
    resume_file: Optional[str] = None
    cover_letter: Optional[str] = None


class JobApplicationCreate(JobApplicationBase):
    pass


class JobApplicationUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class JobApplicationResponse(JobApplicationBase):
    id: int
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Partner Schemas =============
class PartnerBase(BaseModel):
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    country: Optional[str] = None
    city: Optional[str] = None
    address: Optional[str] = None
    message: Optional[str] = None


class PartnerCreate(PartnerBase):
    pass


class PartnerUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class PartnerResponse(PartnerBase):
    id: int
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


# ============= Contact Message Schemas =============
class ContactMessageBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class SiteSettingsBase(BaseModel):
    site_name_ru: Optional[str] = None
    site_name_uz: Optional[str] = None
    site_name_en: Optional[str] = None
    logo: Optional[str] = None
    favicon: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address_ru: Optional[str] = None
    address_uz: Optional[str] = None
    address_en: Optional[str] = None
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    telegram_url: Optional[str] = None
    meta_title_ru: Optional[str] = None
    meta_title_uz: Optional[str] = None
    meta_title_en: Optional[str] = None
    meta_description_ru: Optional[str] = None
    meta_description_uz: Optional[str] = None
    meta_description_en: Optional[str] = None
    google_maps_embed: Optional[str] = None
    google_analytics_id: Optional[str] = None


class ContactMessageUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class ContactMessageResponse(ContactMessageBase):
    id: int
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class SiteSettingsUpdate(SiteSettingsBase):
    pass


class SiteSettingsResponse(SiteSettingsBase):
    id: int

    class Config:
        from_attributes = True


# ============= Page Section Schemas =============
class PageSectionBase(BaseModel):
    page_path: str
    section_key: str
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    subtitle_uz: Optional[str] = None
    subtitle_ru: Optional[str] = None
    subtitle_en: Optional[str] = None
    content_uz: Optional[str] = None
    content_ru: Optional[str] = None
    content_en: Optional[str] = None
    image: Optional[str] = None
    background_image: Optional[str] = None
    video_url: Optional[str] = None
    button_text_uz: Optional[str] = None
    button_text_ru: Optional[str] = None
    button_text_en: Optional[str] = None
    button_link: Optional[str] = None
    order: int = 0
    is_active: bool = True


class PageSectionCreate(PageSectionBase):
    pass


class PageSectionUpdate(BaseModel):
    page_path: Optional[str] = None
    section_key: Optional[str] = None
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    subtitle_uz: Optional[str] = None
    subtitle_ru: Optional[str] = None
    subtitle_en: Optional[str] = None
    content_uz: Optional[str] = None
    content_ru: Optional[str] = None
    content_en: Optional[str] = None
    image: Optional[str] = None
    background_image: Optional[str] = None
    video_url: Optional[str] = None
    button_text_uz: Optional[str] = None
    button_text_ru: Optional[str] = None
    button_text_en: Optional[str] = None
    button_link: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class PageSectionResponse(PageSectionBase):
    id: int
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
