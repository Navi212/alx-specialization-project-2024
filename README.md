# ALX Blog Portfolio Project for specialization

## Documentation for the API endpoints for server\routes\admin.js
+ POST /admin
Description: Authenticates a user and generates a JWT token. Request Body: username: User's username. password: User's password. Response: 200 OK: Successful authentication. 401 Unauthorized: Invalid username or password. Response Body: JSON object with a message indicating success or failure. Headers: Content-Type: application/json Cookies: token: JWT token for authentication.

+ GET /logout
Description: Logs out the authenticated user by clearing the JWT token. Response: 302 Found: Redirect to the home page. Cookies: Clears the token cookie.

+ User Management:
POST /register
Description: Registers a new user. Request Body: username: New user's username. password: New user's password. Response: 201 Created: User successfully created. 400 Bad Request: Username already in use. 500 Internal Server Error: Server-side error occurred. Response Body: JSON object with a message indicating success or failure. Headers: Content-Type: application/json

+ Post Management:
GET /dashboard
Description: Retrieves all posts for the admin dashboard. Authentication: Requires a valid JWT token. Response: 200 OK: Successful operation. Response Body: HTML rendered view containing the admin dashboard. Headers: Content-Type: text/html

+ GET /add-post
Description: Renders the form to add a new post. Authentication: Requires a valid JWT token. Response: 200 OK: Successful operation. Response Body: HTML rendered view containing the add post form. Headers: Content-Type: text/html

+ POST /add-post
Description: Creates a new post. Authentication: Requires a valid JWT token. Request Body: title: Title of the new post. body: Content/body of the new post. Response: 302 Found: Redirect to the dashboard upon successful post creation. Headers: Content-Type: application/x-www-form-urlencoded

+ GET /edit-post/:id
Description: Renders the form to edit a specific post. Authentication: Requires a valid JWT token. Path Parameters: id: ID of the post to edit. Response: 200 OK: Successful operation. Response Body: HTML rendered view containing the edit post form. Headers: Content-Type: text/html

+ PUT /edit-post/:id
Description: Updates a specific post. Authentication: Requires a valid JWT token. Path Parameters: id: ID of the post to update. Request Body: title: New title of the post. body: New content/body of the post. Response: 302 Found: Redirect to the edit post page upon successful update. Headers: Content-Type: application/x-www-form-urlencoded

+ DELETE /delete-post/:id
Description: Deletes a specific post. Authentication: Requires a valid JWT token. Path Parameters: id: ID of the post to delete. Response: 302 Found: Redirect to the dashboard upon successful deletion.

### Documentation for the API endpoints for \app.js
+ Authentication:
POST /admin
Description: Authenticates a user and generates a JWT token for authorization. Request Body: username: User's username. password: User's password. Response: 200 OK: Successful authentication. Redirects to the dashboard. 401 Unauthorized: Invalid username or password.

+ POST /register
Description: Registers a new user. Request Body: username: User's desired username. password: User's desired password. Response: 201 Created: User created successfully. 400 Bad Request: Username already in use. 500 Internal Server Error: Server error. GET /logout Description: Logs out the currently authenticated user. Response: 200 OK: Logout successful. Redirects to the home page.

+ Dashboard:
GET /dashboard
Description: Fetches all posts for the authenticated user. Authorization: Requires a valid JWT token. Response: 200 OK: Returns dashboard page with post data.

+ GET /add-post
Description: Renders the page to add a new post. Authorization: Requires a valid JWT token. Response: 200 OK: Renders the add post page.

+ POST /add-post
Description: Creates a new post. Authorization: Requires a valid JWT token. Request Body: title: Title of the post. body: Body content of the post. Response: 200 OK: Post created successfully. Redirects to the dashboard.

+ GET /edit-post/:id
Description: Renders the page to edit a post. Authorization: Requires a valid JWT token. Response: 200 OK: Renders the edit post page with post data.

+ PUT /edit-post/:id
Description: Updates an existing post. Authorization: Requires a valid JWT token. Request Body: title: Updated title of the post. body: Updated body content of the post. Response: 200 OK: Post updated successfully. Redirects to the edit post page.

+ DELETE /delete-post/:id
Description: Deletes a post. Authorization: Requires a valid JWT token. Response: 200 OK: Post deleted successfully. Redirects to the dashboard.

+ AUTHORS
NWEKE Joseph Josephchristo615@gmail.com
DIMKPA Ikenna ikennadimkpa@gmail.com