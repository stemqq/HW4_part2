//File: table.js
//GUI Assignment: Using the jQuery UI Slider and Tab Widgets
//Ssuna Mulindwa, UMass Lowell Computer Science, ssuna_mulindwa@student.uml.edu
//Copyright (c) 2021 by ssunaMulindwa. All rights reserved. May be freely copied or
//excerpted for educational purposes with credit to the author.
//updated by SM on July 31, 2021 at 9:23 AM





// Check to make sure the page ready
$().ready(function () {

    // source for key up http://jsfiddle.net/sd88wucL/1/
    $('input').on('blur keup', function() {
        if($("#input-form").valid()) {
            $("#button-submit").prop('disabled', false);
        } else {
            $("#button-submit").prop('disabled', 'disabled');
        }
    });

    // validate check form for input
     $('#input-form').validate({

        //validating the input form
        rules: {
            fCol: {
                required: true,
                number: true,
                range: [-10, 10],
            },
            lCol: {
                required: true,
                number: true,
                range: [-10, 10],
            },
            fRow: {
                required: true,
                number: true,
                range: [-10, 10],
            },
            lRow: {
                required: true,
                number: true,
                range: [-10, 10],
            }
        },

        //Message for error, replace the default messages from validate function.
        messages: {
            fCol: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-10, 10]"
            },
            lCol: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-10, 10]"
            },
            fRow: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-10, 10]"
            },
            lRow: {
                required: " Error: Please enter an integer",
                number: " Error: Please enter an integer",
                range: " Error: Please value between [-10, 10]"
            }
        },

        // display error position next to slider
        errorPlacement: function(error, element) {
            switch (element.attr("name")) {
                case 'fCol':
                    error.insertAfter($("#slider1"));  // insert fater slider1
                    break;
                case 'lCol':
                    error.insertAfter($("#slider2"));  // insert fater slider2
                    break;
                case 'fRow':
                    error.insertAfter($("#slider3"));  // insert fater slider3
                    break;
                case 'lRow':
                    error.insertAfter($("#slider4"));  // insert fater slider4
                    break;
                default:
                    //nothing
            }
        },

        //create table after all the input value passed the rules
        submitHandler: function() {
            tableCreate();
            return false;
        },

        //resubmit with an invalid value, table will be empty
        invalidHandler: function() {
            $("#errorMessage").empty();
            $("#table").empty();
        }
    });

    // Slider and real time update to input value box
    $("#slider1").slider({
        range: 20, // range for slider
        min: -10,   // min value
        max: 10,    // max value
        value: 0,   // default start at 0 position
        slide: function( event, ui) {
            $('#fCol').val(ui.value);   // Update fCol input value
            $(ui.value).val($('#fCol').val());  // for real-time update when slider change
            // turn on save table button when slider move
            $("#button-submit").prop('disabled', false);
            // call create function to create table
            call_create();
        }
    });

    // this one use for change the slider if the user change value in input box
    $("#fCol").on("keyup", function () {
        var ovalue = $("#slider1").slider("option", "value");
        var nvalue = ($(this).val());
        if (isNaN(nvalue) == false || nvalue > -10 || nvalue < 10 ){
            // check if the value is in the range
            $("#slider1").slider("value", nvalue);
            // call create function to create table
            call_create();
        }
    });

    // correct input and slider
     $("#slider2").slider({
        range: 20,
        min: -10,
        max: 10,
        value: 0,
        slide: function( event, ui) {
            $('#lCol').val(ui.value);
            $(ui.value).val($('#lCol').val());
            // turn on save table button when slider move
            $("#button-submit").prop('disabled', false);
            call_create();
        }
    });

    $("#lCol").on("keyup", function () {
        var ovalue = $("#slider2").slider("option", "value");
        var nvalue = ($(this).val());
        if (isNaN(nvalue) == false || nvalue > -10 || nvalue < 10 ){
            $("#slider2").slider("value", nvalue);
            call_create();
        }
    });;

   //correct input and slider
    $("#slider3").slider({
        range: 20,
        min: -10,
        max: 10,
        value: 0,
        slide: function( event, ui) {
            $('#fRow').val(ui.value);
            $(ui.value).val($('#fRow').val());
            // turn on save table button when slider move
            $("#button-submit").prop('disabled', false);
            call_create();
        }
    });

    $("#fRow").on("keyup", function () {
        var ovalue = $("#slider3").slider("option", "value");
        var nvalue = ($(this).val());
        if (isNaN(nvalue) == false || nvalue > -10 || nvalue < 10 ){
            $("#slider3").slider("value", nvalue);
            call_create();
        }
    });

    //correct input and slider
    $("#slider4").slider({
        range: 20,
        min: -10,
        max: 10,
        value: 0,
        slide: function( event, ui) {
            $('#lRow').val(ui.value);
            $(ui.value).val($('#lRow').val());
            // turn on save table button when slider move
            $("#button-submit").prop('disabled', false);
            call_create();
        }
    });

    $("#lRow").on("keyup", function () {
        var ovalue = $("#slider4").slider("option", "value");
        var nvalue = ($(this).val());
        if (isNaN(nvalue) == false || nvalue > -10 || nvalue < 10 ){
            $("#slider4").slider("value", nvalue);
            call_create();
        }
    });

    //Create and slider when the page first open or refresh with the default values
    tableCreate();

    // call tab saver function
    TabSaver();

}); // end of input form

