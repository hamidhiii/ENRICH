from pydantic import BaseModel, EmailStr

class TestModel(BaseModel):
    email: EmailStr

try:
    m = TestModel(email="test@example.com")
    print("Pydantic email validation is working correctly.")
except ImportError as e:
    print(f"ImportError: {e}")
except Exception as e:
    print(f"An error occurred: {e}")
