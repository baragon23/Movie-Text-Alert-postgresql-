
movieApp.controller('MovieController', [ '$http', '$scope', 'Movie', function($http, $scope, Movie) {

	var apiURL = "http://api.themoviedb.org/3/movie/upcoming?api_key=d0a8b0361581f05b502a995a7cf2e923";
	var poster_directory = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500";

	$scope.movies = [ ];
	var sorted_movie_array = [ ];

	$http({ method: 'GET', url: apiURL })
		.success(function(data) {
			
			for(var i = 0; i < data.results.length; i++) {
				var movieObj = {
					title: '',
					poster: '',
					release_date: ''
				};

				movieObj.title = data.results[i].title;
				
				if (data.results[i].poster_path == null) {
					movieObj.poster = "/assets/no-image.png";
				}
				else {
					movieObj.poster = poster_directory + data.results[i].poster_path;
				}
				movieObj.release_date = data.results[i].release_date;
				sorted_movie_array.push(movieObj);
			}

			sorted_movie_array.sort(function(a, b){
					var dateA = new Date(a.release_date);
					var dateB = new Date(b.release_date);
					return dateA - dateB; //sort by date ascending
			});

			$scope.movies = sorted_movie_array;
			//console.log(sorted_movie_array);
			//console.log($scope.movies.length);
			//console.log(data.results);
		})
		.error(function(data, status) {
			console.log(status);
		});

	//===========================================

	$scope.savedMovies = {};

	$scope.newMovie = new Movie();

	Movie.query(function(json) {
		$scope.savedMovies = json;
	});

	$scope.addMovie = function(movie) {
		//console.log($scope.newMovie);

		$scope.newMovie.title = movie.title;
		$scope.newMovie.poster = movie.poster;
		$scope.newMovie.release_date = movie.release_date;

		//now save the movie to the database
		$scope.newMovie.$save(function() {
			$scope.savedMovies.push($scope.newMovie);
			$scope.newMovie = new Movie();
			//reset the form
			$scope.postForm.$pristine = true;
		});
	};

	//movie was passed in from the html page in the destroyMovie function
	$scope.destroyMovie = function(movie) {
		console.log(movie);
		movie.$delete(function() {
			var position = $scope.savedMovies.indexOf(movie);
			$scope.savedMovies.splice(position, 1);
		});
	};

}]); //end controller