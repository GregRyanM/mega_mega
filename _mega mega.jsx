// Get the source folder from the user
var sourceFolder = Folder.selectDialog("Select the source folder.");

// Check if a folder was selected
if (sourceFolder != null) {

  // Get all files in the source folder
  var files = sourceFolder.getFiles("*.jpg");


  // Loop through each file
  for (var i = 0; i < files.length; i++) {

    // Get the current file
    var sourceFile = files[i];

// Open the source file
      var sourceDoc = app.open(sourceFile);

    

    // Get the path to the output file
    var outputFilePath = "/Users/" + $.getenv("USER") + "/Documents/Elvis Checkouts/" + sourceFile.name;

    // Check if the output file exists
    var outputFile = new File(outputFilePath);
    if (outputFile.exists) {
      // Open the output file
      app.open(outputFile);

      // Switch to the source file tab
      app.activeDocument = sourceDoc;
    } else {
      alert("Output file does not exist.");
    }

    var sourceDoc = app.documents[0];
    var targetDoc = app.documents[1];

    app.activeDocument = sourceDoc;

    for (var i = 0; i < sourceDoc.pathItems.length; i++) {
      sourceDoc.pathItems[i].select();
      var idcopy = charIDToTypeID( "copy" );
      executeAction( idcopy, undefined, DialogModes.NO );

      app.activeDocument = targetDoc;
      app.doAction("Deselect current path", "for script"); // Run "Deselect current path" action
      var idpast = charIDToTypeID( "past" );
      executeAction( idpast, undefined, DialogModes.NO );

      app.activeDocument = sourceDoc;
    }


    // Close the active document
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    // Run "save n close" action
    app.doAction("save n close", "for script");
  }
} else {
  alert("You didn't select any folder. Please run the script again.");
}
