class ContactRatingsController < ApplicationController
    def create
        contact_rating = ContactRating.create(contact_rating_params)
        render json: contact_rating
    end

    private
    
    def contact_rating_params
        params.permit(:contact_id, :item_id, :rating)
    end
end
