angular.module('app').controller('mainCtrl', function($scope,  $document, $compile, $rootScope, $log){

	$rootScope.canvas = angular.element(document.querySelector('#canvas'));
  let toolbar = angular.element(document.querySelector('#toolbar'));
  let shapeToolbar = angular.element(document.querySelector('#shapeToolbar'));
  $scope.shapeToolbarShow = false;
  $scope.imageToolbarShow = false;
  $scope.toolbarShow = false;
  $scope.x1 = 0;
  $scope.x2 = 0;
  $scope.y1 = 0;
  $scope.y2 = 0;
  $scope.tempXLocation = 0;
  $scope.tempYLocation = 0;
  $scope.shadowX = 0;
  $scope.shadowY = 0;
  $scope.shapeHeight = 0;
  $scope.shapeWidth = 0;


  // if(!($stateParams.id)){
  //     $rootScope.projectName = 'Untitled';
  // }


  // $scope.getProject = function () {
  //   $rootScope.searchKey = "";
  //   for (let i = 0; i < $rootScope.projectsForCanvas.length; i++) {
  //     if ($rootScope.projectsForCanvas[i].wf_id === parseInt($stateParams.id)) {
  //       $scope.projectHTML = $rootScope.projectsForCanvas[i].wf_text;
  //       let template = ($scope.projectHTML);
  //       let linkFn = $compile(template);
  //       let content = linkFn($scope);
  //       $rootScope.canvas.append(content);
  //       $rootScope.projectName = $rootScope.projectsForCanvas[i].wf_name;
  //       $rootScope.projectFavVal = $rootScope.projectsForCanvas[i].fav_wf;
  //       $scope.shapeClass = angular.element(document.querySelector('#canvas'));
  //     }
  //   }
  // }
  //
  // $scope.getProject();

  // ONLY IF NEW PROJECT
  // if($rootScope.isNewProject){
  //   let newProject = $rootScope.newPro;
  //
  //   $scope.projectHTML = newProject.wf_text;
  //   let template = ($scope.projectHTML);
  //   let linkFn = $compile(template);
  //   let content = linkFn($scope);
  //   $rootScope.canvas.append(content);
  //   $rootScope.projectName = newProject.wf_name;
  //   $rootScope.projectFavVal = newProject.fav_wf;
  //   $scope.shapeClass = angular.element(document.querySelector('#canvas'));
  //   $rootScope.isNewProject = false;
  // }


  $scope.allowDraw = true;


  $scope.startDraw = function (event) {
    if ($scope.allowDraw) {
      $scope.shapeToolbarShow = false;
      $scope.imageToolbarShow = false;
      $scope.toolbarShow = false;
      $scope.x1 = 0;
      $scope.x2 = 0;
      $scope.y1 = 0;
      $scope.y2 = 0;
      $scope.tempXLocation = 0;
      $scope.tempYLocation = 0;
      $scope.shadowX = 0;
      $scope.shadowY = 0;
      $scope.shapeHeight = 0;
      $scope.shapeWidth = 0;
      $scope.showShadow = false;
      $scope.showShadow2 = false;
      $scope.tempXLocation = event.clientX;
      $scope.tempYLocation = event.clientY;
      $scope.toolbarShow = false;
      event.preventDefault();
      $document.on("mousemove", draw);
    }
  }

  function draw(event) {
    $scope.showShadow = true;
    $scope.showShadow2 = false;
    $scope.x1 = $scope.tempXLocation;
    $scope.y1 = $scope.tempYLocation;
    $scope.x2 = event.clientX;
    $scope.y2 = event.clientY;

    if ($scope.tempXLocation >= event.clientX) {
      $scope.xLocation = event.clientX
    } else {
      $scope.xLocation = $scope.tempXLocation;
    }

    if ($scope.tempYLocation >= event.clientY) {
      $scope.yLocation = event.clientY
    } else {
      $scope.yLocation = $scope.tempYLocation;
    }

    if ($scope.x2 >= $scope.x1) {
      $scope.shapeWidth = $scope.x2 - $scope.x1;
    } else {
      $scope.shapeWidth = $scope.x1 - $scope.x2;
    }
    if ($scope.y2 >= $scope.y1) {
      $scope.shapeHeight = $scope.y2 - $scope.y1;
    } else {
      $scope.shapeHeight = $scope.y1 - $scope.y2;
    }

  }

  $scope.endDraw = function (event) {
    if ($scope.allowDraw) {
      $scope.showShadow = false;
      $scope.showShadow2 = true;
      $scope.shadowX = event.clientX - $scope.tempXLocation;
      $scope.shadowY = event.clientY - $scope.tempYLocation;

      if ($scope.tempXLocation >= event.clientX) {
        $scope.shadowXLocation = event.clientX
      } else {
        $scope.shadowXLocation = $scope.tempXLocation;
      }

      if ($scope.tempYLocation >= event.clientY) {
        $scope.shadowYLocation = event.clientY
      } else {
        $scope.shadowYLocation = $scope.tempYLocation;
      }

      if ($scope.x2 >= $scope.x1) {
        $scope.shadowX = $scope.x2 - $scope.x1;
      } else {
        $scope.shadowX = $scope.x1 - $scope.x2;
      }
      if ($scope.y2 >= $scope.y1) {
        $scope.shadowY = $scope.y2 - $scope.y1;
      } else {
        $scope.shadowY = $scope.y1 - $scope.y2;
      }
      let shadowYtoolbar = $scope.shadowYLocation - 60;
      let shadowXtoolbar = $scope.shadowXLocation.toString() + "px";
      $scope.toolbarStyle = {
        "position": "absolute",
        "top": shadowYtoolbar.toString() + "px",
        "left": shadowXtoolbar
      }

      $document.unbind("mousemove", draw);
      if ($scope.shadowX > 5 || $scope.shadowY > 5) {
        $scope.toolbarShow = true;
      }
      if ($scope.shapeClass) {
        $scope.shapeClass.attr('stroke', 'black');
      }
      $scope.elementColor = "white";
    }

    $scope.allowDrawFunc();
  }

  $scope.createBox = function () {
    let template = ("<svg class='draggable' ><rect ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showRectToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />  </svg>")
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showRectToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }


  $scope.createEllipse = function () {
    let template = ("<svg width='100%' height='100%'><ellipse ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragEllipse($event)' ng-click='showEllipseToolbar($event)' cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowY / 2)) + " rx=" + ($scope.shadowX / 2) + " ry=" + ($scope.shadowY / 2) + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />    </svg>")
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showRectToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createCircle = function () {
    let template = ("<svg width='100%' height='100%'><circle ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragCircle($event)' ng-click='showCircleToolbar($event)' cx=" + ($scope.shadowXLocation + ($scope.shadowX / 2)) + " cy=" + ($scope.shadowYLocation + ($scope.shadowX / 2)) + " r=" + ($scope.shadowX / 2) + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "' />    </svg>")
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showRectToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createRoundedBox = function () {
    let template = ("<svg width='100%' height='100%'><rect ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showRectToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " rx='5' ry='5' width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' is-selected='false' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "'  />    </svg>");
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showRectToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createImageBox = function () {
    let template = ("<svg width='100%' height='100%'><image preserveAspectRatio='none' xlink:href='./images/ornament_star.png'  ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showImageToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' is-selected='false' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "'  />   </svg>");
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showImageToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createVideoBox = function () {
    let template = ("<svg width='100%' height='100%'><image preserveAspectRatio='none' xlink:href='./images/ornament_green.png'  ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showImageToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' is-selected='false' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "'  />   </svg>");
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showImageToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createScribbleBox = function () {
    let template = ("<svg width='100%' height='100%'><image preserveAspectRatio='none' xlink:href='./images/ornament_blue.png'  ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showImageToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' is-selected='false' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "'  />   </svg>");
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showImageToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.createScribbleCircle = function () {
    let template = ("<svg width='100%' height='100%'><image preserveAspectRatio='none' xlink:href='./images/ornament_red.png'  ng-mousedown='disableDrawFunc($event)' ng-mousemove='dragRect($event)' ng-click='showImageToolbar($event)' x=" + $scope.shadowXLocation + " y=" + $scope.shadowYLocation + " width=" + $scope.shadowX + " height=" + $scope.shadowY + " stroke='red' stroke-width='1' fill='white' style='opacity:0.95;cursor:move' is-selected='false' id='dynamicId" + $scope.tempXLocation + $scope.tempYLocation + "'  />   </svg>");
    let linkFn = $compile(template);
    let content = linkFn($scope);
    $rootScope.canvas.append(content);
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeClass = angular.element(document.querySelector('#dynamicId' + $scope.tempXLocation + $scope.tempYLocation))
    $scope.showimageToolbar("whatever", $scope.shadowXLocation, $scope.shadowYLocation);
  }

  $scope.allowDrawFunc = function () {
    $scope.allowDraw = true;
  }

  $scope.disableDrawFunc = function (event) {
    $scope.shapeClass.attr('stroke', 'black')
    $scope.shapeID = event.target.attributes.id.nodeValue;
    $scope.allowDrag = true;
    $scope.allowDraw = false;
    $scope.shapeToolbarShow = false;
    $scope.imageToolbarShow = false;
    $document.on('mouseup', dropShape)
    $scope.shapeClass = angular.element(document.querySelector('#' + $scope.shapeID))
    $scope.elementColor = $scope.shapeClass[0].attributes.fill.nodeValue;



    $scope.shapeClass.attr("stroke", "red")
  }

  $scope.dragRect = function (event) {
    let moveRect = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveRect.attr("x", event.clientX - (event.target.attributes.width.nodeValue / 2))
      moveRect.attr('y', event.clientY - (event.target.attributes.height.nodeValue / 2))
    }
  }

  $scope.dragEllipse = function (event) {
    let moveEllipse = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveEllipse.attr("cx", event.clientX)
      moveEllipse.attr('cy', event.clientY)
    }
  }
  $scope.dragCircle = function (event) {
    let moveCircle = angular.element(document.querySelector('#' + $scope.shapeID));
    if ($scope.allowDrag) {
      $scope.shapeToolbarShow = false;
      moveCircle.attr("cx", event.clientX)
      moveCircle.attr('cy', event.clientY )
    }
  }

  function dropShape(event) {
    $scope.allowDrag = false;
    let moveShape = angular.element(document.querySelector('#' + $scope.shapeID));
    moveShape.attr("id", ("dynamicId" + event.clientX + event.clientY));
  }

  $scope.showRectToolbar = function (event, creationX, creationY) {
    if (!creationX) {
      let shapeToolbarY = event.target.attributes.y.nodeValue -60;
      let shapeToolbarX = event.target.attributes.x.nodeValue.toString() + "px";
      $scope.shapeToolbarStyle = {
        "position": "absolute",
        "top": shapeToolbarY.toString() + "px",
        "left": shapeToolbarX
      }
    } else {
      let shapeToolbarY = creationY -60;
      let shapeToolbarX = creationX + "px";
      $scope.shapeToolbarStyle = {
        "position": "absolute",
        "top": shapeToolbarY + "px",
        "left": shapeToolbarX
      }
    }
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeToolbarShow = true;
  }

  $scope.showCircleToolbar = function (event) {
    let shapeToolbarY = (event.target.attributes.cy.nodeValue - event.target.attributes.r.nodeValue) -60;
    let shapeToolbarX = (event.target.attributes.cx.nodeValue - event.target.attributes.r.nodeValue) + "px";
    $scope.shapeToolbarStyle = {
      "position": "absolute",
      "top": shapeToolbarY + "px",
      "left": shapeToolbarX
    }
    $scope.shapeStyle = {
      "fill": $scope.elementColor,
      "stroke": "blue",
      "stroke-width": "2",
      "opacity": "0.95",
      "cursor": "move"
    }
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeToolbarShow = true;
  }

  $scope.showEllipseToolbar = function (event) {
    let shapeToolbarY = (event.target.attributes.cy.nodeValue - event.target.attributes.ry.nodeValue) - 60;
    let shapeToolbarX = (event.target.attributes.cx.nodeValue - event.target.attributes.rx.nodeValue) + "px";
    $scope.shapeToolbarStyle = {
      "position": "absolute",
      "top": shapeToolbarY + "px",
      "left": shapeToolbarX
    }
    $scope.shapeStyle = {
      "fill": $scope.elementColor,
      "stroke": "blue",
      "stroke-width": "2",
      "opacity": "0.95",
      "cursor": "move"
    }
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.shapeToolbarShow = true;
  }

  $scope.showImageToolbar = function (event, creationX, creationY) {
    if (!creationX) {
      let shapeToolbarY = event.target.attributes.y.nodeValue - 60;
      let shapeToolbarX = event.target.attributes.x.nodeValue.toString() + "px";
      $scope.imageToolbarStyle = {
        "position": "absolute",
        "top": shapeToolbarY.toString() + "px",
        "left": shapeToolbarX
      }
    } else {
      let shapeToolbarY = creationY - 60;
      let shapeToolbarX = creationX + "px";
      $scope.imageToolbarStyle = {
        "position": "absolute",
        "top": shapeToolbarY + "px",
        "left": shapeToolbarX
      }
    }
    $scope.showShadow2 = false;
    $scope.toolbarShow = false;
    $scope.imageToolbarShow = true;
  }

  $scope.changeShapeColor = function (color) {
    $scope.shapeClass.attr("fill", color);
  }

  $scope.deleteShape = function () {
    $scope.shapeClass.remove();
    $scope.shapeToolbarShow = false;
    $scope.imageToolbarShow = false;
  }


});
