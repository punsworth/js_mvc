steal('jquery/class',
      'jquery/controller',
      'jquery/model',
      'jquery/view/ejs',
      'jquery/dom/fixture',
      function($){

		$.Model('Activity',{
				findAll : "GET /activities",
				findOne : "GET /activities/{id}",
				create  : "POST /activities",
				update  : "PUT /activities/{id}",
				destroy : "DELETE /activities/{id}"
			},
			{}
		)
  
  // THE INITIAL ARRAY OF ACTIVITIES
	var ACTIVITIES = [
		{
			id: 0,
			title: 'Golf Evening',
			time: "5:00 pm",
			day: 'Friday',
			suburb:  null,
			city: 'Oak park',
			zipcode: '60302',
			involvement: 'participation',
			type: 'sport',
			activity: 'golf',
			description: 'Need a 4th for golf'
		},
		{
			id: 1,
			title: 'Surfing Comp',
			time: "2:00 pm",
			day: 'Wednesday',
			suburb: 'Sumner',
			city: 'Christchurch',
			zipcode: '8081',
			involvement: 'independent',
			type: 'sport',
			activity: 'surfing',
			description: 'this Wednsday evening'
		}
	];
	
	// findAll
	$.fixture("GET /activities", function(orig){
	  return [ACTIVITIES]
	});
	
	// findOne
	$.fixture("GET /activities/{id}", function(orig){
	  return ACTIVITIES[(+orig.data.id)-1];
	})
	
	// create
	var id= 4;
	$.fixture("POST /activities", function(){
	  return {id: (id++)}
	})
	
	// update
	$.fixture("PUT /activities/{id}", function(){
		console.log(id);
	  return {};
	})
	
	// destroy
	$.fixture("DELETE /activities/{id}", function(){
	  return {};
	})



	// THE CONTROLLER SETS UP LISTENER FUNCTIONS, CALLS VIEWS AND SETS UP EVENTS
	$.Controller("Activities",{
	  "init" : function( element , options ){
		  var activities = Activity.findAll();
		  console.log(activities);
		this.element.append('js/activityView.ejs', Activity.findAll() )
	  },
	  "{Activity} created" : function(Activity, ev , activity){
		this.element.append('js/activityView.ejs', [activity])
	  },
	  "{Activity} updated" : function(Activity, ev , activity){
		this.element.append('js/activityView.ejs', [activity])
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
	new Activities('#activityList', {});
	
	// BIND LISTENERS
	Activity.bind('created', function(ev, singleActivity){/* callback */})
	Activity.bind('updated', function(ev, singleActivity){/* callback */})
	
	// CREATE A NEW ACTIVITY
	var singleActivity = new Activity({
		id: 1,
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