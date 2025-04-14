Falkor Exchange::Wallet.registry[:bitcoind] = Bitcoin::Wallet
Falkor Exchange::Wallet.registry[:geth] = Ethereum::Eth::Wallet
Falkor Exchange::Wallet.registry[:parity] = Ethereum::Eth::Wallet
Falkor Exchange::Wallet.registry[:gnosis] = Gnosis::Wallet
Falkor Exchange::Wallet.registry[:"ow-hdwallet-eth"] = OWHDWallet::WalletETH
Falkor Exchange::Wallet.registry[:"ow-hdwallet-bsc"] = OWHDWallet::WalletBSC
Falkor Exchange::Wallet.registry[:"ow-hdwallet-heco"] = OWHDWallet::WalletHECO
Falkor Exchange::Wallet.registry[:opendax_cloud] = OpendaxCloud::Wallet
