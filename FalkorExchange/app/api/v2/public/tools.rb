# encoding: UTF-8
# frozen_string_literal: true

module API
  module V2
    module Public
      class Tools < Grape::API
        desc 'Get server current time, in seconds since Unix epoch.'
        get "/timestamp" do
          ::Time.now.iso8601
        end

        desc 'Get running Falkor Exchange version and build details.'
        get "/version" do
          {
            git_tag: Falkor Exchange::Application::GIT_TAG,
            git_sha: Falkor Exchange::Application::GIT_SHA,
            build_date: Falkor Exchange::Application::BUILD_DATE,
            version: Falkor Exchange::Application::VERSION
          }.tap do |v|
            present OpenStruct.new(v), with: Entities::Version
          end
        end

        resource :health do
          desc 'Get application liveness status'
          get "/alive" do
            status Services::HealthChecker.alive? ? 200 : 503
          end

          desc 'Get application readiness status'
          get "/ready" do
            status Services::HealthChecker.ready? ? 200 : 503
          end
        end
      end
    end
  end
end
