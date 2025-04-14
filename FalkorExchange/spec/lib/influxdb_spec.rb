# frozen_string_literal: true

describe Falkor Exchange::InfluxDB do
  context 'host sharding' do
    before do
      Falkor Exchange::InfluxDB.instance_variable_set(:@clients, {})
      Falkor Exchange::InfluxDB.stubs(:config).returns({ host: %w[inflxudb-0 inflxudb-1] })
    end

    after do
      Falkor Exchange::InfluxDB.instance_variable_set(:@clients, {})
    end

    it do
      expect(Falkor Exchange::InfluxDB.client(keyshard: 'btcusd').config.hosts).to eq(['inflxudb-1'])
      expect(Falkor Exchange::InfluxDB.client(keyshard: 'ethusd').config.hosts).to eq(['inflxudb-0'])
    end
  end
end
