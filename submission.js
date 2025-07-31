import axios from 'axios'
import { createHmac } from 'crypto'

function generateTOTP(userId, secretSuffix, digits = 10) {
    const algo = 'sha512';
    const X = 30; // 30 seconds
    const T0 = 0;
    const now = Math.floor(Date.now() / 1000);
    const counter = Math.floor((now - T0) / X);

    // Step 2: Secret as buffer
    const secret = Buffer.from(userId + secretSuffix, 'utf8');

    // Step 3: Counter as 8-byte Buffer (big-endian)
    const buf = Buffer.alloc(8);
    buf.writeUInt32BE(0, 0); // high 4 bytes (0)
    buf.writeUInt32BE(counter, 4); // lower 4 bytes

    // Step 4: HMAC-SHA512
    const hmac = createHmac(algo, secret).update(buf).digest();

    // Step 5: Dynamic truncation
    const offset = hmac[hmac.length - 1] & 0x0f;
    const code = (
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff)
    ) % (10 ** digits);

    return code.toString().padStart(digits, '0');
}
const email = "darshjain05.in@gmail.com"
const url = "https://api.challenge.hennge.com/challenges/backend-recursion/004"
const payload = {
  "github_url": "https://gist.github.com/sparky0520/588c94f1b76e2df3d10e098d0a14cf74",
  "contact_email": email,
  "solution_language": "python"
}
const password = generateTOTP(email, 'HENNGECHALLENGE004');
console.log(password)
// RFC2617 HTTP Basic Auth: base64(username:password)
const credentials = Buffer.from(`${email}:${password}`).toString('base64');
console.log(credentials)
const authHeader = `Basic ${credentials}`;
console.log(authHeader)
const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': authHeader
  },
};

axios.post(url, payload, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });