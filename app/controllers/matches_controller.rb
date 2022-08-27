class MatchesController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    def create
        match = Match.create(match_params)
        if(match)
            render json: match
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def find_by
        match = Match.find_by(match_code: params[:match_code])

        if(match)
            render json: match, status: :ok
        else
            render json: { error: "Code not found" }, status: :not_found
        end
    end

    def update
        match = Match.find(params[:id])
        match.update(match_params)
        render json: match, status: :ok
    end

    def destroy
        match = Match.find_by!(id: params[:id])
        match.destroy
        head :no_content
    end


    def pending_matches
        matches = Match.where(sender_contact_id: params[:sender_contact_id], recipient_contact_id: 1.., match_confirmed: false)
        render json: matches, status: :ok
    end

    def my_matches
        matches = Match.where(sender_contact_id: params[:contact_id]).or(Match.where(recipient_contact_id: params[:contact_id]))
        render json: matches, status: :ok
    end

    private

    def match_params
        params.permit(:sender_contact_id, :recipient_contact_id, :match_code, :match_confirmed)
    end

    def render_not_found_response
        render json: { error: "Code not found" }, status: :not_found
    end
end
