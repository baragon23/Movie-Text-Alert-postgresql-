class MoviesController < ApplicationController
		#respond to the view with json format
		respond_to :json

	def index
		@movies = Movie.all
		respond_with @movies, each_serializer: MovieSerializer
	end

	def create
		@movie = Movie.new(movie_params)

		if @movie.save
			@selection = Selection.create(users_id: current_user.id, movies_id: @movie.id)
			render json: @movie, status: :created
		else
			render json: @movie.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@movie = Movie.find(params[:id])
		if @movie.destroy
			render json: @movie, status: :ok
		end
	end

	protected

	def movie_params
		params.require(:movie).permit(:title, :poster, :release_date)
	end
end
