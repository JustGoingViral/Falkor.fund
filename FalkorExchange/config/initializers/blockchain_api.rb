Falkor Exchange::Blockchain.registry[:bitcoin] = Bitcoin::Blockchain
Falkor Exchange::Blockchain.registry[:geth] = Ethereum::Eth::Blockchain
Falkor Exchange::Blockchain.registry[:parity] = Ethereum::Eth::Blockchain
Falkor Exchange::Blockchain.registry[:"geth-bsc"] = Ethereum::Bsc::Blockchain
Falkor Exchange::Blockchain.registry[:"geth-heco"] = Ethereum::Heco::Blockchain
