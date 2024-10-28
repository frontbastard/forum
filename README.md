# Forum Service

## Description
This project was made specifically for the course `CS50's Web Programming with Python and JavaScript` on `edx HarvardX CS50W` and is the final project for obtaining a certificate of completion. It took me about 30 hours to complete it.

## Distinctiveness and Complexity
The development of the `Forum` turned out to be quite a challenge for me, and since I really like challenging tasks, I implemented it with great enthusiasm. The course taught me how to use Django along with Javascript, and also told me a bit about such technologies as React, Docker, and Tests. I was very inspired by the opportunity to master all these things and decided to implement several of them in this project.

---

## Technologies
- Django: Django Rest Framework was used for the server side;
- React: although I hadn't worked with React before, the implementation was quite easy. For such a small project, I decided not to use Redux, but to use a simple createContext provider. Besides, I had the opportunity to practice with MUI.  `api` interceptor took care of user authentication and token handling;
- Authentication: I implemented a full-fledged authentication using SimpleJWT and linked it to the React client, the refresh token is stored on the backend in an HTTP-only cookie;
- DRF-spectacular

---

## Features

### User Management
- User registration and authentication system
- JWT token-based security
- User profile management

### Forum System
- Create and manage categories, topics and posts
- Different permissions for common user and moderator
- Post like system

---

## Opportunities for improvements
Since what has already been done may be enough to successfully deliver the project, I decided to leave the possibility of expanding and improving the project in the future.

Here are a few points:
- Create two main directories `client` and `server`, ideally splitting the project into a mono repository;
- Dockerize the project;
- Connect Email notifications, connect Celery tasks, connect the ability to store multimedia in a service like S3 MinIO, connect PostgreSQL instead of SQLite3;
- Install `debug_toolbar` and check all requests for optimization. Although I used `select_related`, it is still necessary to check that it takes into account all related fields;
- Clean up the HTML and CSS part of the code, namely, fully implement the MUI;
- Write tests for custom functionality, such as replacing the `username` field with `email` for user authentication, custom routs such as `like`, etc;
- Write good documentation. Although drf_spectacular is connected and used, it still needs more work;
- It might also be worth adding filtering, search functionality and pagination;
- And, of course, expand the functionality of the Forum: add the ability to go to the profile of other participants, add as a friend, connect the WUSIWUG editor, etc.

---

## Installing / Getting started
### Via bash script
```bash
git clone git@github.com:frontbastard/forum.git
cd forum
chmod +x setup.sh
./setup.sh
```

### Manually (alternative)
#### Server
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata forum_fixtures.json
python manage.py runserver
```
Result:
```bash
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
October 28, 2024 - 14:03:59
Django version 5.1.2, using settings 'forum_service.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
#### Client
_from the /forum folder and in another terminal_
```bash
cd frontend
npm i
npm run dev
```
Result:
```bash
  VITE v5.4.9  ready in 1479 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
---

## Getting Access
- Client: http://localhost:5173
- Swagger: http://127.0.0.1:8000/api/v1/schema/swagger-ui/

---

## Links

- **Repository:** [GitHub Repository](https://github.com/frontbastard/forum/)
- **Issue Tracker:** [GitHub Issues](https://github.com/frontbastard/forum/issues/)
