/*
 * TypeSpeed
 * 
 * Mohammed Sohail <sohailsameja@gmail.com>
 * Spider Inductions 2018
 *
 */

const app = angular.module("TypeSpeed", []);

app.controller("mainController", ["$http", "$scope", ($http, $scope) => {
    let loadedData;
    let correctStatus;

    let startTimer;
    let endTimer;

    $http.get("sampleText.json").then(ctx => {
        $scope.sampleText = ctx.data.text;
        loadedData = ctx.data.text.split("");
    });

    $scope.status = "Start typing to initiate timer!";
    $scope.userInputText = "";

    const startTime = (function() {
        let exec = false;

        return function() {
            if (!exec) {
                exec = true;
                startTimer = new Date();
            }
        }
    })();

    $scope.initiateProcess = function() {
        if ($scope.userInputText.length === 0 || typeof $scope.userInputText === 'undefined') {
            $scope.status = "Timer is still running!";
        } else {
            startTime();
            $scope.status = "Timer started!";
        }

        const liveData = $scope.userInputText.split("");
        const liveDataLength = $scope.userInputText.length;

        if (liveData.pop() === loadedData[liveDataLength - 1]) {
            correctStatus = true;
            $scope.bgCol = { "background-color": "rgba(76, 175, 80, 0.5)" }
        } else {
            correctStatus = false;
            $scope.bgCol = { "background-color": "rgba(255, 0, 0, 0.5)" }
        }

        if (liveDataLength === loadedData.length) {
            endTimer = new Date();

            const timeTaken = (endTimer.getTime() - startTimer.getTime()) / 1000;

            $scope.completeStatus = true;
            $scope.status = "Completed successfully!";

            $scope.timeTaken = timeTaken.toFixed(2);
            $scope.typingSpeed = (loadedData.length / timeTaken).toFixed(2);
        }
    }

    $scope.preventInput = function(tInput) {
        if (correctStatus === false && tInput.key !== "Backspace") {
            tInput.preventDefault();
        }
    }

}]);