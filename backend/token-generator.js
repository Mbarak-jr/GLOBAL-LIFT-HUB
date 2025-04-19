import crypto from 'crypto';

function generateTokens() {
  const testToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(testToken).digest('hex');
  
  console.log('=== TOKEN GENERATOR ===');
  console.log('Test Token (URL):', testToken);
  console.log('Hashed Token (DB):', hashedToken);
  console.log('======================');
}

generateTokens();