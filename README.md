# Deprecated 

**The Helium CLI wallet [now supports](https://github.com/helium/helium-wallet-rs/pull/119) BIP39 compliant mnemonic seeds. 
If you need to generate a mnemonic seed offline, you should use [Ian Coleman's BIP39 tool](https://github.com/iancoleman/bip39) instead.**

## Helium mnemonic seed generator

Zero dependency tool to generate mnemonic seeds compatible with Helium CLI and mobile wallets.

### Requirements:

-   NodeJS: https://nodejs.org/en/download/

### Instructions:

```
git clone https://github.com/Factoshi/helium-seed-generator.git
cd helium-seed-generator
./generate-seed
```

### Credit:

Code mostly lifted from [helium-js](https://github.com/helium/helium-js) with some tweaks.
