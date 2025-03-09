const { Keypair } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const readline = require('readline');

// 1️⃣ 새로운 Solana 키페어 생성
const keypair = Keypair.generate();
console.log('🔑 Public Key:', keypair.publicKey.toBase58());

// 2️⃣ 특정 문자열에 대한 서명 생성 함수
function signMessage(message, keypair) {
    const messageBytes = new TextEncoder().encode(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return Array.from(signature); // Number Array 형태로 반환
}

// 3️⃣ 콘솔 입력을 통해 문자열을 받아 서명
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\n📝 Enter a message to sign: ', (message) => {
    const signature = signMessage(message, keypair);
    console.log('\n✍ Signed Message:', message);
    console.log('🔏 Signature (Number Array):', signature);
    rl.close();
});
