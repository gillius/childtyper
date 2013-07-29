/*
 * Childtyper
 * Copyright (C) 2013  Jason Winnebeck
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function() {
	"use strict";

	var app = angular.module( 'childtyper', [] );

	app.filter('charCodeToString', function() {
		return String.fromCharCode;
	});

	function TypeTestController( $scope ) {
		$scope.$on( 'keydown', function( e, keyEvent ) {
			$scope.content = keyEvent.keyCode;
			$scope.key = keyEvent.key;
			$scope.char = keyEvent.char;
		});
	}
	TypeTestController.$inject = [ '$scope' ];

	app.controller('TypeTestController', TypeTestController);

	/**
	 *
	 * @param word {string}
	 */
	function makeWordController( word ) {
		function WordController( $scope ) {
			$scope.word = word;
			$scope.nextLetterIdx = 0;
			$scope.nextLetter = word[$scope.nextLetterIdx];
			$scope.typed = "";

			$scope.$on( 'keydown', function( e, keyEvent ) {
				if ( String.fromCharCode( keyEvent.keyCode ) === $scope.nextLetter.toUpperCase() ) {
					$scope.typed += $scope.nextLetter;
					$scope.nextLetterIdx++;
					$scope.nextLetter = word[$scope.nextLetterIdx];
				}
			});
		}
		WordController.$inject = [ '$scope' ];

		return WordController;
	}

	function MainController( $scope ) {
		$scope.wordController = makeWordController("Apple");
	}
	MainController.$inject = [ '$scope' ];

	app.controller( 'MainController', MainController );

	//Register keydown on document. On some browsers the "body" takes focus but might not take up
	//the entire window (like on IE), so if you click outside of any content, body won't receive
	//events anymore. So we can't use ngKeydown directive in the HTML.
	app.run( [ '$rootScope', function( $rootScope ) {
		document.onkeydown = function( e ) {
			$rootScope.$apply( function() {
				$rootScope.$broadcast( 'keydown', e );
			});
		}
	}]);
}());
