var statusController = Ember.Controller.extend({
	actions:{
   cancel: function(){
		this.transitionToRoute('eio');
   },
   save: function(){
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
        data :'{"companyName":"Apple","firstName":"Uma","lastName":"TG","email":"uma@yahoo.com","ipAddress":"127:2:1:0","orderId":"1-201682480", "rejCode":"2","rejReason":"reject","title":"Y!", "status":"1","phone":"408-349-1402"}',
        success: function () {
          Em.$('#userDataModal').modal('hide');
        },
        error:function(){
          Em.$('#userDataModal').modal('hide');
        }
    });
   }
  }
});

export default statusController;