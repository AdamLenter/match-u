class ContactRatingsController < ApplicationController

    before_action :authorize
    
    def create
        contact_rating = ContactRating.create(contact_rating_params)
        render json: contact_rating
    end

    def show_by_contact
        contact_ratings = ContactRating.where(contact_id: params[:contact_id])
        render json: contact_ratings, status: :ok
    end

    def update
        contact_rating = ContactRating.find(params[:id])
        
        contact_rating.update(contact_rating_params)

        render json: contact_rating, status: :ok
    end

    def destroy
        contact_rating = ContactRating.find_by!(id: params[:id])
        contact_rating.destroy
        head :no_content
    end

    private
    
    def contact_rating_params
        params.permit(:contact_id, :item_id, :rating)
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
end
