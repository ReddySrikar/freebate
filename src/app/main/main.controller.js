export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getMessages();

  }
    getMessages(){
        var vm = this;
        this.$http.get("http://localhost:5000/api/message").then(function(packet){
            //console.log(packet);
            vm.messages = packet.data;
        });
    };

    postMessage(){
        //console.log("The POST form value!!");
        this.$http.post("http://localhost:5000/api/message", {stmt:this.message});
    };
}
