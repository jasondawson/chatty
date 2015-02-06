'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {
  	var vm = this;
  	vm.messages = [];
  	vm.chatInput = '';
  	vm.username = '';

  	MessageService.getMessages().then(function(res) {
    		vm.messages = res.data;
  		});

  	vm.addMessage = function() {

  		var message = JSON.stringify({
  			"text": vm.chatInput,
  			"name": vm.username});
  		//console.log(message);

  		MessageService.addMessage(message).then(function(res) {
  			vm.messages = res.data;
  			vm.chatInput = '';
  		})
  	}
  });
