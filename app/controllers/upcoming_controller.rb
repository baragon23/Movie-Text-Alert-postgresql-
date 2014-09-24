class UpcomingController < ApplicationController
	def index
		if !current_user 
			redirect_to root_path
		else
	end
end
