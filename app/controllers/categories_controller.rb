class CategoriesController < ApplicationController

    before_action :authorize

    def index
        categories = Category.all
        render json: categories
    end

    private

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
    
end
