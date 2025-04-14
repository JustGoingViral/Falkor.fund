# frozen_string_literal: true

FactoryBot.define do
  factory :engine do
    name { Faker::Company.unique.bs.strip.downcase }
    driver { 'falkor' }
    state { 'online' }
  end
end
