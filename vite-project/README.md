hello..


for cloning..
git@github.com:utkarshyadav11/Image_editors.git

install node_modules
#npm install



to run the project 
#npm run dev



 ---------  The component folder contains 2 files ImageSearch and ImageCanvas   ------
 ---------  With 2 css files Global.css and ImageSearch.css   --------

 **********
ImageSearch == this file contains the data  for searching images through the Unsplash API  it takes user input for 
searching the images

#Axios is used for data fetching with try and catch method. slice array method is used for showing only 4 images 
per search(we can change it.)

**********

ImageCanvas
1 = State & Refs(hooks): Manages the Fabric.js canvas and tracks image loading.
2 = Responsive Canvas: Dynamically adjusts canvas size Accoridng the screen size changes
3 = Canvas Setup: Initializes the Fabric.js canvas and updates dimensions on window resize.
4 = Image Handling: Loads and centers a selected image, to fit in canvas body.
5 = Add Elements: Functions to add editable text and resizable shapes (circle, rectangle, triangle) to the canvas.
(with console log values also)





 
-------------------------- Find design pattern in public folder -----------------------