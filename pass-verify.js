const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'admin1234';
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);

  const hashed = '$2b$10$Z7jBej6KNv9O.InCkgAkUejPPD/4oDwYn0iWUlIe5GWOpdLOYhZhK';
  const isMatch = await bcrypt.compare(password, hashed)
  console.log('[isHash] ', isMatch);
}

hashPassword();
