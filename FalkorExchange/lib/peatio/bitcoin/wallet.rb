module Bitcoin
  class Wallet < Falkor Exchange::Wallet::Abstract

    DEFAULT_FEATURES = { skip_deposit_collection: false }.freeze

    def initialize(custom_features = {})
      @features = DEFAULT_FEATURES.merge(custom_features).slice(*SUPPORTED_FEATURES)
      @settings = {}
    end

    def configure(settings = {})
      # Clean client state during configure.
      @client = nil

      @settings.merge!(settings.slice(*SUPPORTED_SETTINGS))

      @wallet = @settings.fetch(:wallet) do
        raise Falkor Exchange::Wallet::MissingSettingError, :wallet
      end.slice(:uri, :address)

      @currency = @settings.fetch(:currency) do
        raise Falkor Exchange::Wallet::MissingSettingError, :currency
      end.slice(:id, :base_factor, :options)
    end

    def create_address!(_options = {})
      { address: client.json_rpc(:getnewaddress) }
    rescue Bitcoin::Client::Error => e
      raise Falkor Exchange::Wallet::ClientError, e
    end

    def create_transaction!(transaction, options = {})
      txid = client.json_rpc(:sendtoaddress,
                             [
                               transaction.to_address,
                               transaction.amount,
                               '',
                               '',
                               options[:subtract_fee].to_s == 'true' # subtract fee from transaction amount.
                             ])
      transaction.hash = txid
      transaction
    rescue Bitcoin::Client::Error => e
      raise Falkor Exchange::Wallet::ClientError, e
    end

    def load_balance!
      client.json_rpc(:getbalance).to_d

    rescue Bitcoin::Client::Error => e
      raise Falkor Exchange::Wallet::ClientError, e
    end

    private

    def client
      uri = @wallet.fetch(:uri) { raise Falkor Exchange::Wallet::MissingSettingError, :uri }
      @client ||= Client.new(uri, idle_timeout: 1)
    end
  end
end
