
from extensions import socketio
from flask import Blueprint, request, jsonify
from models.models import Task
from extensions import db

task = Blueprint('task', __name__)

@task.route('/add_task', methods=['POST'])
def add_task():

    data = request.json

    new_task = Task(
        title=data['title'],
        description=data['description'],
        priority=data['priority'],
        status=data['status']
    )

    db.session.add(new_task)
    db.session.commit()
    socketio.emit('new_task', {
    'title': data['title']
})

    return jsonify({
        "message": "Task added successfully"
    })
@task.route('/get_tasks', methods=['GET'])
def get_tasks():

    tasks = Task.query.all()

    output = []

    for t in tasks:

        task_data = {
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "priority": t.priority,
            "status": t.status,
            "created_date": t.created_date
        }

        output.append(task_data)

    return jsonify(output)
@task.route('/update_task/<int:id>', methods=['PUT'])
def update_task(id):

    task_item = Task.query.get(id)

    if not task_item:
        return jsonify({
            "message": "Task not found"
        }), 404

    data = request.json

    task_item.title = data['title']
    task_item.description = data['description']
    task_item.priority = data['priority']
    task_item.status = data['status']

    db.session.commit()

    return jsonify({
        "message": "Task updated successfully"
    })
@task.route('/delete_task/<int:id>', methods=['DELETE'])
def delete_task(id):

    task_item = Task.query.get(id)

    if not task_item:
        return jsonify({
            "message": "Task not found"
        }), 404

    db.session.delete(task_item)

    db.session.commit()

    return jsonify({
        "message": "Task deleted successfully"
    })
    
    