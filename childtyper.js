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

var app = angular.module( 'childtyper', [] );

app.directive( 'onKeyup', function ( $parse ) {
	return function ( scope, elm, attrs ) {
		var expr = $parse( attrs.onKeyup );
		elm.bind( "keyup", function ( e ) {
			scope.$apply( function () {
				expr( scope, {$key: e.which } );
			} );
		} )
	}
} );