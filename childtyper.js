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

	var words = [
		"Apple",
		"Ball",
		"Cat"
	];

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

	function WordController( $scope ) {
		//assume $scope.word comes from parent controller; is there a better way to pass that in?

		function onNewWord( word ) {
			$scope.theWord = word;
			$scope.nextLetterIdx = 0;
			$scope.nextLetter = $scope.theWord[$scope.nextLetterIdx];
			$scope.typed = "";
			$scope.finished = false;
		}

		$scope.$on( 'keydown', function( e, keyEvent ) {
			if ( $scope.nextLetter !== null &&
			     String.fromCharCode( keyEvent.keyCode ) === $scope.nextLetter.toUpperCase() ) {
				$scope.typed += $scope.nextLetter;
				$scope.nextLetterIdx++;
				if ( $scope.nextLetterIdx >= $scope.theWord.length ) {
					$scope.finished = true;
					$scope.nextLetter = null;
					$scope.$emit( "WordFinished" );
				} else {
					$scope.nextLetter = $scope.theWord[$scope.nextLetterIdx];
				}
			}
		});

		$scope.$watch( "word", function(newWord) {
			onNewWord( newWord );
		});
	}
	WordController.$inject = [ '$scope' ];

	app.controller( 'WordController', WordController );

	function MainController( $scope, $timeout ) {
		var wordPos = 0;

		function updateWord() {
			$scope.word = words[wordPos];
		}

		updateWord();

		$scope.$on( 'WordFinished', function() {
			++wordPos;
			if ( wordPos >= words.length )
				wordPos = 0;

			$timeout( function () {
				updateWord();
			}, 1000 );
		});
	}
	MainController.$inject = [ '$scope', '$timeout' ];

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
