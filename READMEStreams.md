# Streams Service API Documentation

This documentation provides details about the Streams Service API endpoints and how to interact with them.

## Base URL
```
http://your-server-url/api/streams
```

## Endpoints

### 1. Add Stream
Adds a new stream to the system.

**Endpoint:** `/addstream`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "playbackId": "string",
    "viewMode": "string",
    "description": "string",
    "amount": "number",
    "streamName": "string",
    "creatorId": "string",
    "logo": "string",
    "title": "string",
    "bgcolor": "string",
    "color": "string",
    "fontSize": "string",
    "fontFamily": "string",
    "donation": "array"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Stream added successfully",
    "stream": {
        "playbackId": "string",
        "viewMode": "string",
        "description": "string",
        "amount": "number",
        "streamName": "string",
        "creatorId": "string",
        "logo": "string",
        "title": "string",
        "bgcolor": "string",
        "color": "string",
        "fontSize": "string",
        "fontFamily": "string",
        "donation": [],
        "Users": []
    }
}
```
- **Error (400)**
```json
{
    "error": "Error message"
}
```

### 2. Find Paying User
Checks if a user has paid for a specific stream.

**Endpoint:** `/findpayinguser`  
**Method:** `GET`  
**Query Parameters:**
- `playbackId`: string
- `userId`: string

#### Response
- **Success (200)**
```json
{
    "message": "User found",
    "user": {
        // User details
    }
}
```
- **Error (400)**
```json
{
    "error": "User not found"
}
```

### 3. Add Paying User
Adds a user to the list of paying users for a stream.

**Endpoint:** `/addpayinguser`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "playbackId": "string",
    "userId": "string"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "User added successfully",
    "user": {
        // User details
    }
}
```
- **Error (400)**
```json
{
    "error": "Error message"
}
```

### 4. Delete Paying User
Removes a user from the list of paying users for a stream.

**Endpoint:** `/deletepayinguser`  
**Method:** `DELETE`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "playbackId": "string",
    "userId": "string"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "User deleted successfully",
    "user": {
        // User details
    }
}
```
- **Error (400)**
```json
{
    "error": "User not found"
}
```

### 5. Get Stream
Retrieves stream details by playback ID.

**Endpoint:** `/getstream`  
**Method:** `GET`  
**Query Parameters:**
- `playbackId`: string

#### Response
- **Success (200)**
```json
{
    "message": "Stream found",
    "stream": {
        "playbackId": "string",
        "viewMode": "string",
        "description": "string",
        "amount": "number",
        "streamName": "string",
        "creatorId": "string",
        "logo": "string",
        "title": "string",
        "bgcolor": "string",
        "color": "string",
        "fontSize": "string",
        "fontFamily": "string",
        "donation": [],
        "Users": []
    }
}
```
- **Error (400)**
```json
{
    "error": "Stream not found"
}
```

### 6. Delete Stream
Deletes a stream from the system.

**Endpoint:** `/deletestream`  
**Method:** `DELETE`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "playbackId": "string"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Stream deleted successfully",
    "stream": {
        // Deleted stream details
    }
}
```
- **Error (400)**
```json
{
    "error": "Error message"
}
```

## Example Usage

### Adding a Stream
```javascript
fetch('http://your-server-url/api/streams/addstream', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        playbackId: "stream123",
        viewMode: "paid",
        description: "My Stream Description",
        amount: 10.99,
        streamName: "My Stream",
        creatorId: "user123",
        logo: "https://example.com/logo.png",
        title: "Stream Title",
        bgcolor: "#ffffff",
        color: "#000000",
        fontSize: "16px",
        fontFamily: "Arial",
        donation: []
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Getting a Stream
```javascript
fetch('http://your-server-url/api/streams/getstream?playbackId=stream123')
    .then(response => response.json())
    .then(data => console.log(data));
```

## Notes
- All endpoints require proper authentication (not shown in documentation)
- The `playbackId` is a unique identifier for each stream
- The `viewMode` can be either "free" or "paid"
- The `amount` field is only relevant for paid streams
- The `Users` array contains IDs of users who have paid for the stream
- The `donation` array stores donation amounts for the stream
- UI customization fields (logo, title, colors, fonts) are optional but recommended for better user experience 