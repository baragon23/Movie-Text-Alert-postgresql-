class MoviesController < ApplicationController
		#respond to the view with json format
		respond_to :json

	def index
		@movies = Movie.where(user_id: current_user.id)
		# @selections = Selection.all

		# returns the records from the selections table which are tied to 
		# the current logged in user through their id
		# @user_selections = @selections.where(current_user.id)

		# @user_movies = Movie.where(id: IN @user_selections)

		#@user_movies = @user_selections.each { | movie | return movie.movies_id }

		respond_with @movies, each_serializer: MovieSerializer
		# respond_with @user_movies, each_serializer: MovieSerializer
	end

	def create
		@movie = Movie.new(movie_params)

		if @movie.save
			# connect the movie to the user in the selections join table
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
		params.require(:movie).permit(:title, :poster, :release_date, :user_id)
	end
end
