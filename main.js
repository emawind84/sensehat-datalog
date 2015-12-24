(function (){
	"use strict";
	
	angular.module('senseui', [])
	.factory('sensedata', ['$http', function ($http){
		return {
			load: function(){
				return $http({
					url: "http://192.168.0.10:1880/sensedata",
					method: "GET",
					params: {
						
					},
					responseType: "json"
				});
			}
		};
	}])
	.controller('SenseDataController', ['sensedata', '$log', function(sensedata, $log){
		var self = this;
		self.data = [];
		
		sensedata.load().then(function(response){
			$log.debug(response);
			self.data = response;
		}, function(err){
			$log.debug(err);
		});
	}]);
	
	
})();