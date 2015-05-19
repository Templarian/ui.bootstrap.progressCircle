angular.module('ui.bootstrap.progressCircle', [])

.directive('progressCircle', [
    function () {
        var create = function (elementName) {
          return document.createElementNS('http://www.w3.org/2000/svg', elementName);
        };
      	var thickness = 10;
        var size = 100;
      	var value = 0;
      	var min = 0;
      	var max = 100;
      	var offset = 90;
      	var total = 0;
      	var svg = null;
      	var path = null;
      	function updatePath () {
          var percent =  (value - min) / (max - min);
          path.setAttribute('stroke-dashoffset', total - (percent * total));
      	};
        function updateSize () {
          	var half = Math.floor(size / 2);
          	size = half * 2;
            svg.style.width = size + 'px';
            svg.style.height = size + 'px';
          	var quarter = Math.floor(half / 2);
          	var halfThickness = Math.ceil(thickness / 2);
          	path.setAttribute('d',
                              'M' + halfThickness + ',' + half
                            + 'A' + quarter + ',' + quarter + ' 0 0,1 ' + (size - halfThickness) + ',' + half
                            + 'A' + quarter + ',' + quarter + ' 0 0,1 ' + halfThickness + ',' + half);
          	total = path.getTotalLength();
          	path.setAttribute('stroke-dasharray', total + ' ' + total);
          	path.setAttribute('transform', 'rotate(' + offset + ' ' + half + ' ' + half + ')');
        }
        return function ($scope, element, attrs) {
            svg = create('svg');
            svg.setAttribute('class', 'progress-circle');
            path = create('path');
          	updateSize();
            updatePath();
            svg.appendChild(path);
            element.replaceWith(svg);
            $scope.$watch(attrs.ngModel, function (newValue) {
              	value = newValue || 0;
                updatePath();
            });
            $scope.$watch(attrs.size, function (sizeValue) {
              	size = sizeValue || 100;
              	svg.style.width = size + 'px';
            		svg.style.height = size + 'px';
                updateSize();
              	updatePath();
            });
          	$scope.$watch(attrs.min, function (minValue) {
              	min = minValue || 0;
                updatePath();
            });
          	$scope.$watch(attrs.max, function (maxValue) {
              	max = maxValue || 1;
                updatePath();
            });
            $scope.$watch(attrs.thickness, function (thicknessValue) {
              	thickness = thicknessValue || 10;
              	path.setAttribute('stroke-width', thickness);
                updateSize();
                updatePath();
            });
          	$scope.$watch(attrs.offset, function (offsetValue) {
              	offset = offsetValue || 90;
                updateSize();
            });
        };
    }
]);