# frozen_string_literal: true

class HealthController < ApplicationController
  # Simple health check endpoint
  def check
    render json: { status: 'ok', time: Time.now.utc.iso8601 }
  end
end
