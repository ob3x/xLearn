from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from core.db import get_db
from models.model import UserDB
from schemas.users import UserCreate, User, ChangePasswordCreate
from schemas.token import Token
from dotenv import load_dotenv
import os

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

load_dotenv()

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
o2auth_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

SECRET_KEY = os.getenv("SUPER_SECRET_KEY")
ALGORITHM = "HS256"

@router.post("/register")
async def register_account(user : UserCreate, db : Session = Depends(get_db)):
    try:
        new_user = UserDB(username = user.username,
                        email = user.email,
                        hashed_password = bcrypt_context.hash(user.password)
                        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {"Success" : "User created successfully"}
    
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
    except Exception as e:
        return {"Error": str(e)}
    
@router.post("/token", response_model=Token)
async def login_user(form_data : OAuth2PasswordRequestForm = Depends(), db : Session = Depends(get_db)):
    user = AuthenticateUser(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=401, detail="Error, could not validate user")
    
    token = CreateAccessToken(user.id, user.username, timedelta(minutes=30))

    return {"access_token" : token, "token_type" : "Bearer"}


async def get_current_user(db : Session = Depends(get_db), token : str = Depends(o2auth_bearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user_id = payload.get("id")
        if not username or not user_id:
            raise HTTPException(status_code=401, detail="Error, could not validate user")
        
        user = db.query(UserDB).filter(UserDB.id == user_id).first()

        return user
    
    except JWTError:
        raise HTTPException(status_code=401, detail="Error, could not validate user")
    
@router.post("/change-password")
async def change_password(
    ChangePassword: ChangePasswordCreate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not ChangePassword.password or ChangePassword.password != ChangePassword.second_password:
        raise HTTPException(status_code=404, detail="Error, passwords have to be the same")
    
    user = AuthenticateUser(user.username, ChangePassword.current_password, db)

    if not user:
        raise HTTPException(status_code=400, detail="Error, could not validate user")

    

    user.hashed_password = bcrypt_context.hash(ChangePassword.password)

    db.commit()
    db.refresh(user)

    return user
    




@router.get("/profile")
async def get_profile(user : dict = Depends(get_current_user)):
    return {"username" : user.username, "email" : user.email, "id" : user.id}

def is_admin(user: dict = Depends(get_current_user)):
    if not user.is_admin:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to access this resource"
        )
    return True

@router.get("/admin-dashboard")
async def get_admin_dashboard(admin_check: bool = Depends(is_admin)):
    return {"message": "Welcome to the admin dashboard!"}

def AuthenticateUser(username : str, password : str, db):
    user = db.query(UserDB).filter(UserDB.username == username).first()

    if not user:
        raise HTTPException(status_code=404, detail="Error, user not found")
    
    if not bcrypt_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=404, detail="Error, wrong password")
    
    return user

def CreateAccessToken(user_id : int, username : str, token_expire : timedelta):
    encode = {"sub" : username, "id" : user_id}
    expire = datetime.utcnow() + token_expire
    encode.update({"exp" : expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)