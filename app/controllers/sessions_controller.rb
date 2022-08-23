class SessionsController < ApplicationController
    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
          session[:user_id] = user.id
          render json: user, include: ['contact', 'contact.contact_ratings', 'contact.contact_ratings.item'], status: :created
        else
          render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
      end

      def destroy
        session.delete :user_id
        head :no_content
      end
end
