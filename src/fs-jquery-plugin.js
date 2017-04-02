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
				var key = el.attr('name');
				
				//if name attribute is not defined then return;
				if(!key) return;

				key = key.trim();
				
				var value = el.val().trim();
				//check if it is dropdown
				if(el.is('select'))/* <-- http://stackoverflow.com/questions/11416261/how-can-i-check-if-an-element-is-a-drop-down-list-element-or-a-text-input-elemen*/ 
				{
					serializedForm[key] = value;	
				} else {
					var type = (el.attr('type') || "text").trim();
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
					/**
						In case of array of string: encodeURIComponent() will automatically
						convert it into string separeted by comma(',')

						e.g: ["value1", "value2"] --> "value1%2Cvalue2"
					*/
					var value = encodeURIComponent(this.serialized[key])
					
					if(typeof(value) == "string") { //single value
						serializedString += ("&"+key+"="+value);
					} else if(typeof(value) == "object") { // multiple values
						serializedString += ("&"+key+"="+value);
					}
				}
				return serializedString.substring(1);
			} else {
				var serializedString = "";
				for(var key in this.serialized) {
					var value = this.serialized[key];
					if(typeof(value) == "string") { //single value
						value = encodeURIComponent(value);
						serializedString += ("&"+key+"="+value);
					} else if(typeof(value) == "object") { // multiple values
						for(var v in value) { // convertion of multiple values to multiple (key=value) pairs
							v = encodeURIComponent(v);
							serializedString += ("&"+key+"="+v);
						}
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
	
	//Saving jQuery's default "serialize()" implementation()
	$.fn._serialize_default = $.fn.serialize;

	$.fn.serialize = function(options) {

		if(!options) return this._serialize_default();

		var settings = {
			type: "",
			inputSelector: ":input"
		}

		if("object" == typeof(options)) {
			$.extend(settings, options);
		} else if ("string" == typeof(options)) {
			$.extend(settings, {type: options});
		}

		var serializer = new Serializer({inputSelector: settings.inputSelector});
		serializer.serialize(this);
		
		//if type is not defined the we will return normal serialize response, but if custome
		//`inputSelector` is defined then we can not use jQuery's default implementation.
		if(!settings.type && settings.inputSelector != ":input") 
			return serializer.getAsQueryString(false)
		else if(!settings.type && settings.inputSelector == ":input") 
			return this._serialize_default(); //using jQuery's default implementation

		if(settings.type) {
			var stringConfigMap = {
				'json': serializer.getAsJson,
				'queryString': serializer.getAsQueryString
			}
			// 'true' argument here is for "serializer.getAsQueryString" only.
			return stringConfigMap[settings.type].call(serializer, true);
		};
	};

	// $.fn.populate = function(dataObjectOrQueryString) {
		// serialize.populate(this, dataObjectOrQueryString)
	// }

}(jQuery))