define("appkit/views/eio", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var MyOwnView = Ember.View.extend({
      templateName: 'eio',
        didInsertElement: function() {
          var ord = this.get('controller').get('ord');
          console.log('Lang value is: ',ord);
          console.log("first Object",ord[0]);
          console.log("Second Object",ord[1]);
          console.log("Json Object for First  Object",ord[0]);
          eval('jsonData0 =',ord[0].responseText);
          console.log("Json Object for Second  Object",ord[1]);
          eval('jsonData1 =',ord[1].responseText);
          
              $(document).ajaxSend(function(event, request, settings) {
          $('#busy-overlay').removeClass('hidden');
        });
        $(document).ajaxComplete(function(event, request, settings) {
          $('#busy-overlay').addClass('hidden');
        });
    
          if(ord !=='undefined'){	
            $(".collapse").collapse();
            $('#orderid').html(ord.io.id);
            $('#campaignName').html(ord.io.coCampaignName);
            $('#clientRef').html(ord.io.clientRefNo);
            //$('date').html(ord.io.)
            if(ord.io.status.statusDesc =='Presented'){
              $(".label").addClass('label-info');
            }
            if(ord.io.status.statusDesc =='Accepted'){
              $(".label").addClass('label-success');
            }
            if(ord.io.status.statusDesc =='Expired'){
              $(".label").addClass('label-warning');
            }
            if(ord.io.status.statusDesc =='Rejected'){
              $(".label").addClass('label-danger');
            }
            $('#status').html(ord.io.status.statusDesc);
            if(ord.io.status.statusDesc !== 'Presented'){
              $('#decision').hide();
            }
          }else{
            $('#OrderDetails').html('');
            $(".alert").alert('close');
          }
        }
    });
    
    __exports__["default"] = MyOwnView;
  });