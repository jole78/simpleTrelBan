// Code goes here

/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
*/
(function() {

  var module = angular.module("TrelBan", ['readableTime']);

  var boardController = module.controller("boardController", function($scope) {

    $scope.Login = function() {
      Trello.authorize({
        interactive: false,
        success: onAuthorize
      });
    }

    var onBoards = function(boards) {
      $scope.boards = boards;
    }

    var onAuthorize = function() {
      Trello.get("members/me/boards", onBoards);
    }

    $scope.showCards = function(boardId) {
      Trello.get("boards/" + boardId + "/cards", onCardsLoaded);
      Trello.get("boards/" + boardId + "/cards/closed", onClosedCardsLoaded);
    }

    var onCardsLoaded = function(data) {
      $.each(data, function(index, card) {
        Trello.get("cards/" + card.id + "/actions", function(actions) {
          if (actions && actions.length > 1) {
            var cycleTime = new Date(actions[0].date);
            cycleTime = cycleTime - new Date(actions[actions.length - 1].date);
            card.cycleTime = cycleTime;
          }
          else
          {
            card.cycleTime = 0;
          }
        });
      });
      $scope.cards = data;
    }

    var onClosedCardsLoaded = function(data) {
      $.each(data, function(index, card) {
        Trello.get("cards/" + card.id + "/actions", function(actions) {
          if (actions && actions.length > 1) {
            var cycleTime = new Date(actions[0].date);
            cycleTime = cycleTime - new Date(actions[actions.length - 1].date);
            card.cycleTime = cycleTime;
          }
          else
          {
            card.cycleTime = 0;
          }
        });
      });
      $scope.closedCards = data;
    }

  });
})();