class ContactRatingsController < ApplicationController
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

    private
    
    def contact_rating_params
        params.permit(:contact_id, :item_id, :rating)
    end
end
