from flask import Flask, render_template
from extensions import db, socketio

from routes.auth import auth
from routes.task import task
from routes.analytics import analytics
app = Flask(__name__)

app.config.from_object('config.Config')

db.init_app(app)
socketio.init_app(app)

from routes.auth import auth

app.register_blueprint(auth)
app.register_blueprint(task)
app.register_blueprint(analytics)

@app.route('/')
def home():
    return render_template('dashboard.html')

if __name__ == "__main__":
   socketio.run(app, debug=True)