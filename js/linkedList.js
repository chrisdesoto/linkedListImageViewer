$(document).ready(function () {
	
	/*
	LinkedList methadology functions
	*/

	//The model for the DoublyLinkedList node. *Not a constructor*
	var node = {
	  src: "",
	  next: null,
	  previous: null  
	};
	
	//The LinkedList constructor. This.current is used to step through the list in the image viewer.
	//To simply iterate through the list, a local variable current is used in each respective method.  
	var DoublyLinkedList = function(){
	   this.head = null;
	   this.current = null;
	   this.isFirst = true;
	};
	
	//The addLast method
	DoublyLinkedList.prototype.addLast = function(val){
		//Use local pointer current to iterate through the list.
	   var current = this.head;
	   //If head is null, then there are no items in the list.
	   if(this.head == null){
	   	//Add new value to head.
	      this.head = {src: val, previous:null, next:null};
	      //Assign head as the current element
	      this.current = this.head;
	   }
	   //Else iterate through the list till the end is reached
	   else{
	      while(current.next){
	         current = current.next;
	      }
	      //Assign the new node to the last (current) item's .next       
	      current.next = {src: val, previous:current, next:null};	  
	   }
	};
	
	//The addFirst method
	DoublyLinkedList.prototype.addFirst = function (val) {
		//Use local pointer current to iterate through the list.		
	   var current = this.head;
	   //If head is null, then there are no items in the list.
	   if(this.head == null){
	   	//Add new value to head.
	      this.head = {src: val, previous:null, next:null};
	      //Assign head as the current element.
	      this.current = this.head;
	   }
	   //Else add new node as the new head of the list.
	   else{
	      current = {src: val, previous:null, next:null};
	      current.next = this.head;
	      this.head.previous = current;
	      this.head = current;
	   }
	};
	
	//The removeFirst method
	DoublyLinkedList.prototype.removeFirst = function () {
		//If the head's .next is null, then there is only one item in the list.
		if (this.head.next == null) {
			//Remove head by assigning it's value to null.
			this.head = null;
			//Same for current.
			this.current = null;
			//The next new node added to the list will be the first, so set isFirst to true.
			this.isFirst = true;	
			//Return null		
			return null;
		}
		//Else the head will be removed and head.next will become the new head.
		else{
			//Grab the node that is to be removed
			var formerHead = this.head;
			//If this.current is also this.head, move this.current down.
			if (this.current == this.head) {
				this.current = this.head.next;
			}
			//Reassign this.head node.
			this.head = this.head.next;
			this.head.previous = null;
			//Return the removed head node.
			return formerHead;
		}
	};
	
	//The removeLast method
	DoublyLinkedList.prototype.removeLast = function () {
		//If the head's .next is null, then there is only one item in the list.
		if (this.head.next == null) {
			//Remove head by assigning it's value to null.
			this.head = null;
			//Same for current.
			this.current = null;
			//The next new node added to the list will be the first, so set isFirst to true.
			this.isFirst = true;	
			//Return null		
			return null;
		}
		//If the head's .next.next is null, then there are two items in the list.
		else if (this.head.next.next == null) {
			//If this.current is also this.head.next, move this.current up.
			if (this.current == this.head.next) {
				this.current = this.head;
			}
			//Grab the node to be removed.
			var removedNode = this.head.next;
			//Reassign this.head.next and cut the second element out of the list.
			this.head.next = null;
			//Return the removed node.
			return removedNode;
		}
		//Else there are at least three items in the list.		
		else {
			//Three pointers iterate through the list on different levels.
			//currentNode will reach the end of the list with a null value.
			//oneAbove and twoAbove will be its previous nodes.
			var currentNode, oneAbove, twoAbove;
			//Step currentNode down 2 nodes, oneAbove down 1 node, 
			//twoAbove stays at this.head.
			currentNode = oneAbove = twoAbove = this.head;
			currentNode = currentNode.next;
			oneAbove = currentNode;
			currentNode = currentNode.next;
			//While currentNode has not reached the end of the list.
			while (currentNode && currentNode.src != null){
				//Step each pointer down 1 node.
				twoAbove = oneAbove;
				oneAbove = currentNode;
				currentNode = currentNode.next;
			}
			//If this.current is at the node to be removed, move it up 1.
			if (this.current == oneAbove) {
				this.current = twoAbove;			
			}	
			//Reassign twoAbove to null, cut off the last node in the list (oneAbove).
			twoAbove.next = null;	
			//Return the removed node.
			return oneAbove;			
		}
	};
	
	//The peek method
	DoublyLinkedList.prototype.peek = function () {
		return this.head;
	};
	
	//The next method
	DoublyLinkedList.prototype.next = function () {
		//If this.current is not at the end of the list, then step down once. 
		if (this.current.next && this.current != null) {
			this.current = this.current.next;
			//Return the current node.
			return this.current;
		}
	};
	
	//The previous method
	DoublyLinkedList.prototype.previous = function () {
		//If this.current is not at the beginning of the list, then step up once. 
		if (this.current.previous && this.current != null) {
			this.current = this.current.previous;
			//Return the current node.			
			return this.current;
		}
	};
	
	//The iterate method
	DoublyLinkedList.prototype.iterate = function () {
		//Iterate through until the current == null. 
		var current = current.previous = this.head;
		while (current && current.src != null){
			current.previous = current;
			current = current.next;
		}
		//Return the last node in the list.
		return current.previous;
	};

	//Declare and initialize the list. 
	var myList = new DoublyLinkedList();
	//Set the fade time for the image viewer.
	var fadeTime = 400;	

	/*
	HTML Viewer Functions
	*/
	
	//The next function
	$("#next").click(function () {
		//Call myList.next() to step forward through the list. 
		//The current is returned and assigned to theNext.
		var theNext = myList.next();
		//If theNext.next is null, the theNext is the end of the list.
		if (theNext != null && theNext.next == null){
			//Fade out the image viewer's current image, assign the next image, and fade it in.
			$("#image").fadeOut(fadeTime,"swing",
				function () {
					$("#image").attr("src", theNext.src);
				});
		   $("#image").fadeIn(fadeTime);			
			//Set the thumbnails
			$("#image-next").attr("src", "img/null.png");
			$("#image-previous").attr("src", theNext.previous.src);
		}
		//Else if the theNext is not null, then there are more list items.
		else if (theNext != null) {
			//Fade out the image viewer's current image, assign the next image, and fade it in.
			$("#image").fadeOut(fadeTime,"swing",
				function () {
					$("#image").attr("src", theNext.src);
				});
		   $("#image").fadeIn(fadeTime);
		   //Set the thumbnails
		   $("#image-next").attr("src", theNext.next.src);
			$("#image-previous").attr("src", theNext.previous.src);		   		   
		}
		//Else do nothing. The end of the list has already been reached. 
		else{		
		}
		
	});
	
	$("#previous").click(function () {
		//Call myList.previous() to step backwards through the list. 
		//The current is returned and assigned to thePrevious.
		var thePrevious = myList.previous();
		//If thePrevious.previous is null, the thePrevious is the end of the list.
		if (thePrevious != null && thePrevious.previous == null){
			//Fade out the image viewer's current image, assign the previous image, and fade it in.
			$("#image").fadeOut(fadeTime,"swing",
				function () {
					$("#image").attr("src", thePrevious.src);
				});
		   $("#image").fadeIn(fadeTime);			
			//Set the thumbnails
			$("#image-previous").attr("src", "img/null.png");
		   $("#image-next").attr("src", thePrevious.next.src);	  		    		   				
		}		
		//Else if the thePrevious is not null, then there are more list items.						
		else if (thePrevious != null) {	
			//Fade out the image viewer's current image, assign the previous image, and fade it in.
			$("#image").fadeOut(fadeTime,"swing",
			function () {
				$("#image").attr("src", thePrevious.src);
			});
	   	$("#image").fadeIn(fadeTime);
	   	//Set the thumbnails
	   	$("#image-previous").attr("src", thePrevious.previous.src);	
		$("#image-next").attr("src", thePrevious.next.src);	  		    		   			
		}
		//Else do nothing. The beginning of the list has already been reached. 
		else{   		 				
		}		
	});
	
	//The remove first function
	$("#remove-first").click(function () {
		//Remove the head node in the list and assign it to the pointer.
		var removedHead = myList.removeFirst();
		//If the removed node is null, then the list is empty.
		if (removedHead == null) {
			//Clear the image viewer.
			$("#clear").click();	
		}
		//Else if the removed node's image is the image currently displayed, then..	
		else if($("#image").attr("src") == removedHead.src){
			//Set the displayed image to the list's new head.
			$("#image").attr("src", myList.head.src);
			//If the new head's next is not null, then..
			if (myList.head.next != null) {
				//Set the next thumbnail to the new head's next src.
				$("#image-next").attr("src", myList.head.next.src);
			}
			//Else the new head's next is null.
			else {
				//Set the next thumbnail to the null image. 
				$("#image-next").attr("src", "img/null.png");
			}
		}
		//Else if the removed node's image is the previous thumbnail, then
		else if ($("#image-previous").attr("src") == removedHead.src) {
			//Set the next previous to the null image. 
			$("#image-previous").attr("src", "img/null.png");
		}
		
	});
	
	//The remove last function
	$("#remove-last").click(function () {
		//Remove the last node in the list and assign it to the pointer.
		var removedNode = myList.removeLast();
		//If the removed node is null, then the list is empty.
		if (removedNode == null) {
			//Clear the image viewer.
			$("#clear").click();	
		}
		//Else if the removed node's image is the image currently displayed, then..
		else if($("#image").attr("src") == removedNode.src){
			//Display the previous image.			
			$("#image").attr("src", myList.current.src);	
			//Set the next thumbnail to the null image.		
			$("#image-next").attr("src", "img/null.png");	
			//If current.previous is null, then it is also the head.		
			if (myList.current.previous == null) {
				//Set the previous thumbnail to the null image.
				$("#image-previous").attr("src", "img/null.png");	
			}
			//Else set the previous thumbnail to the previous image.
			else{				
				$("#image-previous").attr("src", myList.current.previous.src);
			}			
		}
		//Else if the removed node's image is the next thumbnail, then
		else if ($("#image-next").attr("src") == removedNode.src) {
			//Set the next thumbnail to the null image.
			$("#image-next").attr("src", "img/null.png");
		}
		
	});
	
	//The display list function
	$("#display-list").click(function () {
		//If the list head is null, then the list is empty. Break out of the branching statement.
		if(myList.head == null){
			return;		
		}
		//Else if the modal is hidden, then
		else if ($('#modal2').css("display") == "none") {
			//Clear the html.
			$("#modal-display-list").html("");
			//Open the modal.
			$('#modal2').openModal();
			//Iterate through the list and create a div and img from each node's src.
			var current = myList.head;
			while (current != null){
				$("#modal-display-list").append("<div class='col s12 center'><img class='z-depth-4 responsive-img display-item' src='" + current.src + "' alt=''></div>");		
				current = current.next;	
			}
		}
		//Else the modal is not hidden, do nothing. 
	});
	
	//The peek function
	$("#peek").click(function (){
		//Set the image source to the list's head.
		$("#peek-image").attr("src", myList.head.src);
		//Open the modal.
		$('#modal3').openModal();
	});
	
	//The clear function
	$("#clear").click(function () {	
		//Clear the list
		myList.head = null;
		myList.current = null;
		myList.isFirst = true;
		//Clear the image veiwer
		$("#image").attr("src", "img/placeholder.jpg");
		$("#image-next").attr("src", "img/null.png");
		$("#image-previous").attr("src", "img/null.png");
	});
	
	//The setImage function
	var setImage = function() {
		//The function is called each time an image is added to the list.
		//If the image to be added will also be the first node in the list. 
		if(myList.isFirst){
			//Assign its src to the image viewer's main image src.
			$("#image").attr("src", myList.head.src);
			//The list now has at least one node, so set isFirst to false. 
			myList.isFirst = false;
			//Set the list's current node to the list's head node.
			myList.current = myList.head;
		}
		//Else the image will not be the first node.
		else{
			//Set the image viewer's next thumbnail image to the list's current.next.src.
			$("#image-next").attr("src", myList.current.next.src);
		}
	}
	
	/*
	Various button functionality
	*/
	
	$("#upload-div").click(function(){
		$("#files").click();
	});
	
	$("#image-previous").click(function(){
		$("#previous").click();
	});
	
	$("#image-next").click(function(){
		$("#next").click();
	});

	$("#display-icon").click(function(){
		$("#display-list").click();
	});		
	
	$(document).keyup(function(event){
		if(event.keyCode == 39){		
			$("#next").click();
		}
	}); 
	
	$(document).keyup(function(event){
		if(event.keyCode == 37){		
			$("#previous").click();
		}
	}); 
	
	$(document).keyup(function(event){
		if(event.keyCode == 38){		
			$("#display-list").click();
		}
	}); 
	
	$(document).keyup(function(event){
		if(event.keyCode == 40){	
			 $('#modal2').closeModal();
		}
	}); 
	
	//Modal functionality and a call to open the add file modal on page load.
	$('.modal-trigger').leanModal();
	$('#modal1').openModal();	

	/*
	File input/processing
	*/    
	        
	//Check File API support.
	if(window.File && window.FileList && window.FileReader) {
	  //The process file function.  	
 	  var processFiles = function(files){
 	    //For each file to passed.
 	    for(var i in files){
 	  		//Grab the current file.
         var file = files[i];            
         //If file is not an image, then discard it.
         if(!file.type.match('image'))
           continue;
         //Create a FileReader object.
         var picReader = new FileReader();
         //When the FileReader has loaded.
         picReader.addEventListener("load",function(event){
           //Pass the event to the FileReader      
           var picFile = event.target;
           //Add the read in image to the list.
           myList.addLast(picFile.result);
           //Set the image viewer.    
		setImage();             
         });             
         //Read the image (asynchronously).
         picReader.readAsDataURL(file);         
       }      	  
 	  };
	  //Grab the input element and assign it to filesInput.	
     var filesInput = document.getElementById("files");
     //When the status of the input changes..
     filesInput.addEventListener("change", function(event){
       //Grab the file list from the input event and assign to files.
       var files = event.target.files; 
	   //Call the processFiles function and pass it the file list.
	   processFiles(files);         
     });
     //When a dragover event is triggered..
     window.addEventListener("dragover", function(e){
       //Prevent the default action
	   e = e || event;
	   e.preventDefault();
	 },false);
	 //When a drop event is triggered..
	 window.addEventListener("drop", function(e){
	   //Prevent the default action.
	   e = e || event;
	   e.preventDefault();
	   e.stopPropagation();
	   //Grab the events data transfer.
	   var dt = e.dataTransfer;
	   //Grab the files from the data transfer.
       var files = dt.files;
       //Call the processFiles function and pass it the file list.
       processFiles(files);  	  	                            		  		  
	 },false);	  
   }
   //Else File API not supported.
   else {
	  console.log("Your browser does not support File API");
   }
	 
});
