form-serializer
===============

A Simple jQuery plug-in that helps serializing the forms in better yet simplest way possible.

>**Note:** Incase when there is multiple form elements are selected, it will only serialize the first form element.

Usages:
-------
**1) Get form data as JSON Object** (by passing `type` as **json**).
```javascript
	$('#formId').serialize('json');
```
**2) Get form as Query String.**

```javascript
	$('#formId').serialize();  //same as $('#formId').serialize()
```
But if you pass `type` as **queryString**
```javascript
	$('#formId').serialize('queryString');
```
then Instead of this kind of Query String: 
```javascript
	hobby=football&hobby=tennis  //output of $('#formId').serialize()
```
it will return this: 
```javascript
	hobby=football,tennis  //output of $('#formId').serialize('queryString')
```
You can also set **custom elements selector** inside a **Form**.
```javascript
	//serialize only `input` tags' value
	$('#formId').serialize({type: 'queryString', inputSelector: 'input'}); 
```
```javascript
	//serialize only `input` tags' value which has type="text"
	$('#formId').serialize({type: 'queryString', inputSelector: 'input[type="text"]'}); 
```