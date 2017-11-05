 /*
 * Write your JS code in this file.
 */
 /*------------------------------------------------------------------------*/

var posts = [];
window.onload = function(){ 
    var content = document.getElementsByClassName('post');
	for(i =0; i < content.length; i++){ 
		posts.push(content[i]);
	}
	collectPosts();
}

/* collects all the posts in the window*/
function collectPosts(){
	var result  = [];
	var content = document.getElementsByClassName('post');
	for(i =0; i < content.length; i++){ 
		result.push(content[i]);
	}
	return result;
}

/*Adds all post back to the page*/
function addAllPost(){
	for(i = 0; i < posts.length; i++){//
		document.getElementById("posts").appendChild(posts[i]);
	}
}

/*Removes post form window*/
function removePost(arr,index){
	document.getElementById("posts").removeChild(arr[index]);
	return true;
}
 

/*check price Filter*/
function setPriceFilter(minPrice,maxPrice, arr){
	var price = null;	
	for(var i=0; i < arr.length; i++){
		price = parseInt(arr[i].getAttribute('data-price'));
		if(!isNaN(maxPrice) && isNaN(minPrice)){
			if(price >  maxPrice){
				removePost(arr,i);
			}
		}else if(!isNaN(minPrice) && isNaN(maxPrice)){
			if(price <  minPrice){
				removePost(arr,i);
			}
		}else if(!isNaN(minPrice) && !isNaN(maxPrice)){
			if(price >  maxPrice || price <  minPrice){
				removePost(arr,i);
			}
		}
	}
}

/*filter using condition*/
function setConditionFilter(filter, arr){
	condition= null;
	for(var i=0; i < arr.length; i++){
		condition = arr[i].getAttribute('data-condition');
		if(filter.length > 0 && !filter.includes(condition)){
			removePost(arr,i);
		}
	}
}

/*Text Filter*/
function setTextFilter(input, arr){
	text = null;
	if(input.trim() != ""){
		input = input.toLowerCase().trim().split(" ");	
		for(var i=0; i < arr.length; i++){
			text = arr[i].textContent.toLowerCase().trim().split(" ");		
			for(var j=0; j < text.length; j++){//[h,r,t]
				if(input.includes(text[j])){
					break;
					
				}else if(j+1 == text.length && !input.includes(text[j]) ){
					removePost(arr,i);
				}
			}
		}
	}
}

/*filter using city*/
function setCityFilter(choice, arr){
	city= null;
	for(var i=0; i < arr.length; i++){
		city = arr[i].getAttribute('data-city');
		if(choice != "" && choice != city){
			removePost(arr,i);
		}
	}
}


/*get checked items from check box in a list*/
function getCheckedBox(fieldset){	
	var checkedValue = []; 
	var inputElements = document.getElementsByName(fieldset);
	for(var i=0; i<5; ++i){
		  if(inputElements[i].checked == true){
			   checkedValue.push(inputElements[i].value);
		  }
	}
	return checkedValue;
}
/*apply all filters*/
function applyFilter(fText, minP, maxP, fCity, checkedItems){
	addAllPost();
	setTextFilter(fText, collectPosts());
	setPriceFilter(parseInt(minP),parseInt(maxP), collectPosts());
	setCityFilter(fCity, collectPosts());
	setConditionFilter(checkedItems,collectPosts());
		
}

//When closing the modal
function closeModal() {
	//reset all the input text
	document.getElementById("post-text-input").value = "";
	document.getElementById("post-photo-input").value = "";
	document.getElementById("post-price-input").value = "";
	document.getElementById("post-city-input").value = "";
	document.getElementById("post-condition-new").checked = true;
	//add div to hidden
	document.getElementById("sell-something-modal").classList.add('hidden');
	document.getElementById("modal-backdrop").classList.add('hidden');
}

//check if we have the right info
function checkEmpty(){
	var inputs = document.querySelectorAll('.modal-body input')
	for(i =0; i < 4; i++ ){
		if(inputs[i].value == ""){
			alert("Please Enter all the Information");
			return false;
		}
	}
	return true;
}

//check and add city to city selction 		
function addCity(newCity){
	var filterCity = document.getElementById("filter-city");
	var cityList = filterCity.length;
	for (i = 0; i < cityList; i++) {
		if("Hello" == filterCity.options[i].text){
			break
		}else if(i+1 == cityList){
			filterCity.options.add(new Option(newCity, newCity));
		}		
	}
}

//creat a post
function creatPost(){
	var post = document.createElement('div');
	post.classList.add('post');
	var input = document.getElementById("post-text-input").value;
	var price = document.getElementById("post-price-input").value;
	var city = document.getElementById("post-city-input").value; 
	var img_src = document.getElementById("post-photo-input").value;
	post.setAttribute("data-price", price);
	post.setAttribute("data-city", city);
	post.setAttribute("data-condition", getCheckedBox('post-condition'));
	var contents = document.createElement('div');
	contents.classList.add('post-contents');
	post.appendChild(contents);
	var container = document.createElement('div');
	container.classList.add('post-image-container');
	contents.appendChild(container);
	img = document.createElement('img');
	img.setAttribute("src", img_src);
	img.setAttribute("alt", input);
	container.appendChild(img);
	var info = document.createElement('div');
	info.classList.add('post-info-container');
	contents.appendChild(info);
	var description = document.createElement('a');
	description.setAttribute("href", "#");
	description.classList.add('post-title');
	description.textContent = input;
	info.appendChild(description);
	var priceDescription = document.createElement('span');
	priceDescription.classList.add('post-price');
	priceDescription.textContent = price;
	info.appendChild(priceDescription);
	var cityDescription = document.createElement('span');
	cityDescription.classList.add('post-city');
	cityDescription.textContent = "(" + city + ")";
	info.appendChild(cityDescription);	
	
	if(checkEmpty()){
		document.getElementById('posts').appendChild(post);
		addCity(city);
		posts.push(post);
		closeModal();
	}
	
}

 /*When update button is pressed*/
var update = document.querySelector('.action-button');
update.addEventListener('click', 
	function (event) {
		var filterText = document.getElementById("filter-text").value;
		var min = document.getElementById("filter-min-price").value;
		var max = document.getElementById("filter-max-price").value;
		var filterCity = document.getElementById("filter-city").value;
		applyFilter(filterText, min, max, filterCity,getCheckedBox('filter-condition'));
	}	
);

//When the add button is pressed
var add = document.querySelector('#sell-something-button');
add.addEventListener('click', function(){
	document.getElementById("sell-something-modal").classList.remove('hidden');
	document.getElementById("modal-backdrop").classList.remove('hidden');
	
});

//when the close button is pressed in the modal
var clos = document.querySelector('#modal-close');
clos.addEventListener('click', closeModal);	
var clos = document.querySelector('#modal-cancel');
clos.addEventListener('click', closeModal);	

//when the creat button is pressed in the modal
var creat = document.querySelector('#modal-accept');
creat.addEventListener('click', creatPost);	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	