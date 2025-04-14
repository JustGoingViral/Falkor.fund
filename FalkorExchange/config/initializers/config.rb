# frozen_string_literal: true

require 'falkor/app'

Falkor Exchange::App.define do |config|
  config.set(:deposit_funds_locked, 'false', type: :bool)
  config.set(:manual_deposit_approval, 'false', type: :bool)
end
