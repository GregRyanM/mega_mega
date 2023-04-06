// Get the source folder from the user
var sourceFolder = Folder.selectDialog("Select the source folder.");

// Check if a folder was selected
if (sourceFolder != null) {

  // Get all files in the source folder
  var files = sourceFolder.getFiles("*.jpg");

  // Create a folder for completed files
  var completedFolder = new Folder(sourceFolder + "/_completed");
  if(!completedFolder.exists){
    completedFolder.create();
  }

  // Loop through each file
  for (var i = 0; i < files.length; i++) {

    // Get the current file
    var sourceFile = files[i];

    // Get the path to the output file
    var outputFilePath = "/Users/" + $.getenv("USER") + "/Documents/Elvis Checkouts/" + sourceFile.name;

    // Check if the output file exists
    var outputFile = new File(outputFilePath);
    if (outputFile.exists) {
      // Open the output file
      app.open(outputFile);

      // Open the source file
      var sourceDoc = app.open(sourceFile);

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

    // Switch to the target document to continue copying paths
    app.activeDocument = targetDoc;

    for (var i = 0; i < targetDoc.pathItems.length; i++) {
      targetDoc.pathItems[i].select();
      var idcopy = charIDToTypeID( "copy" );
      executeAction( idcopy, undefined, DialogModes.NO );

      app.activeDocument = sourceDoc;
      app.doAction("Deselect current path", "for script"); // Run "Deselect current path" action
      var idpast = charIDToTypeID( "past" );
      executeAction( idpast, undefined, DialogModes.NO );

      app.activeDocument = targetDoc;
    }

    // Close the active document
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

    // Run "save n close" action
    app.doAction("save n close", "for script");

    // Move the source file to the completed folder
    sourceFile.rename(completedFolder + "/" + sourceFile.name);
  }
} else {
  alert("You didn't select any folder. Please run the script again.");
}
