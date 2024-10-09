const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
let imagesData = [];
let privateKey = null; // Store the generated private key for decryption
let encryptedMessage = null; // Store the encrypted message for decryption

// Handle image uploads and extract pixel data
function handleFiles(event) {
    const files = event.target.files;
    if (files.length < 3) {
        alert('Please upload at least 3 images for the key.');
        return;
    }
    imagesData = [];
    for (let i = 0; i < 3; i++) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                imagesData.push(imageData.data);
            };
        };
        reader.readAsDataURL(files[i]);
    }
}

// Generate a key from the images' pixel data
function generateKeyFromImages() {
    if (imagesData.length < 3) {
        alert('Please upload 3 images first.');
        return null;
    }

    // Combine RGB values of all 3 images to generate a key
    let combinedKey = '';
    for (let i = 0; i < imagesData[0].length; i += 4) {
        // Take average of R, G, and B values from each image
        const r = (imagesData[0][i] + imagesData[1][i] + imagesData[2][i]) / 3;
        const g = (imagesData[0][i + 1] + imagesData[1][i + 1] + imagesData[2][i + 1]) / 3;
        const b = (imagesData[0][i + 2] + imagesData[1][i + 2] + imagesData[2][i + 2]) / 3;

        combinedKey += String.fromCharCode(Math.floor(r), Math.floor(g), Math.floor(b));
    }

    // Hash the combined key to produce a shorter key for RSA encryption
    const md = forge.md.sha256.create();
    md.update(combinedKey);
    return md.digest().toHex();
}

// Encrypt the message using RSA
function encryptMessage() {
    const message = document.getElementById('message').value;
    if (!message) {
        alert('Please enter a message to encrypt.');
        return;
    }

    const key = generateKeyFromImages();
    if (!key) return;

    // Generate RSA keys using the derived key as a seed
    const rsa = forge.pki.rsa;
    const random = forge.random;
    const seed = random.createInstance();
    seed.seedFileSync(key); // Use the key as randomness source

    const keys = rsa.generateKeyPair({ bits: 2048, e: 0x10001, prng: seed });
    const publicKey = keys.publicKey;
    privateKey = keys.privateKey; // Store private key for later decryption

    // Encrypt the message with the public key
    encryptedMessage = publicKey.encrypt(message);
    document.getElementById('encryptedMessage').value = forge.util.encode64(encryptedMessage);
}

// Decrypt the message using RSA
function decryptMessage() {
    if (!encryptedMessage) {
        alert('No encrypted message to decrypt.');
        return;
    }

    if (!privateKey) {
        alert('No private key found. Please re-upload images and encrypt the message first.');
        return;
    }

    try {
        // Decrypt the message with the private key
        const decryptedMessage = privateKey.decrypt(encryptedMessage);
        document.getElementById('decryptedMessage').value = decryptedMessage;
    } catch (e) {
        alert('Decryption failed. Please ensure the images used are the same as those for encryption.');
    }
}
