// movieApp.factory('YoutubeSvc', ['$resource', '$q', function($resource, $q){
//         var deferred = $q.defer();
//         return {
//             search: function(movie_name) {
                
//                 console.log("inside search function");
//                 var query = movie_name + " trailer";
//                 // Use the JavaScript client library to create a search.list() API call.
//                 var request = gapi.client.youtube.search.list({
//                     part: 'snippet',
//                     q: query
//                 });
//                 // Send the request to the API server,
//                 // and invoke onSearchRepsonse() with the response.
//                 request.execute(this.onSearchResponse);
//                 return deferred.promise;
//             },

//             // Called automatically with the response of the YouTube API request.
//             onSearchResponse: function(data) {
//                 var videoId = data.items[0].id.videoId;
//                 deferred.resolve({ videoId: data.items[0].id.videoId });
//                 //console.log('<a href="http://www.youtube.com/watch?v=' + videoId + '">Movie Trailer</a>');
//             },
//         }

// }]);
