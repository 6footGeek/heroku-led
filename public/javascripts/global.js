// Userlist data array for filling in info box
var ledListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    //deleteLED();
    //LED ID link click
    $('#ledList table tbody').on('click', 'td a.ledInfo', showLEDinfo);

    //ADD led add click
    $('#btnAddLED').on('click', addLED);

    $('#ledlist table tbody').on('click', 'td a.deleteLINK', deleteItem);



});


// Functions =============================================================

// function createCubeSolid() {
    
//     var cubesize = 4;
//     var id = 0;
//       // cube of cubes! 4 * 4 * 4 but set amount via cubesize
//             for (var x = 0; x < cubeSize; x++) {
//                 for (var y = 0; y < cubeSize; y++) {
//                     for (var z = 0; z < cubeSize; z++) {
//                         id++;
//                         var randomColor = Math.random() * 0xFFFFFF << 0;
//                         cubeData.push({
//                             "id": id,
//                             "x": x,
//                             "y": y,
//                             "z": z,
//                             "colour": 0x00FF00 
    
// }
// }
// }
// };



// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/led/list', function( data ) {

    	//add all led data to array
    	ledListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="ledInfo" rel="' + this._id + '">' + this._id + '</a></td>';
            tableContent += '<td>' + this.delay + '</td>';
            tableContent += '<td>' + this.pattern + '</td>';
            tableContent += '<td>' + this.duration + '</td>';
            tableContent += '<td><a href="#" class="deleteLINK" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into table
        $('#ledList table tbody').html(tableContent);
    });
};


//show LED info
function showLEDinfo(event) {
	event.preventDefault();
	var id = $(this).attr('rel');
	var arrayPosition = ledListData.map(function(arrayItem) {return arrayItem._id; }).indexOf(id);
    var thisLEDObject = ledListData[arrayPosition];

$('#infoID').text(thisLEDObject._id);
$('#infoDelay').text(thisLEDObject.delay);
$('#infoPattern').text(thisLEDObject.pattern);
$('#infoDuration').text(thisLEDObject.duration);
};


//ADD LED

function add(event) {
event.preventDefault();
//simple validation

var errorCount = 0;

$('add input').each(function(index, val) {
	if($(this).val() === '') {errorCount++; }
});

//make sure error count is at 0
if(errorCount === 0) {
	//if it is, make ledObject
	var newLED = {
'delay': $('#add fieldset input#inputDelay').val(),
'pattern': $('#add fieldset input#inputPattern').val(),
'duration': $('#add fieldset input#inputDuration').val(),
	}
// AJAX to post led to addled service

$.ajax({
	type: 'POST',
	data: newLED,
	url: '/led/add',
	dataType: 'JSON'
}).done(function(response) {
	//if succesful will return blank error
	if (response.msg === '') {
		//clear form
		$('#add fieldset input').val('');
		//update table
		populateTable();	
	} 
	else {
		//error handling
		alert('Error: ' + response.msg);
	}
});
}
else {
	alert('please fill in all fields)');
	return false;
}
};


// Delete User
function deleteItem(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/led/delete/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};