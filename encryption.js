const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let imagesData = []; // For encryption
let decryptionImagesData = []; // For decryption
let encryptionKey = null; // AES encryption key
let decryptedMessage = null;

// Handle image uploads and extract pixel data for encryption
function handleFiles(event) {
    const files = event.target.files;
    if (files.length < 3) {
        alert('Please upload exactly 3 images for the key.');
        return;
    }
    imagesData = [];
    let loadedImages = 0;
    for (let i = 0; i < 3; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                imagesData.push(imageData.data);
                loadedImages++;

                if (loadedImages === 3) {
                    console.log('All images loaded for encryption, generating key...');
                    encryptionKey = generateKeyFromImages(imagesData);
                    console.log('Generated Encryption Key:', encryptionKey);
                }
            };
        };
        reader.readAsDataURL(files[i]);
    }
}

// Handle image uploads and extract pixel data for decryption
function handleDecryptionFiles(event) {
    const files = event.target.files;
    if (files.length < 3) {
        alert('Please upload exactly 3 images to create the decryption key.');
        return;
    }
    decryptionImagesData = [];
    let loadedImages = 0;
    for (let i = 0; i < 3; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                decryptionImagesData.push(imageData.data);
                loadedImages++;

                if (loadedImages === 3) {
                    console.log('All images loaded for decryption, generating key...');
                    const key = generateKeyFromImages(decryptionImagesData);
                    console.log('Generated Decryption Key:', key);

                    // Immediately set the decryption key
                    encryptionKey = key;
                }
            };
        };
        reader.readAsDataURL(files[i]);
    }
}

// Generate a key from the provided images' pixel data
function generateKeyFromImages(imageDataArray) {
    if (imageDataArray.length < 3) {
        alert('Please upload 3 images first.');
        return null;
    }

    // Combine the RGB values of all 3 images to form a single key
    let combinedKey = '';
    for (let i = 0; i < imageDataArray[0].length; i += 4) {
        const r = (imageDataArray[0][i] + imageDataArray[1][i] + imageDataArray[2][i]) / 3;
        const g = (imageDataArray[0][i + 1] + imageDataArray[1][i + 1] + imageDataArray[2][i + 1]) / 3;
        const b = (imageDataArray[0][i + 2] + imageDataArray[1][i + 2] + imageDataArray[2][i + 2]) / 3;

        combinedKey += String.fromCharCode(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    // Hash the combined key to generate a 256-bit key for AES
    const md = forge.md.sha256.create();
    md.update(combinedKey);
    const hashedKey = md.digest().bytes();

    return hashedKey; // Return the generated AES key
}

// Encrypt the message using AES
function encryptMessage() {
    const message = document.getElementById('message').value;
    if (!message) {
        alert('Please enter a message to encrypt.');
        return;
    }

    if (!encryptionKey) {
        alert('Encryption key not generated. Please upload images first.');
        return;
    }

    try {
        // Create an AES cipher using the generated key
        const iv = forge.random.getBytesSync(16); // 16-byte IV for AES
        const cipher = forge.cipher.createCipher('AES-CTR', encryptionKey);
        cipher.start({ iv: iv });
        cipher.update(forge.util.createBuffer(message, 'utf8')); // Encode message as utf8
        cipher.finish();

        // Get the encrypted output and include IV for decryption
        const encryptedBytes = iv + cipher.output.getBytes(); // Include IV with the encrypted message
        document.getElementById('encryptedMessage').value = forge.util.encode64(encryptedBytes);
        console.log('Message successfully encrypted:', encryptedBytes);
    } catch (e) {
        console.error('Encryption Error:', e);
        alert('Failed to encrypt the message. Please check your inputs.');
    }
}

// Decrypt the encrypted message using AES
function decryptMessageWithImages() {
    if (!encryptionKey) {
        alert('No encryption key found. Please upload the images first.');
        console.error('Encryption Key Not Found:', encryptionKey);
        return;
    }

    const encryptedMessage = document.getElementById('encryptedMessage').value;
    if (!encryptedMessage) {
        alert('Please enter an encrypted message to decrypt.');
        return;
    }

    try {
        // Decode the Base64 encoded message
        const encryptedBytes = forge.util.decode64(encryptedMessage);

        // Extract the IV and encrypted message separately
        const iv = encryptedBytes.slice(0, 16); // First 16 bytes are the IV
        const messageBytes = encryptedBytes.slice(16); // Remaining bytes are the encrypted message

        // Create an AES decipher using the generated key
        const decipher = forge.cipher.createDecipher('AES-CTR', encryptionKey);
        decipher.start({ iv: iv });
        decipher.update(forge.util.createBuffer(messageBytes)); // Update with the encrypted message buffer
        decipher.finish();

        // Get the decrypted message
        const decryptedMessage = decipher.output.toString('utf8'); // Convert the decrypted buffer to UTF-8 string
        document.getElementById('decryptedMessage').value = decryptedMessage;
        console.log('Message successfully decrypted:', decryptedMessage);
    } catch (e) {
        alert('Decryption failed. Please ensure the images used are the same as those for encryption.');
        console.error('Decryption Error:', e);
    }
}
