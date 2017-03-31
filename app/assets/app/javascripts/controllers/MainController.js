var signup = angular.module('signup',[]);
var login = angular.module('login',[]);
var note = angular.module('note', []);
var archive1 = angular.module('archive1',[]);
var trash= angular.module('trash',[]);
var rem=angular.module('rem',[]);

archive1.controller("archiveController", function ($scope, $http) {
    $scope.delA = function (id) {
        data = {id:id};
        if (window.confirm("Are you sure?")) {
            $http.post('delA', data)
                .success(function (data) {
                    $scope.getArchive();
                });
        }
    };
    $scope.getArchive = function () {
        $http.get('getArchive')
            .success(function (data) {
                $scope.posts = data;});
    };
    $scope.getArchive();

    $scope.unarchive = function (id) {
        var data = {id: id};
        if (window.confirm("Are you sure?")) {
            $http.post('unarchive', data)
                .success(function (data) {
                    $scope.getArchive();
                });
        }
    };

});

trash.controller("trashController", function ($scope, $http) {
    $scope.delT = function (id) {
        data = {id:id};
        if (window.confirm("Are you sure?")) {
            $http.post('delT', data)
                .success(function (data) {
                    $scope.getTrash();
                });
        }
    };
    $scope.getTrash = function () {
        $http.get('getTrash')
            .success(function (data) {
                $scope.posts = data;});
    };
    $scope.getTrash();
    $scope.movetonote = function (id) {
        var data = {id: id};
        if (window.confirm("Are you sure?")) {
            $http.post('movetonote', data)
                .success(function (data) {
                    $scope.getTrash();
                });
        }
    };
});

note.controller("noteController", function ($scope, $http) {
    $scope.sendData = function () {
        if (!($scope.title == undefined && $scope.content == undefined)) {
            var data = {user: $scope.user, title: $scope.title, content: $scope.content,reminder: $scope.reminder,isArchive:0,isTrash:0};
            $http.post('addPost', data)
                .success(function (data) {
                    $scope.getPosts();
                });
            delete $scope.title;
            delete $scope.content;
            delete $scope.reminder;
        }
    };
    $scope.del = function (id) {
        data = {id:id};
        if (window.confirm("Are you sure?")) {
            $http.post('del', data)
                .success(function (data) {
                    $scope.getPosts();
                });
        }
    };
    $scope.archive = function (id) {
        var data = {id: id};
        if (window.confirm("Are you sure?")) {
            $http.post('archive', data)
                .success(function (data) {
                    $scope.getPosts();
                });
        }
    };


    $scope.getPosts = function () {
        $http.get('getPosts')
            .success(function (data) {
                $scope.posts = data;
                var now = new Date();
                var posArray={};
                for (var i = 0; i < ($scope.posts).length; i++) {
                    posArray[i] = $scope.posts[i].id;
                }

                for (var p = 0; p < ($scope.posts).length; p++) {
                    var date = new Date(($scope.posts[p]).reminder);
                    var title = $scope.posts[p].title;
                    var id = $scope.posts[p].id;
                    var x = (date.getTime() - now.getTime());
                    if (x > 0) {
                        timeOut = setTimeout(function ()
                        {
                            alert("Hi! Akash you have some work related to " + title);
                        }, x);
                    }
                }
            });
    };

    $scope.getPosts();

});

rem.controller("ReminderHttpGetController", function ($scope, $http) {

    $scope.getReminder = function() {
        $http.get('getReminder')
            .success(function(data) {

                $scope.postsReminder = data;});
    };
    $scope.getReminder();
});


login.controller("loginController", function ($scope, $http, $location) {
    $scope.login = function() {
        var data = {
            userEmail: $scope.email,
            userPassword: $scope.password
        };
        $http.post('/', data)
            .success(function (data) {
                location.href = '/note';
            })
            .error(function (data) {
                $scope.alertMessage=data;
            })
    };
});

signup.controller("SignupController", function ($scope, $http) {
    $scope.signup = function() {
        var regex = /^[a-zA-Z ]{2,30}$/;
        if (!(regex.test($scope.userName))) {
            $scope.alertMessage="Name should not contain numbers or special characters!";
        }
        else {
            var data = {
                userName: $scope.userName,
                userEmail: $scope.userEmail,
                userPassword: $scope.userPassword
            };
            $http.post('regis', data)
                .success(function (data) {
                    location.href = '/note';
                })
                .error(function (data) {
                    $scope.alertMessage = data;
                })
        }
    };

});
