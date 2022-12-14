class ItemsController < ApplicationController

    before_action :authorize
    skip_before_action :authorize, only: :index
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    def index
        items = Item.all
        render json: items
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    end

    private

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
    
    def item_params
        params.permit(:category_id, :name)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
    
end
