class ContactsController < ApplicationController

    before_action :authorize

    def index
        contacts = Contact.all
        render json: contacts
    end

    private

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end
    
end
