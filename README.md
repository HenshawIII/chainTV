# User Settings API Documentation

This documentation provides details about the User Settings API endpoints and how to interact with them.

## Base URL
```
http://your-server-url/api/user
```

## Endpoints

### 1. Add User Settings
Adds new settings for a user/creator.

**Endpoint:** `/addsetting`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "creatorId": "string",
    "logo": "string",
    "title": "string",
    "description": "string",
    "bgcolor": "string",
    "color": "string",
    "fontSize": "string",
    "fontFamily": "string"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Setting added successfully"
}
```
- **Error (400)**
```json
{
    "error": "User already exists"
}
```
- **Error (500)**
```json
{
    "error": "Server error message"
}
```

### 2. Get User Settings
Retrieves settings for a specific user/creator.

**Endpoint:** `/getsetting/:creatorId`  
**Method:** `GET`  
**URL Parameters:**
- `creatorId`: string (in URL path)

#### Response
- **Success (200)**
```json
{
    "setting": {
        "creatorId": "string",
        "logo": "string",
        "title": "string",
        "description": "string",
        "bgcolor": "string",
        "color": "string",
        "fontSize": "string",
        "fontFamily": "string"
    }
}
```
- **Error (404)**
```json
{
    "error": "Setting not found"
}
```
- **Error (500)**
```json
{
    "error": "Server error message"
}
```

### 3. Update User Settings
Updates existing settings for a user/creator.

**Endpoint:** `/updatesetting/:creatorId`  
**Method:** `PUT`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "creatorId": "string",
    "logo": "string",
    "title": "string",
    "description": "string",
    "bgcolor": "string",
    "color": "string",
    "fontSize": "string",
    "fontFamily": "string"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Setting updated successfully"
}
```
- **Error (400)**
```json
{
    "error": "Error message"
}
```
- **Error (500)**
```json
{
    "error": "Server error message"
}
```

## Example Usage

### Adding User Settings
```javascript
fetch('http://your-server-url/api/user/addsetting', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        creatorId: "user123",
        logo: "https://example.com/logo.png",
        title: "My Channel",
        description: "Welcome to my channel",
        bgcolor: "#ffffff",
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Arial"
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Getting User Settings
```javascript
fetch('http://your-server-url/api/user/getsetting/user123')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Updating User Settings
```javascript
fetch('http://your-server-url/api/user/updatesetting/user123', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        creatorId: "user123",
        logo: "https://example.com/new-logo.png",
        title: "Updated Channel Title",
        description: "Updated channel description",
        bgcolor: "#f0f0f0",
        color: "#333333",
        fontSize: "18px",
        fontFamily: "Roboto"
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Notes
- The `creatorId` is required for all operations and must be unique
- All color values should be in valid CSS color format (hex, rgb, or named colors)
- Font size should be in valid CSS size units (px, em, rem, etc.)
- Font family should be a valid CSS font family name
- Settings are specific to each creator and cannot be shared between creators 