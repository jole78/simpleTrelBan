/// <reference path="../node_modules/angular/angular.js" />

(function() {

    var app = angular.module('stb.services');

    // fake trello svc
    app.factory("TrelloService", function ($q) {

        var svc = {};

        var getRandomBoards = function (numberOfBoardss) {

            return [
                {
                    name: "Fake Board: " + 1
                }
            ];
        }

        var getFakeMember = function(member) {
            return {
                username: member
            };
        };

        svc.getBoards = function() {
            var response = $q.defer();
            var boards = getRandomBoards(3);
            response.resolve(boards);

            return response.promise;
        };

        svc.authorize = function() {
            var response = $q.defer();
            response.resolve();

            return response.promise;
        };

        svc.getMember = function(member) {
            var response = $q.defer();
            response.resolve(getFakeMember(member));

            return response.promise;

        }

        return svc;

    });
}());



