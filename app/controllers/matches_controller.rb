class MatchesController < ApplicationController
    def create
        match = Match.create(match_params)

        if(match)
            render json: match
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def match_params
        params.permit(:sender_contact_id, :recipient_contact_id, :match_code)
    end
end
