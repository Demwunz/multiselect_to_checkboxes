#Multiselect to Checkboxes

This extension serves one purpose. It simply styles `multiselect` boxes in entry views. Any less then seven entries and it will adjust its height accordingly. Any more then seven and a handy scrollbar will appear.
It remembers the initial selected boxes, so if you mess up, you can revert back again. 

## For extension developers:

If you find that this extension is messing up with your own, then simply edit `/assets/jquery.symphony.mtoc.js` line number `142` by adding the class of your own multiselect. 