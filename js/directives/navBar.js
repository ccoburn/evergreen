angular.module('app').directive('navBar', function () {
    return {
        restrict: 'E',
        templateUrl: './views/directives/navBar.html',
        link: function (scope, elem, attrs) {
            $('#save').hover(
                function () {
                    $('tip-save').addClass('fadeIn');
                })

        },
        controller: function ($scope, $rootScope, mainService, $stateParams, $location) {

            $scope.goToProjects = () => {
                if($rootScope.isLoggedIn){
                    $location.path('projects');
                }
            }
            
            $rootScope.searchKey = ""

            $scope.searchBar = (search) => {
                $rootScope.searchKey = search;

            }
            
            $scope.logProjectName = (projectName) => {
                $rootScope.projectName = projectName;
            }



            $scope.saveProject = () => {
                $rootScope.loader();
                
                $rootScope.projectName = $scope.projectName;
                $scope.logProjectName($rootScope.projectName);


                let projectData = {
                    user_id: $rootScope.userId,
                    wf_date: new Date(),
                    wf_name: $rootScope.projectName,
                    wf_text: $rootScope.canvas[0].innerHTML
                }
                
                if($stateParams.id){
                    // UPDATE PROJECT
                    projectData.wf_id = $stateParams.id;
                    projectData.fav_wf = $rootScope.projectFavVal;
                    mainService.updateProject(projectData).then((response) => {
                        $scope.updated = response;
                    });

                } else{
                    // CREATE NEW PROJECT
                    projectData.fav_wf = false;
                    mainService.createProject(projectData).then((response) => {
                        $rootScope.newPro = response.data[0];
                        $scope.newId = response.data[0].wf_id;
                        $location.url('canvas/' + $scope.newId);
                        $rootScope.isNewProject = true;
                    });

                }

                let saveSwal = {
                    title: 'Save Successful!',
                    text: 'Scribble on my scribble pal!',
                    type: 'success',
                    imageUrl: 'https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif'
                }
                $rootScope.loader(saveSwal);
            }

            $scope.logout = mainService.logout;
        }
    }
});
