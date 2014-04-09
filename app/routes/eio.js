var Jsonable = Ember.Mixin.create({
    getJson: function() {
        var v, ret = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                v = this[key];
                if (v === 'toString') {
                    continue;
                } // ignore useless items
                if (Ember.typeOf(v) === 'function') {
                    continue;
                }
                ret.push(key);
            }
        }
        return this.getProperties.apply(this, ret);
    }
});

var Decision = Ember.Object.extend(Jsonable,{
      "fName":"",
      "lName":"",
      "title":""
});

export default Ember.Route.extend({

  model: function(params) {
    var url ='http://ne1-eiouidev-02.adx.pool.ne1.yahoo.com:4080/api/v1/orders/' + params.ord;
    var lang = $.getJSON('/assets/resources/navigation_da-DK.json');
    var finalData = [];
    finalData.push($.getJSON(url));
    finalData.push(lang)
    return finalData;
  },
  afterModel: function(ord) {
	 
  },
  setupController: function(controller,model) {
    controller.set('ord',model);
  },
  actions: {

    accept: function(){
      var myModal = $('#tcModal');
      var modalBody = myModal.find('.modal-body');
      modalBody.load('/assets/tc/US_A_TC.html');
      var height = $(window).height() - 300;
      $('#tcModal').find(".modal-body").css("max-height", height);
      myModal.modal('show'); 
    },

    tcAccept: function() {
      Em.$('#userDataModal').modal('show');  
      //this.transitionTo('status');
    },

    error: function(){
      this.transitionTo('error');
    },
    save: function(){
      /* '{"companyName":"Apple","firstName":"Uma","lastName":"TG","email":"uma@yahoo.com",
     "ipAddress":"127:2:1:0","orderId":"1-201682480", "rejCode":"2","rejReason":"reject","title":"Y!", 
     "status":"1","phone":"408-349-1402"}*/

      var decision = Decision.create();
      decision.set('companyName',$('#cName').val());
      decision.set('firstName',$('#fName').val());
      decision.set('lastName',$('#lName').val());
      decision.set('email',$('#email').val());
      decision.set('title',$('#jTitle').val());
      decision.set('orderId',this.get('controller').get('ord').io.id);
      decision.set('phone', $('#phone').val());
      decision.set('status','1');

    $.ajax
    ({
    headers: { 
       'Accept': 'application/json',
       'Content-Type': 'application/json' 
     },
     type: "POST",
     url:'http://ne1-eiouidev-02.adx.pool.ne1.yahoo.com:4080/api/v1/order/decision',
     dataType: 'json',
     async: false,
     data : JSON.stringify(decision.getJson()),
     success: function (response) {
         Em.$('#userDataModal').modal('hide');
          $('#status').html(response.status);
          $('#decision').hide();
          $('#status').removeClass('label label-info');
          if(response.status =='Presented'){
            $('#status').addClass('label label-info');
          }
          if(response.status =='Accepted'){
            $('#status').addClass('label label-success');
          }
          if(response.status =='Expired'){
            $('#status').addClass('label-warning');
          }
          if(response.status =='Rejected'){
            $('#status').addClass('label-danger');
          }

          $.growl(response.status, {
            typ: 'success',            // 'error', 'warn', 'success' (className)
            timeout: 5000,          // how long for the growl to stay visible (ms)
            top: 70,                // start position
            right: 20,              // how many pixels to the right of the screen
            spacing: 10,            // bottom margin (spacing between growls)  
            transitionSpeed:  400   // fade in/out speed (ms)
          });
       },
       error:function(){
        Em.$('#userDataModal').modal('hide');
        $('#status').html('error');
       }
       });
      }
    }
  }); 