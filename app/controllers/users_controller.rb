class UsersController < ApplicationController

    def create
        user = User.create(user_params)

        if user.valid?
            user.contact = Contact.create(contact_params)
         else
             render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
         end

        render json: user
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def contact_params
        params.permit(:first_name, :last_name)
    end
end
