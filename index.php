<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image-Based AES Encryption & Decryption</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .container {
            margin-top: 30px;
        }
        h1 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        .card-header {
            background-color: #343a40;
            color: #fff;
        }
        .split-screen {
            display: flex;
            justify-content: space-between;
        }
        .side {
            width: 48%;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Image-Based AES Encryption & Decryption</h1>
        <div class="split-screen">
            <!-- Encryption Section -->
            <div class="side">
                <div class="card">
                    <div class="card-header text-center">
                        <strong>Encryption: Upload Images to Create a Key</strong>
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
                        <strong>Enter a Message to Encrypt</strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="message">Enter Message:</label>
                            <textarea class="form-control" id="message" rows="4" placeholder="Type a message to encrypt..."></textarea>
                        </div>
                        <button class="btn btn-dark btn-block" onclick="encryptMessage()">Encrypt Message</button>
                    </div>
                </div>
            </div>

            <!-- Decryption Section -->
            <div class="side">
                <div class="card">
                    <div class="card-header text-center">
                        <strong>Decryption: Upload Images to Generate Key</strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="decryptionImages">Upload 3 Images for Decryption:</label>
                            <input type="file" class="form-control-file" id="decryptionImages" accept="image/*" multiple onchange="handleDecryptionFiles(event)">
                        </div>
                        <small class="text-muted">Upload the same 3 images used for encryption to create the decryption key.</small>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header text-center">
                        <strong>Enter Encrypted Message</strong>
                    </div>
                    <div class="card-body">
                        <textarea class="form-control" id="encryptedMessage" rows="4" placeholder="Paste the encrypted message here..."></textarea>
                    </div>
                </div>
                <button class="btn btn-dark btn-block" onclick="decryptMessageWithImages()">Decrypt Message</button>
                <div class="card mt-3">
                    <div class="card-header text-center">
                        <strong>Decrypted Message</strong>
                    </div>
                    <div class="card-body">
                        <textarea class="form-control" id="decryptedMessage" rows="4" readonly></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <canvas id="imageCanvas" style="display: none;"></canvas>
    
    <!-- Move script tags to the end to ensure that all elements are loaded before the scripts are executed -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/forge/0.10.0/forge.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    
    <!-- Include the encryption and decryption scripts -->
    <script src="encryption.js"></script>
    
</body>
</html>
