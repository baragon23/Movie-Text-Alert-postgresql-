
	var apiURL = "http://api.themoviedb.org/3/movie/upcoming?api_key=d0a8b0361581f05b502a995a7cf2e923";
	var poster_directory = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500";

	movieApp.controller('MovieController', [ '$http', '$scope', function($http, $scope) {

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

		$scope.saveAlert = function(movie) {

		}

	}]); //end controller