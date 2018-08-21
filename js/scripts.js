//Business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(streetType, street, city, state) {
  this.streetType = streetType;
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.fullAddress = function() {
  return this.streetType + ", " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street-type").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
}

function appendAddressFields() {
  $("#new-addresses").append('<div class="new-address">' +
                              '<div class="form-group">' +
                                '<label for="new-street-type">Address Type</label>' +
                                '<input type="text" class="form-control new-street-type">' +
                              '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-street">Street</label>' +
                                 '<input type="text" class="form-control new-street">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-city">City</label>' +
                                 '<input type="text" class="form-control new-city">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-state">State</label>' +
                                 '<input type="text" class="form-control new-state">' +
                               '</div>' +
                             '</div>');
}

// User interface logic
$(document).ready(function() {

  $("#add-address").click(function() {
    appendAddressFields()
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedType = $(this).find("input.new-street-type").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState)
      if (!Object.values(newAddress).includes("")) {
        newContact.addresses.push(newAddress);
      }
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().hover(function() {
      $("#show-contact").fadeToggle();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields();
  });
});
