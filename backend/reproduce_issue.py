import requests
import sys

API_URL = "http://localhost:8001"

def login():
    print("Logging in...")
    response = requests.post(f"{API_URL}/api/auth/login", json={
        "username": "admin",
        "password": "admin123"
    })
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        sys.exit(1)
    return response.json()["access_token"]

def create_product(token):
    print("Creating product...")
    headers = {"Authorization": f"Bearer {token}"}
    
    # First get a category
    cat_response = requests.get(f"{API_URL}/api/categories/", headers=headers)
    if cat_response.status_code != 200 or not cat_response.json():
        print("No categories found. Cannot create product.")
        sys.exit(1)
    
    category_id = cat_response.json()[0]["id"]
    print(f"Using category ID: {category_id}")
    
    data = {
        "name_uz": "Test Product",
        "name_ru": "Тестовый продукт",
        "category_id": category_id,
        "form": "tablet",
        "is_active": True
    }
    
    response = requests.post(f"{API_URL}/api/products/", json=data, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    try:
        token = login()
        create_product(token)
    except Exception as e:
        print(f"Error: {e}")
