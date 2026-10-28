# WIF Paymaster Frontend Demo

Zero-ETH voting demo for the **World is Flat Hackathon**.

Users can perform actions on Robinhood Chain while paying gas entirely in $WIF via the WIF Paymaster.

## Live Contracts

| Contract | Address |
|----------|---------|
| WIFPaymaster | `0x7e0bCEFa1568Bf8ad9a20F1AbfDE5FaE47ac84dE` |
| BoundedRateProvider | `0x3A040be5ee7829A38943294DFC6116Bf095eF497` |
| $WIF | `0x5173b8eA6923c2d40267890D45C46a3480954773` |

## Run locally

```bash
npm install
npm run dev
```

## Next steps for full functionality

- Wire up `permissionless` + `viem` for real UserOperations
- Connect to Alchemy bundler on Robinhood Chain
- Add real $WIF approve + vote call
