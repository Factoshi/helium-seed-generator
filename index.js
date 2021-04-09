const { randomBytes, createHash } = require('crypto');
const wordlist = require('./wordlist.json');

function bytesToBinary(bytes) {
    return bytes
        .map((x) => {
            let strOut = x.toString(2);
            while (strOut.length < 8) strOut = '0' + strOut;
            return strOut;
        })
        .join('');
}

function deriveChecksumBits(entropyBuffer) {
    const ENT = entropyBuffer.length * 8;
    const CS = ENT / 32;
    const hash = createHash('sha256').update(entropyBuffer).digest('hex');

    return bytesToBinary([].slice.call(hash)).slice(0, CS);
}

function fromEntropy(entropy) {
    if (entropy.length < 16) {
        throw new Error('invalid entropy, less than 16');
    }
    if (entropy.length > 32) {
        throw new Error('invalid entropy, greater than 32');
    }
    if (entropy.length % 4 !== 0) {
        throw new Error('invalid entropy, not divisble by 4');
    }

    const entropyBits = bytesToBinary([].slice.call(entropy));
    const checksumBits = deriveChecksumBits(entropy);

    const bits = entropyBits + checksumBits;
    const chunks = bits.match(/(.{1,11})/g) || [];
    const words = chunks.map((binary) => wordlist[parseInt(binary, 2)]);

    return words;
}

(() => {
    const rb = randomBytes(16);
    const mnemonic = fromEntropy(rb);
    console.log(mnemonic.join(' '));
})();
