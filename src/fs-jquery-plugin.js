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
			if(joinMultipleParam) {
				var serializedString = "";
				for(var key in this.serialized) {
					var value = this.serialized[key]
					
					if(typeof(value) == "string") { //single value
						serializedString += ("&"+key+"="+value);
					} else if(typeof(value) == "object") { // multiple values
						serializedString += ("&"+key+"="+value.join(","));
					}
				}
				return serializedString.substring(1);
			}
		}
		this.populate = function(formEl, dataObjectOrQueryString) {
			/** De-serializer
				Fill the value of fields in given form with given JSON object.
			*/
			if("string" == typeof(dataObjectOrQueryString)) { //query String
				//todo
			} else if("object" == typeof(dataObjectOrQueryString)) { // JSON Object
				//todo
			}
		}
	};
	var serializer = new Serializer();
	
	$.fn.getAsJson = function() {
		serializer.serialize(this);
		return serializer.getAsJson();
	};
	
	$.fn.getAsQueryString = function(joinMultipleParam) {
		if(joinMultipleParam) {
			serializer.serialize(this);
			return serializer.getAsQueryString(true);	
		}
		return this.serialize(); //using jQuery's default serialize() implementation.
	};
	
	// $.fn.populate = function(dataObjectOrQueryString) {
		// serialize.populate(this, dataObjectOrQueryString)
	// }

}(jQuery))