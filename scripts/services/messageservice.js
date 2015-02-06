'use strict';

angular.module('chattyApp')
  .service('MessageService', function MessageService($http) {

  	var messageUrl = 'http://127.0.0.1:8834';
   
   	 this.getMessages = function() {
    	return $http.get(messageUrl);
    }

    this.addMessage = function(message) {
    	return $http.post(messageUrl, message);
    }
  });
