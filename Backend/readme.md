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

## Notes

*   Ensure that you handle different user types appropriately in your application logic.
*   Implement proper password hashing and salting for security.
*   Consider adding email verification to ensure the validity of the provided email address.
