class SelectionsController < ApplicationController
	def index
		@selections = Selection.all
	end

	def new
		@selection = Selection.new
	end

	def create
		@selection = Selection.new(selection_params)
		if @selection.save
			redirect_to upcoming_path
		else
			redirect_to upcoming_path
		end
	end

	protected

	def selection_params
		params.require(:selection).permit(:user_id, :movie_id)
	end
end
