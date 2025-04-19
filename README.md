# Videos Service API Documentation

This documentation provides details about the Videos Service API endpoints and how to interact with them.

## Base URL
```
http://your-server-url/api/videos
```

## Endpoints

### 1. Add Video
Adds a new video to the system.

**Endpoint:** `/addvideo`  
**Method:** `POST`  
**Content-Type:** `application/json`

#### Request Body
```json
{
    "playbackId": "string",
    "viewMode": "string",
    "amount": "number",
    "assetName": "string",
    "creatorId": "string",
    "donation": "array"
}
```

#### Response
- **Success (200)**
```json
{
    "message": "Video added successfully",
    "video": {
        "playbackId": "string",
        "viewMode": "string",
        "amount": "number",
        "assetName": "string",
        "creatorId": "string",
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
Checks if a user has paid for a specific video.

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
Adds a user to the list of paying users for a video.

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
Removes a user from the list of paying users for a video.

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

### 5. Get Video
Retrieves video details by playback ID.

**Endpoint:** `/getvideo`  
**Method:** `GET`  
**Query Parameters:**
- `playbackId`: string

#### Response
- **Success (200)**
```json
{
    "message": "Video found",
    "video": {
        "playbackId": "string",
        "viewMode": "string",
        "amount": "number",
        "assetName": "string",
        "creatorId": "string",
        "donation": [],
        "Users": []
    }
}
```
- **Error (400)**
```json
{
    "error": "Video not found"
}
```

### 6. Delete Video
Deletes a video from the system.

**Endpoint:** `/deletevideo`  
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
    "message": "Video deleted successfully",
    "video": {
        // Deleted video details
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

### Adding a Video
```javascript
fetch('http://your-server-url/api/videos/addvideo', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        playbackId: "video123",
        viewMode: "paid",
        amount: 10.99,
        assetName: "My Video",
        creatorId: "user123",
        donation: []
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Getting a Video
```javascript
fetch('http://your-server-url/api/videos/getvideo?playbackId=video123')
    .then(response => response.json())
    .then(data => console.log(data));
```

## Notes
- All endpoints require proper authentication (not shown in documentation)
- The `playbackId` is a unique identifier for each video
- The `viewMode` can be either "free" or "paid"
- The `amount` field is only relevant for paid videos
- The `Users` array contains IDs of users who have paid for the video
- The `donation` array stores donation amounts for the video
- The `assetName` field is used to identify the video content 