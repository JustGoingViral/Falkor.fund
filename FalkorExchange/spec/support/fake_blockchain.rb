# frozen_string_literal: true

class FakeBlockchain < Falkor Exchange::Blockchain::Abstract
  def initialize
    @features = { cash_addr_format: false, case_sensitive: true }
  end

  def configure(settings = {}); end
end

class FakeWallet < Falkor Exchange::Wallet::Abstract
  def initialize(features = {})
    @features = features
  end

  def configure(settings = {}); end
end

Falkor Exchange::Blockchain.registry[:fake] = FakeBlockchain
Falkor Exchange::Wallet.registry[:fake] = FakeWallet
