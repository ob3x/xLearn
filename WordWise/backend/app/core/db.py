from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DB_URL = "postgresql://postgres:password@localhost:5432/wordwise"

engine = create_engine(DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_base():
    Base.metadata.create_all(bind=engine)