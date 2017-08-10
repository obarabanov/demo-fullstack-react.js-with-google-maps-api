User stories & Functionality
----------

Background: 

As an Account manager I want to be able to manage all property details as a list
in a web page.

Story 1: 

As an Account manager I want to be able to view the property details as a list in a
web page.
The property details have following fields:
1) Owner(Required)
2) Address
* Line1 (Required)
* Line2 (Optional)
* Line3 (Optional)
* Line4 (Required)
* Postcode (Required)
* City (Required)
* Country (Required)
3) IncomeGenerated (Required)

Render the details on the browser in table.

NOTE: Address should only show the details that are present. So if Line3 in the address is empty or null, then do not show a blank or empty line.

Story 2:

We have decided to focus more on central properties. So we have drawn a service area
which gives us an idea of properties we can service and no longer service. Please use the address and
google-maps api to detect the longitude/latitude. Use this latitude/longitude to detect if the property is
within the service area or not. Please use the following radius and center point coordinates that defines
the area we can service:

lat: 51.5073835, lng: -0.1277801,
radius: 20000, country: 'gb'
