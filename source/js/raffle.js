Parse.initialize("qiAfjSda7bZjurQPX4qnykSSgEfXyrQrvwIQiOZE", "uABcuVxxqvhIX8q0eMwtRyc4mcaLAFXxpJqVUjbH");

var Raffle = (function() {
  var that = {
    init: function () {
      $('#leadForm').submit(that.handleLeadSubmit);
    },
    handleLeadSubmit: function(event) {
      event.preventDefault();
      that.hideValidationMessages();
      var lead = that.parseLead(this);
      if(that.leadIsValid(lead)) {
        that.saveLead(lead);
      } else {
        that.invalidateLeadForm(lead);
      }
    },
    hideValidationMessages: function() {
      $(".validation").fadeOut("fast");
    },
    parseLead: function(form) {
      var raw = $(form).serializeArray(),
        output = {};
      $.each(raw, function(index, value) {
        if (value.name === "interest") {
          if (!output.interests) {
            output.interests = [];
          }
          output.interests.push(value.value);
        } else {
          output[value.name] = $.trim(value.value);
        }
      });
      return output;
    },
    invalidateLeadForm: function(lead) {

    },
    leadIsValid: function(lead) {
      var isGood = true;
      var emailRE = /.+@.+\..+/;
      var invalidHelper = function(key) {
        if (!lead.invalid) {
          lead.invalid = [];
        }
        if ($.inArray(key, lead.invalid) === -1) {
          lead.invalid.push(key);
        }
        isGood = false;
      };
      $.each(lead, function(key, value) {
        if ($.inArray(key, ["leadName", "emailAddress"]) !== -1) {
          if (value === "") {
            invalidHelper(key);
          }
          if (key === "emailAddress") {
            if (!emailRE.test(value)) {
              console.log(key, value);
              invalidHelper(key, "");
            }
          }
        }
      });
      console.log(lead);
      return isGood;
    },
    saveLead: function(newLead) {
      var LeadClass = Parse.Object.extend("Lead");
      var lead = new LeadClass();
      lead.save(newLead).then(function(object) {
        document.location = "thanks.html";
      });
    }
  };
  return that;
})();

Raffle.init();
