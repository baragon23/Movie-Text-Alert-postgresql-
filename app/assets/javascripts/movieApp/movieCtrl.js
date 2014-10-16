

//jQuery.getScript('../youtube_api.js');
window.movieApp.controller('MovieController', [ '$http', '$scope', 'Movie',
 function($http, $scope, Movie, YoutubeSvc) {

	var apiURL = "http://api.themoviedb.org/3/movie/upcoming?api_key=d0a8b0361581f05b502a995a7cf2e923";
	var poster_directory = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500";

	$scope.movies = [ ];
	var sorted_movie_array = [ ];

/*	// Called automatically when JavaScript client library is loaded.
	gapi.client.load('youtube', 'v3', onYouTubeApiLoad);

	// Called automatically when YouTube API interface is loaded (see line 9).
	function onYouTubeApiLoad() {
	    gapi.client.setApiKey('AIzaSyCwxiOWzN5SQpc4_85EiSTpAZxJFfMe9uE');
	    console.log("key loaded");

	    //$http({ method: 'GET', url: apiURL }) gets moved here to make youtube api call

	} // function onYouTubeApiLoad()*/

	//call api and build sorted movie array to display on page
	$http({ method: 'GET', url: apiURL })
		.success(function(data) {
			
			for(var i = 0; i < data.results.length; i++) {
				var movieObj = {
					title: '',
					poster: '',
					release_date: ''
				};

				//assign title
				movieObj.title = data.results[i].title;
				
				//assign poster image
				//no image available for the movie so we use a default image
				if (data.results[i].poster_path == null) {
					movieObj.poster = "/assets/no-image.png";
				}
				else {
					movieObj.poster = poster_directory + data.results[i].poster_path;
				}

				//assign release date
				movieObj.release_date = data.results[i].release_date;

				//use YoutubeSvc service to pass movie title and get back trailer link
				//TODO: integrate Angular promise with youtube api call
				//movieObj.trailer = YoutubeSvc.search(data.results[i].title);

				sorted_movie_array.push(movieObj);
			}

			 //sort by newest date
			sorted_movie_array.sort(function(a, b){
					var dateA = new Date(a.release_date);
					var dateB = new Date(b.release_date);
					return dateA - dateB;
			});

			$scope.movies = sorted_movie_array;

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
	
	$scope.addMovie = function(movie, index) {
		$scope.newMovie.title = movie.title;
		$scope.newMovie.poster = movie.poster;
		$scope.newMovie.release_date = movie.release_date;
		//save the movie record along with the current user id so that way
		//the records will be tied to that user through user id
		$scope.newMovie.user_id = movie.user_id;

		//now save the movie to the database
		$scope.newMovie.$save(function() {
			$scope.savedMovies.push($scope.newMovie);
			$scope.newMovie = new Movie();
			
			//deactivate the alert me button and change button text to say 'Saved'
			jQuery('input[name="submit' + index + '"]').prop({
				"disabled": true, 
				"value": "Saved"
			});
		});
	};

	$scope.destroyMovie = function(movie) {
		movie.$delete(function() {
			var position = $scope.savedMovies.indexOf(movie);
			$scope.savedMovies.splice(position, 1);
		});
	};

}]); //end controller

