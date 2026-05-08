from app import app, db
from models.models import User, Task

with app.app_context():
    db.create_all()

    print("Tables created successfully!")