#!/bin/bash

# Clone the repository
git clone git@github.com:frontbastard/forum.git
cd forum

# Set up the server
echo "Setting up the server..."
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata forum_fixtures.json
python manage.py runserver &

# Set up the client
echo "Setting up the client..."
cd frontend
npm i
npm run dev &
