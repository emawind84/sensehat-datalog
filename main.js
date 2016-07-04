(function ($){
	"use strict";
	
	angular.module('senseui', ['angularUtils.directives.dirPagination'])
	.factory('sensedata', ['$http', '$log', 'dateFilter', function ($http, $log, dateFilter){
		return {
			load: function(d){
				$log.debug('Loading data with criteria: ', d);
				return $http({
					url: "sensedata/",
					method: "GET",
					params: {
						"fromdate": dateFilter(d.fromdate, 'yyyy-MM-dd'),
						"todate": dateFilter(d.todate, 'yyyy-MM-dd')
					},
					responseType: "json"
				});
			}
		};
	}])
	.controller('SenseDataController', ['sensedata', '$log', '$scope', function(sensedata, $log, $scope){
		var self = this;
		self.data = [];
		
		// default date criteria
		//var _d = new Date(); _d.setHours(0, 0, 0, 0);
		var _d = null;
		
		$scope.sensedata = sensedata;
		$scope.criteria = {
			"fromdate": _d,
			"todate": _d
		};
		
		function loadData(data) {
			sensedata.load(data).then(function(res){
				$log.debug(res);
				self.data = res.data;
			}, function(err){
				$log.debug(err);
			});
		}
		$scope.loadData = loadData;
		
		loadData($scope.criteria);
		
	}]);
	
	
	
})(jQuery);