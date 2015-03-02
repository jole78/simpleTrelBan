// Code goes here

var app = angular.module("myApp", []);

// fake trello svc
app.factory("TrelloService", function($q){

  var svc = {};

  var getRandomBoards = function(numberOfBoardss){

    return [
      {
        name: "Fake Board: " + 1
      }
    ]
  }

  svc.getBoards = function() {
    var response = $q.defer();
    var boards = getRandomBoards(3);
    response.resolve(boards);

    return response.promise;
  }

  return svc;

});



var TestController = function($scope, $q, $log, TrelloService) {

  $scope.Login = function() {

    onAuthorize();
//    Trello.authorize({
  //    type: "popup",
   //   success: onAuthorize
   // })
  };

  var onBoards = function(boards) {
    $log.info(boards);
    $scope.boards = boards;
  }

  var onMember = function(member) {

    //$scope.member = member;

    TrelloService.getBoards()
      .then(onBoards)
      .fail(onError);

    //Trello.get("members/me/boards", onBoards, onError);
  }

  var onError = function(e) {

    $scope.error = e;
  }

  var onAuthorize = function() {

    onMember();
    //Trello.members.get("me", onMember, onError);

  };

//  Trello.authorize({
 //   interactive: false,
 //   success: onAuthorize
 // });

};

app.controller("TestController", TestController);

app.directive("myBoardDetails", function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'boardDetails.html',
    scope: {
      board: '=board'
    },
    controller: function($scope) {
      $scope.getCards = function(board) {
        Trello.get("board/" + board.id + "/cards", function(result) {
          console.log(result);
          return result;
        });
        $scope.cards = [{
          name: '1'
        }, {
          name: '2'
        }]

      }
    }
  }
});