from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from db import get_db
from models import Users
from schems import UserCreate, Token

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
o2auth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")


SECRET_KEY = "super_secret_key"
ALGORITHM = "HS256"

@router.post("/register")
async def register_user(user : UserCreate, db : Session = Depends(get_db)):
    try:
        new_user = Users(
            username = user.username, 
            email = user.email, 
            hashed_password = bcrypt_context.hash(user.password))

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"user" : new_user}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.post("/token", response_model=Token)
async def login_user(form_data : OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=401, detail="Error, couldnt validate user")
    
    token = create_token(user.id, user.username, timedelta(minutes=30))

    return {"access_token" : token, "token_type" : "Bearer"}

async def get_current_user(token : str = Depends(o2auth_bearer), db : Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user_id = payload.get("id")

        if not user_id or not username:
            raise HTTPException(status_code=401, detail="Invalid authentication token")

        user = db.query(Users).filter(Users.id == user_id).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Error, could not validate user")


def authenticate_user(username : str, password : str, db):
    user = db.query(Users).filter(Users.username == username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Error, user not found")
    if not bcrypt_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Error, wrong password")
    
    return user

def create_token(user_id : int, username : str, token_expire : timedelta):
    encode = {"sub" : username, "id" : user_id}
    expire = datetime.utcnow() + token_expire
    encode.update({"exp" : expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
