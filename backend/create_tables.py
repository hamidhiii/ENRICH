from app.database import engine, Base
from app.models import PageSection

print("Creating PageSection table...")
Base.metadata.create_all(bind=engine, tables=[PageSection.__table__])
print("Done!")
