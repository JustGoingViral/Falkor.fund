# encoding: UTF-8
# frozen_string_literal: true

require 'falkor/airdrop'

module API
  module V2
    module Admin
      class Airdrops < Grape::API

        desc 'Process user airdrop'
        params do
          requires :file,
                   type: File
        end
        post '/airdrops' do
          Falkor Exchange::Airdrop.new.process(current_user, params)
          present(result: 'Airdrop processing started')
        end
      end
    end
  end
end
