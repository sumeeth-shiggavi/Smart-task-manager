# Smart Task Management System

A full-stack Smart Task Management System built using Flask, PostgreSQL, REST APIs, Pandas, NumPy, WebSockets, HTML, CSS, and JavaScript.

---

# 🚀 Features

## ✅ Authentication

* User Registration
* User Login
* Password Hashing

## ✅ Task Management (CRUD)

* Add Task
* View Tasks
* Update Task
* Delete Task

## ✅ PostgreSQL Integration

* Stores User Data
* Stores Task Data

## ✅ Analytics Module

Using Pandas & NumPy:

* Total Tasks
* Completed Tasks
* Pending Tasks
* Completion Percentage

## ✅ WebSocket Feature

* Real-time task notifications using Flask-SocketIO

## ✅ Frontend UI

* Responsive dashboard
* Add/Edit/Delete tasks
* Dynamic task display

---

# 🛠️ Technologies Used

* Python
* Flask
* PostgreSQL
* Flask-SQLAlchemy
* Flask-SocketIO
* Pandas
* NumPy
* HTML
* CSS
* JavaScript

---

# 📂 Project Structure

```bash
smart-task-manager/
│
├── app.py
├── config.py
├── create_db.py
├── requirements.txt
├── extensions.py
│
├── templates/
│   └── dashboard.html
│
├── static/
│   ├── style.css
│   └── script.js
│
├── models/
│   └── models.py
│
├── routes/
│   ├── auth.py
│   ├── task.py
│   └── analytics.py
│
└── database/
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-link>
```

---

## 2️⃣ Open Project

```bash
cd smart-task-manager
```

---

## 3️⃣ Create Virtual Environment

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

---

## 4️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🐘 PostgreSQL Setup

## Create Database

Open PostgreSQL and run:

```sql
CREATE DATABASE taskdb;
```

---

## Update Database Configuration

Open `config.py`

```python
class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:YOUR_PASSWORD@localhost/taskdb"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "secretkey"
```

Replace:

```text
YOUR_PASSWORD
```

with your PostgreSQL password.

If your password contains `@`, replace it with `%40`.

Example:

```text
sumee2005
```

becomes:

```text
sumee2005
```

---

# 🗄️ Create Tables

Run:

```bash
python create_db.py
```

---

# ▶️ Run Application

```bash
python app.py
```

Open browser:

```text
http://127.0.0.1:5000
```

---

# 📊 Analytics Example

The analytics API returns:

```json
{
  "completed_tasks": 1,
  "completion_percentage": 50.0,
  "pending_tasks": 1,
  "total_tasks": 2
}
```

---

# 🔌 API Endpoints

| Method | Endpoint      | Description     |
| ------ | ------------- | --------------- |
| POST   | /register     | Register user   |
| POST   | /login        | Login user      |
| POST   | /add_task     | Add new task    |
| GET    | /get_tasks    | Fetch all tasks |
| PUT    | /update_task/ | Update task     |
| DELETE | /delete_task/ | Delete task     |
| GET    | /analytics    | Get analytics   |

---

# 🎥 Demo Features

* Real-time task notifications
* Dynamic task updates
* Full CRUD operations
* Analytics dashboard
* PostgreSQL integration

---

# 👨‍💻 Author

Sumeet Shiggavi

