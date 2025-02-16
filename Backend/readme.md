# /users/register Endpoint Documentation

## Description

This endpoint allows new users to register and create an account. It requires specific user information to be provided in the request body.

## HTTP Method

`POST`

## Request Body

The request body should be in JSON format and contain the following fields:

*   `firstName`: (String) The first name of the user.
*   `lastName`: (String) The last name of the user.
*   `email`: (String) The email address of the user. Must be a valid email format.
*   `password`: (String) The password for the new account.  Should meet minimum complexity requirements (e.g., minimum length).

Example:

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "SecurePassword123",
}
```

## Response Status Codes

*   `201 Created`:  The user account was successfully created.
*   `400 Bad Request`: The request body is invalid or missing required fields.  The response body will contain details about the validation errors.
*   `409 Conflict`: An account with the provided email address already exists.
*   `500 Internal Server Error`: An unexpected error occurred on the server.

## Example Success Response

```json
{
    "message": "User registered successfully",
    "userId": "uniqueUserId123"
}
```

#### /users/login Endpoint Documentation

## Description

This endpoint allows registered users to log in to their accounts. It requires the user's email and password for authentication.

## HTTP Method

`POST`

## Request Body

The request body should be in JSON format and contain the following fields:

*   `email`: (String) The email address of the user. Must be a valid email format.
*   `password`: (String) The password for the user account.

## Example response
```json
{
    "user": {
        "_id": "uniqueUserId123",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
    }
}
```


# /users/profile Endpoint Documentation

## Description

This endpoint retrieves the profile information of the currently authenticated user.

## HTTP Method

`GET`

## Authorization

Requires a valid JWT token in the request header or cookie.

## Response Status Codes

* `200 OK`: Successfully retrieved user profile
* `401 Unauthorized`: Invalid or missing authentication token
* `500 Internal Server Error`: An unexpected error occurred on the server

## Example Success Response

```json
{
    "user": {
        "_id": "uniqueUserId123",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
    }
}
```

# /users/logout Endpoint Documentation

## Description

This endpoint logs out the currently authenticated user by invalidating their JWT token.

## HTTP Method

`GET`

## Authorization

Requires a valid JWT token in the request header or cookie.

## Response Status Codes

* `200 OK`: Successfully logged out
* `401 Unauthorized`: Invalid or missing authentication token
* `500 Internal Server Error`: An unexpected error occurred on the server

## Example Success Response

```json
{
    "message": "Logged out successfully"
}
```


