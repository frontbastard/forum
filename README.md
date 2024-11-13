# Forum Service

## Description
This project was made specifically for the course `CS50's Web Programming with Python and JavaScript` on `edX HarvardX CS50W` and is the final project for obtaining a certificate of completion. It took me about 30 hours to complete it.

## Distinctiveness and Complexity
This project really differs from all the previous ones in terms of technology, and here's why:

- Django Rest Framework: instead of the built-in templates that are present in Django by default, this project used the Django Rest Framework, and serialisers were used to interact with the client side;
- React + Vite: unlike previous projects where we used vanilla Javascript, I decided to try working with React + Vite, because it was mentioned in the course and I was interested in it. Here, I created a UserProvider to manage the user's state and also used MUI to make the project look more beautiful;
- CORS: to combine the server and client side, we set up CORS, unlike previous projects where we did not do this. On the client, the settings were made in the vite.config.js file, where the proxy for the server api was configured, and on the server, the settings were made in the settings.py file for such variables as ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, CSRF_TRUSTED_ORIGINS, etc;
- SimpleJWT: instead of using built-in session authentication, I decided to use the SimpleJWT module and authenticate with JWT tokens. Also, interceptors for request and response were configured on the React side. The request interceptor adds the Authorization header with the token's Bearer value to each request, and the response interceptor checks if the token is still valid and, if not, triggers the function to remove the access token from localstorage.

In summary, this project was indeed much more complex than the previous ones, as it required the development and integration of a number of new technologies and approaches. Moving from a monolithic Django architecture to a distributed system with REST APIs, using React instead of vanilla JavaScript, implementing JWT authentication and setting up CORS - all this created a complex technology stack that required a deeper understanding of the interaction between the frontend and backend. 

## What’s contained in each file
According to the reqs, all the files I created or modified will be described below:

### forum_service/
- `/settings.py`: Defined the settings for the correct operation of CORS, also defined AUTH_USER_MODEL, REST_FRAMEWORK, SIMPLE_JWT and SPECTACULAR_SETTINGS;
- `/urls.py`: In addition to the urls for the `/forum` and `/users` applications, we added the urls for downloading the `/schema` documentation and its visual representation `/schema/swagger-ui`

### forum/
- `/admin.py`: Registered Category, Topic, Post and PostLike in the admin panel;
- `/models.py`: Contains database models for the application. Includes Category, Topic, Post and PostLike models;
- `/permissions.py`: Сreated the IsAuthorOrStaffOrReadOnly permission to control such views as TopicViewSet and PostViewSet, and IsStaffOrReadOnly for the CategoryViewSet view;
- `/serializers.py`: Contains serializer classes PostSerializer, PostListSerializer, TopicSerializer, TopicDetailSerializer, TopicsForCategorySerializer for converting complex data types, such as querysets and model instances, into Python data types that can then be converted to JSON format;
- `/urls.py`: Defines URL patterns for viewsets CategoryViewSet, TopicViewSet, PostViewSet;
- `/views.py`: Handles the forum's logic. Contains classes CategoryViewSet, TopicViewSet, PostViewSet for rendering pages, processing form submissions, and managing API endpoints. For PostViewSet, an action `like` is additionally defined.

### users/
- `/admin.py`: Registered User in the admin panel. It also takes into account the change of the authorization field from `username` to `email`;
- `/models.py`: Custom UserManager and User models are defined mainly to change the authentication field from `username` to `email`, but the user also creates the proprietary `topics_count` and `posts_count` for the total count of models created by the user;
- `/serializers.py`: Contains serializer classes UserSerializer, UserRegistrationSerializer, TopicSimpleSerializer, PostSimpleSerializer, UserProfileSerializer and AuthTokenSerializer for converting complex data types, such as querysets and model instances, into Python data types that can then be converted to JSON format;
- `/urls.py`: Defines URL patterns `token/` for `CustomTokenObtainPairView`, `token/refresh/` for `CustomTokenRefreshView`, `token/verify/` for `LogoutView`, `register/` for `CreateUserView` and `me/` for `ManageUserProfileView`.
- `/views.py`: Handles the user's logic. Contains classes CreateUserView which returns tokens and user data, LoginUserView, LogoutView which removes a refresh_token from cookies, ManageUserProfileView, CustomTokenObtainPairView for setting refresh_token to cookies, CustomTokenRefreshView for updating refresh_token in the cookies if it's expired.

### frontend/
- `/src/components/CategoriesListComponent.jsx`: Component for listing categories;
- `/src/components/FooterComponent.jsx`: Component for displaying the footer;
- `/src/components/HeaderComponent.jsx`: Component for displaying the header;
- `/src/components/ItemDetailsComponent.jsx`: Component for displaying detailed Topic or Post. Since they have the same structure, it was decided to make one component for both;
- `/src/components/LikesComponent.jsx`: Component for displaying likes;
- `/src/components/SimpleListComponent.jsx`: Component for listing simple items like posts or topics in the form of links;
- `/src/components/TopicListComponent.jsx`: Component for listing topics (under each category);
- `/src/constants/api.jsx`: Constants of the project, contains API_BASE for not duplicate it throughout the project;
- `/src/interceptors/api.jsx`: Contains the custom Axios instance `api` which sends an Authorization header with a Bearer token with each request, and updates the access token with each response if the response status is 401. It also has auxiliary functions for working with tokens and redirecting to the login page;
- `/src/pages/CategoryCreate.jsx`: Page for creating categories;
- `/src/pages/Home.jsx`: The homepage which displays all categories and topics;
- `/src/pages/Login.jsx`: Login page;
- `/src/pages/Logout.jsx`: Logout page;
- `/src/pages/Profile.jsx`: Profile page which contains personal information about a registered user and lists his topics and posts;
- `/src/pages/Register.jsx`: Register page;
- `/src/pages/Topic.jsx`: Page contains code for displaying topic details include all posts;
- `/src/pages/TopicCreate.jsx`: Page for creating a topic;
- `/src/providers/UserContext.jsx`: Contains UserProvider and a function for updating it;
- `/src/styles/main.scss`: Contains all styles;
- `/src/utils/errorHandler.js`: Contains a function for joining all error values into a string with callback which setting the errors;
- `/src/App.jsx`: Defined basic structure, providers and routers.

### .flake8
Configuration for coding according to pep8.

### .gitignore
Everything that shouldn't be in the git repository.

### forum_fixtures.json
Demo data for the database according to the project models.

### README.md
Description of the project.

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
