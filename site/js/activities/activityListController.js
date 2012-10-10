steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture')
	  .then(
	  'js/activities/activityModel.js',
      function($){

		// THE CONTROLLER SETS UP LISTENER FUNCTIONS, CALLS VIEWS AND SETS UP EVENTS
		$.Controller("Activities",{
		  "init" : function( element , options ){
		      console.log("controller:", element, options);
		      this.viewTemplate = options.viewTemplate;
			this.element.append(this.viewTemplate, Activity.findAll() )
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
		var temp = MVC.viewRoute || 'js/activities/activityListView.ejs';
		new Activities('#activityList', {viewTemplate: temp});
		
		
		
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