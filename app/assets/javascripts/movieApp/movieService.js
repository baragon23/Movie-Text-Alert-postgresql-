movieApp.factory('Movie', ['$resource', function($resource){
	return $resource('/api/movies/:id',
		{id: '@id'},
		{update: {method: 'PATCH'}});
}]);