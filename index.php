<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image-Based RSA Encryption & Decryption</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container {
            margin-top: 30px;
            max-width: 900px;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .card {
            margin-bottom: 20px;
        }
        .card-header {
            background-color: #343a40;
            color: #fff;
        }
        .controls {
            margin-bottom: 20px;
        }
        textarea {
            width: 100%;
            margin-bottom: 10px;
        }
        .result-area {
            display: flex;
            justify-content: space-between;
        }
        .result-area textarea {
            width: 45%;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Image-Based RSA Encryption & Decryption</h1>
        <div class="card">
            <div class="card-header text-center">
                <strong>Step 1: Upload Images to Create a Key</strong>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="image1">Upload 3 Images for Key Generation:</label>
                    <input type="file" class="form-control-file" id="image1" accept="image/*" multiple onchange="handleFiles(event)">
                </div>
                <small class="text-muted">Make sure to upload exactly 3 images to create the encryption key.</small>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header text-center">
                <strong>Step 2: Enter a Message to Encrypt</strong>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="message">Enter Message:</label>
                    <textarea class="form-control" id="message" rows="4" placeholder="Type a message to encrypt..."></textarea>
                </div>
                <button class="btn btn-dark btn-block" onclick="encryptMessage()">Encrypt Message</button>
            </div>
        </div>

        <div class="card">
            <div class="card-header text-center">
                <strong>Step 3: View Encrypted & Decrypted Messages</strong>
            </div>
            <div class="card-body">
                <div class="result-area">
                    <div class="form-group">
                        <label for="encryptedMessage">Encrypted Message:</label>
                        <textarea class="form-control" id="encryptedMessage" rows="4" readonly></textarea>
                    </div>
                    <div class="form-group">
                        <label for="decryptedMessage">Decrypted Message:</label>
                        <textarea class="form-control" id="decryptedMessage" rows="4" readonly></textarea>
                    </div>
                </div>
                <button class="btn btn-dark btn-block" onclick="decryptMessage()">Decrypt Message</button>
            </div>
        </div>
    </div>

    <canvas id="imageCanvas" style="display: none;"></canvas>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/forge/0.10.0/forge.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="encryption.js"></script>
</body>
</html>
