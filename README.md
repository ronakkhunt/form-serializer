form-serializer
===============

A Simple jQuery plug-in that helps serializing the forms in better yet simplest way possible.

Usages:
-------
1) Get form data as JSON Object.
```
	$('#formId').getAsJson()
```
2) Get form as Query String.

```
	$('#formId').getAsQueryString() //same as $('#formId').serialize()
```
But if you pass `true` flag.
```
		$('#formId').getAsQueryString(true)
```
then Instead of this kind of Query String: 
```
	hobby=football&hobby=tennis //output of $('#formId').serialize()
```
it will return this: 
```
	hobby=football,tennis // output of $('#formId').getAsQueryString(true)
```