// check if the input passed valid check and create table
function call_create() {
    if ($("#input-form").valid() == true) {
        $("#input-form").submit();
    }
}

// create tab and delete tab when button is click
function TabSaver() {

    $("#divTabs").tabs();

    var tabCounter = 1;
    var divTabs = $("#divTabs");

    // add tabs function

    $("#button-submit").click(function() {

        if(tabCounter >= 10) {
            alert("Only 10 tabs is allowed. Please delete one or all to be able to add more");
            return false;
        }

        // numbers of tabs
        tabCounter++;

        // get to the ul tag
        var ul = $("#ulTabs");
        // get values for create tab menu title
        var fCol = Number(document.getElementById('fCol').value);
        var lCol = Number(document.getElementById('lCol').value);
        var fRow = Number(document.getElementById('fRow').value);
        var lRow = Number(document.getElementById('lRow').value);
        var title = "[" + fCol + "," + lCol + "] x " + "[" + fRow + "," + lRow + "]";

        var contentDivId = "divTab-" + tabCounter;
        var content = $("#table").html();

        /*** "Destroy" current tab widget temporarily. (...re-initialized later) ***/
        divTabs.tabs("destroy");

        /*** Add the new LI element for the tab, and point it to the content's id. ***/
        ul.html(ul.html() + "<li><a href='#" + contentDivId + "'>" + title + "</a><span class='ui-icon ui-icon-close' role='presentation'></span></li>");

        /*** Add the content that the new tab points to. ***/
        divTabs.html(divTabs.html() + "<div id='" + contentDivId + "'>" + content + "</div>");
        /*** Re-initialize the tab widget, and make the new tab the "active" one. ***/
        divTabs.tabs({ active: (tabCounter - 2) });

    });

    // delete all tabs
    $("#deteletabs").click( function() {
        var numtabs = $("#ulTabs li").length; // get the li count
        // console.log(num_tabs);
        while (numtabs > 0) {
            var panelId = $("#ulTabs li").last().remove().attr( "aria-controls" );
            $( "#" + panelId ).remove();
            numtabs = $("#ulTabs li").length;
        }
        // reset tabCounter
        tabCounter = 1;
        divTabs.tabs( "refresh" );

    });

    // removing the tab on click on icon
    divTabs.on( "click", "span.ui-icon-close", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      divTabs.tabs( "refresh" );
      // decrease the tab counter
      tabCounter--;
    });
}


// function to create dynamic table based on input from the users after passes the valid check
function tableCreate() {
    $("#errorMessage").empty();
    // cast all variable to Number for calculation to print out the dynamic table
    var fCol, lCol, fRow, lRow;
    // use parseInt to get value as number from html input
    fCol = parseInt($('input[name=fCol]').val());  //First Column
    lCol = parseInt($('input[name=lCol]').val());  //Last Column
    fRow = parseInt($('input[name=fRow]').val());  //First Row
    lRow = parseInt($('input[name=lRow]').val());  //Last Row

    // swap values
    if (fCol > lCol) {
        [fCol, lCol] = [lCol, fCol];
        $("#errorMessage").append("<p>Swapping First and Last Column value</p>");
    }
    if (fRow > lRow){
        [fRow, lRow] = [lRow, fRow];
        $("#errorMessage").append("<p>Swapping First and Last Row value</p>");
    }

    // define and declare variable for CreateTable tag and set it is empty
    var CreateTable = "";
    // check variable use for determine when is the cell have background corlor or not
    var check = 0;
    CreateTable += "<table id='style-table'>";
    // console.log('fRow: %O', fRow);        // For debug in Console
    // create table with rows based on input
    for (var row = 0; row <= (lRow - fRow + 1); row++){
        // open table tag
        CreateTable += "<tr>";
        // for create cell for each row (like column)
        for (var col = 0; col <= (lCol - fCol + 1); col++){

            // if the cell is on first row and first column, empty space, else css style will be first
            if (row == 0){
                CreateTable += "<td class='header'>" + ((col == 0) ? "" : (col + fCol - 1)) + "</td>";
            // if cell fall in first column, css style will be first
            } else if (col == 0){
                CreateTable += "<td class='header'>" + (row + fRow - 1) + "</td>";
            // the rest of cell in the table with rest style
            } else {
                // cell background based on check variable
                CreateTable += ((parseInt(check) % 2 == 0) ? "<td class='child-blank'>"  : "<td class='child-color'>") + ((row + fRow - 1) * (col + fCol - 1)) + "</td>";
                // increase check by 1
                check++;
            }
        }
        // reset check based on row to determind 0 or 1
        row % 2 == 0 ? check = 0 : check = 1;
        // closed row tag
        CreateTable += "</tr>";
    }
    // closed table tag
    CreateTable += "</table>";

    // Print out the Dynamic table
    $("#table").html(CreateTable);

    // Stop the form from refreshing.
    return false;
}
