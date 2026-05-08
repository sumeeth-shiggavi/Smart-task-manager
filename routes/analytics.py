from flask import Blueprint, jsonify
from models.models import Task
import pandas as pd
import numpy as np

analytics = Blueprint('analytics', __name__)

@analytics.route('/analytics', methods=['GET'])
def get_analytics():

    tasks = Task.query.all()

    data = []

    for t in tasks:

        data.append({
            "title": t.title,
            "status": t.status
        })

    df = pd.DataFrame(data)

    total_tasks = len(df)

    completed_tasks = len(df[df['status'] == 'Completed'])

    pending_tasks = total_tasks - completed_tasks

    completion_percentage = 0

    if total_tasks > 0:
        completion_percentage = np.round(
            (completed_tasks / total_tasks) * 100,
            2
        )

    return jsonify({
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "completion_percentage": float(completion_percentage)
    })