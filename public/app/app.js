(function () {
  "use strict";

  /* global angular */

  String.prototype.shuffle = function () {
    var a = this.split(""),
      n = a.length;
    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  };

  function PasswordService() {
    var defaults = {
      passwdLength: 24,
      nUpper: 1,
      nLower: 1,
      nNumeric: 1,
      nSpecial: 1,
      specialCharset: "!@#$%^*()-_=+"
    };

    function buildCharset(n, src) {
      var retVal = "";

      for (var i = 0; i < n; ++i) {
        retVal += src.charAt(Math.floor(Math.random() * src.length));
      }

      return retVal;
    }

    function generatePassword(options) {
      var charset = "abcdefghijklnopqrstuvwxyz",
        upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numCharset = "0123456789",
        passwdCharset = "";

      var nAlpha =
        options.passwdLength -
        options.nUpper -
        options.nNumeric -
        options.nSpecial;

      passwdCharset += buildCharset(nAlpha, charset);
      passwdCharset += buildCharset(options.nUpper, upperCharset);
      passwdCharset += buildCharset(options.nNumeric, numCharset);
      passwdCharset += buildCharset(options.nSpecial, options.specialCharset);

      return passwdCharset.shuffle();
    }

    return {
      defaults: defaults,
      generatePassword: generatePassword
    };
  }

  function PasswordController(PasswordService) {
    var vm = this;

    vm.options = angular.copy(PasswordService.defaults);

    vm.generate = function () {
      vm.passwdField = PasswordService.generatePassword(vm.options);
      vm.selectPasswd = true;
    };
  }

  PasswordController.$inject = ["PasswordService"];

  function passwdSelect() {
    function link($scope, $elem) {
      $scope.$watch("trigger", function (newValue) {
        if (typeof newValue === "boolean" && newValue) {
          $elem[0].select();
          $scope.trigger = false;
        }
      });
    }

    return {
      link: link,
      restrict: "A",
      scope: {
        trigger: "=passwdSelect"
      }
    };
  }

  angular
    .module("passwd", ["ngAnimate"])
    .factory("PasswordService", PasswordService)
    .controller("PasswordController", PasswordController)
    .directive("passwdSelect", passwdSelect);
})();