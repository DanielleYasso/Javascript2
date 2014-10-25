var houses = {
    "Gryffindor": [],
    "Slytherin": [],
    "Ravenclaw": [],
    "Hufflepuff": [],
    "Dumbledore's Army": []
};

var HOUSE = {
        1: "Gryffindor",
        2: "Slytherin",
        3: "Ravenclaw",
        4: "Hufflepuff",
        5: "Dumbloedore's Army"
    }

// Global variable declarations
var countIsOdd;
var fullOfStudents;
var studentHouse;
var openHouses;
var studentCount;
var dividesByFour;

$(document).ready(function() 
{
	// Variable declarations
	var countValue;
	var studentName;
	var openHouses = 4;
	studentCount = 0;
	dividesByFour = true;

	var countDiv;
	var countButton;
	var sortButton;

	var gryffDiv;
	var huffDiv;
	var ravDiv;
	var slythDiv;
	var daDiv;

	// get count div
	countDiv = $("#count");

	// get buttons
	sortButton = $("#sort_student");
	countButton = $("#set_student_count");

	// start with sorting disabled
	$(sortButton).prop("disabled", true);
    $("#student_name").prop("disabled", true);		


	$(countButton).click( function() 
	{
	    // clear houses for new sorting!
	    for (var i = 1; i <= 5; i++)
	    {
	        houses[HOUSE[i]] = [];
	        // display student under house name
	        if (i != 5)
        		$("#" + HOUSE[i]).empty();
	    }
	    

	    // get user input for count value
	    countValue = $("#student_count").val();
	    if (!countValue || countValue == NaN || countValue < 0)
	    {
	        countValue = 0;
	    }

	    // set new value for global studentCount based on input
	    studentCount = countValue;

	    // did user input odd number of students? divides by 4?
	    countIsOdd = (studentCount % 2 != 0);
	    fullOfStudents = Math.floor(studentCount/openHouses);

	    // if it's an even number, does it divide evenly by 4
	    if (!countIsOdd && countValue >= 4)
	    { 
	    	dividesByFour = (studentCount % 4 == 0);
		}

		// error checking for small values
		if (countValue <= 4)
	    {
	    	fullOfStudents = 1;
	    }

	    // Display new value of studentCount in the div
	    $(countDiv).text("Count: " + studentCount);

	    // reset student_count input field
	    $(student_count).val(0);

	    if (studentCount > 0)
	    {
	        $(sortButton).prop("disabled", false);
	        $("#student_name").prop("disabled", false);	
	    }
	});

	$(sortButton).click( function() 
	{
	    // get student name
	    studentName = $("#student_name").val();

	    // sort student into a house
	    assignHouse(studentName);

	    // Dumbledore's Army?
	    dumbledore(studentName);

	    // Display student and house
	    $("#sorted_student").text(studentName + ": " + studentHouse + "!");

	    // decrement student Count
	    studentCount--;

	    // update display of students left to sort
	    $(countDiv).text("Students to sort: " + studentCount);
		
		if (studentCount > 0)
	    {
	        $(sortButton).prop("disabled", false);
	        $("#student_name").prop("disabled", false);	
	    }
	    // Disable sort if no students to sort
	    else
	    {
	        // disable sort button when all students are sorted
	        $(sortButton).prop("disabled", true);
	        $("#student_name").prop("disabled", true);	    
	    } 

	});
});


function assignHouse(studentName)
{
    // randomly assign student to a house
    houseNum = Math.floor((Math.random() * 4) + 1);
    // check if house is full, if so, try again!
    if (isFull(HOUSE[houseNum]))
            {
                assignHouse(studentName);
            }
    else
    {
        // set name of house student was sorted into
        studentHouse = HOUSE[houseNum];

        // add student to houses object
        houses[studentHouse].push(studentName);

        // display student under house name
        $("#" + studentHouse).append("<li>" + studentName + "</li>");

        console.log(HOUSE[houseNum] + ": " + houses[HOUSE[houseNum]]);   
    } 
}

function isFull(houseName)
{
    if (houses[houseName].length >= fullOfStudents)
    {
     	
        // if odd number students, one house gets one more than others
        // update countIsOdd, so other houses don't get extra students	
        if (countIsOdd)
        {
       		countIsOdd = false;
            return false;
        }
        // if even number of students but not divisible by 4   
        if (!dividesByFour)
        {
        	dividesByFour = true;
        	countIsOdd = true;
        	return false;
        }
        
        openHouses--;
        return true;
    }
    return false;
}

function dumbledore(studentName)
{
	if (Math.floor((Math.random() * 2) + 1) == 2)
	{
		houses["Dumbledore's Army"].push(studentName);
		console.log(studentName + " added to DA");
	}
}