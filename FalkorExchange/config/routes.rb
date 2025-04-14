# frozen_string_literal: true

FalkorExchange::Application.routes.draw do
  # Health check endpoint
  get '/health', to: 'health#check'

  get '/swagger', to: 'swagger#index'

  mount API::Mount => API::Mount::PREFIX
end
