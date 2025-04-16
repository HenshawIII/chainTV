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
    "creatorId": "string"
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

## Donation API

### Add Donation
Adds a donation to a creator's streams and videos.

**Endpoint:** `/api/addonation`  
**Method:** `PUT`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "creatorId": "string",
    "amount": "number"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Donation added successfully"
}
```
- **Error (400)**
```json
{
    "error": "Error message"
}
```

## Error Handling
All endpoints follow a consistent error handling pattern:
- 200: Success
- 400: Client error (invalid request, not found, etc.)
- 500: Server error

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
        creatorId: "user123"
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Adding a Donation
```javascript
fetch('http://your-server-url/api/addonation', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        creatorId: "user123",
        amount: 50.00
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Notes

- The `playbackId` is a unique identifier for each stream
- The `viewMode` can be either "free" or "monthly" or "onetime"
- The `amount` field is only relevant for paid streams
- The `Users` array contains IDs of users who have paid for the stream
- Donations are added to both streams and videos associated with the creator 