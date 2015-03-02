/// <reference path="../node_modules/angular/angular.js" />

(function () {
    
    var module = angular.module('stb.controllers');

    var controller = function ($scope, $q, $log, trelloSvc, errorSvc) {

        $scope.Login = function () {

            trelloSvc.authorize(onAuthorized)
                .then()
                .fail(errorSvc.onError);

            //    Trello.authorize({
            //    type: "popup",
            //   success: onAuthorize
            // })
        };

        var onBoards = function (boards) {
            $log.info(boards);
            $scope.boards = boards;
        }

        var onMember = function (member) {

            //$scope.member = member;

            trelloSvc.getBoards()
              .then(onBoards)
              .fail(onError);

            //Trello.get("members/me/boards", onBoards, onError);
        }

        var onError = function (e) {

            $scope.error = e;
        }

        var onAuthorized = function () {

            trelloSvc.getMember("me")
                .then(onMember)
                .fail(errorSvc.onError);

            //Trello.members.get("me", onMember, onError);

        };

        //  Trello.authorize({
        //   interactive: false,
        //   success: onAuthorize
        // });

    };

    module.controller("BoardsController", controller);
    
}())