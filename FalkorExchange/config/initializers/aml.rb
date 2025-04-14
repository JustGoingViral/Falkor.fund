# frozen_string_literal: true
require 'falkor/aml'

begin
  if ENV['AML_BACKEND'].present?
    require ENV['AML_BACKEND']
    Falkor Exchange::AML.adapter = "#{ENV.fetch('AML_BACKEND').capitalize}".constantize.new
  end
rescue StandardError, LoadError => e
  Rails.logger.error { e.message }
end
