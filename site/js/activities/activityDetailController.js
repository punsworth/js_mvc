steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture')
	  .then(
	  'js/activities/activityModel.js',
      function($){

		// THE CONTROLLER SETS UP LISTENER FUNCTIONS, CALLS VIEWS AND SETS UP EVENTS
		$.Controller("ActivitiesDetail",{
		  "init" : function( element , options ){
		      //console.log("controller:", Activity.findOne({id:1}));
		      this.viewTemplate = options.viewTemplate;
		      var scope = this;
		      Activity.findOne({id:options.page},
    		      function(suc){
        		      console.log("found 1", suc);
        		      scope.element.append(scope.viewTemplate, suc)
    		      },
    		      function(e){
        		      console.log("found error", e);
    /*     		      this.element.append(this.viewTemplate,  ) */
		          }
		      )
		      
		      
			
		  },
		  "{Activity} created" : function(Activity, ev , activity){
			this.element.append(this.viewTemplate, [activity])
		  },
		  "{Activity} updated" : function(Activity, ev , activity){
			this.element.append(this.viewTemplate, [activity])
		  },
			submit : function(el, ev){
			  ev.preventDefault();
			  this.element.find('[type=submit]').val('Creating...');
			  new Activities(el.formParams()).save(this.callback('saved'));
			},
			saved : function(){
			  this.element.find('[type=submit]').val('Create');
			  this.element[0].reset();
			}
		})
		
		// INITIALIZE ON PAGE LOAD
		new ActivitiesDetail('#activityDetail', {page: getUrlVars()['activity'], viewTemplate: 'js/activities/activityDetailView.ejs'});
        console.log(getUrlVars()['activity']);		
		function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

		
		
		// CREATE A NEW ACTIVITY
		var singleActivity = new Activity({
			id: 2,
			title: 'Surfing Today',
			time: "2:00 pm",
			day: 'Wednesday',
			suburb: 'Sumner',
			city: 'Christchurch',
			zipcode: '8081',
			involvement: 'independent',
			type: 'sport',
			activity: 'surfing',
			description: 'time for a wave'
		})
		
		// SAVE THE NEW ACTIVITY
		singleActivity.save();

  
  
});