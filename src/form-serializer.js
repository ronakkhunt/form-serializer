(function($){
	var Serializer = function (config) {
		this.config = config || {
			inputSelector: ":input"
		}
		this.serialized = null;
		
		this.serialize = function(form) {
			var serializedForm = {}
			
			form.find(this.config.inputSelector).each(function(index, value){
				var el = $(value);
				var key = el.attr('name').trim();
				
				var value = el.val().trim();
				//check if it is dropdown
				if(el.is('select'))/* <-- http://stackoverflow.com/questions/11416261/how-can-i-check-if-an-element-is-a-drop-down-list-element-or-a-text-input-elemen*/ 
				{
					serializedForm[key] = value;	
				} else {
					var type = el.attr('type').trim();
					if(type === "radio") {
						if(el.is(':checked')) {
							serializedForm[key] = value;		
						}
					} else if(type === "checkbox") {
						if(el.is(':checked')) {
							var existingArray = serializedForm[key] || []
							existingArray.push(value);
							serializedForm[key] = existingArray;
						}
					} else {
						serializedForm[key] = value;
					}
				}
					
			});
			this.serialized = serializedForm;
		}
		this.getAsJson = function(){
			/** Returns the serialized value as JSON Object.
			*/ 
			return this.serialized;
		}
		this.getAsQueryString = function(joinMultipleParam) {
			/** Returns the serialized form as QueryString.
				if joinMultipleParam is true, then it will join value of all the fields with same name with ','
			*/
			/*Not Implemented Yet*/
		}
		this.populate = function(jsonDataObj) {
			/** De-serializer
				Fill the value of fields in given form with given JSON object.
			*/
			/*Not Implemented Yet*/
		}
	};
	var serializer = new Serializer();
	
	$.fn.getAsJson = function() {
		serializer.serialize(this);
		return serializer.getAsJson();
	}
	
	$.fn.getAsQueryString = function() {
		serializer.serialize(this);
		return serializer.getAsQueryString();
	}
}(jQuery))