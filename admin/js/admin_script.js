// let pluginSlugname = wp360_admin_data.wp360_plugin_slug;
// jQuery('tr[data-slug="'+pluginSlugname+'"] .update-message').hide();
// var viewHrefVersion = jQuery("#"+pluginSlugname+"-update a").attr("href");
// jQuery(".wp360-invoice-view-details").attr('href' , viewHrefVersion)
function wp360toggleCustomFun(elm){
    jQuery(elm).toggle()
}
jQuery(document).ready(function($) {
var currentIndex = 0;
function wp360invoice_addNewItem() {
  currentIndex++; // Increment the item index
  var newItem = $('.wp360_invoiceItem:first').clone(); // Clone the first invoiceItem
  newItem.find('input').val('');
  newItem.find('input').attr('name', function(index, attr) {
    return attr.replace(/\[0\]/g, '[' + currentIndex + ']');
  });
  newItem.insertBefore('.wp360_invoice_addInvoiceItemCon');
  $('.wp360_invoice_removeInvoiceItem').toggle(currentIndex > 0);
}
function wp360invoice_removeLastItem() {
  if (currentIndex > 0) {
    $('.wp360_invoiceItem:last').remove();
    currentIndex--;
    $('.wp360_invoice_removeInvoiceItem').toggle(currentIndex > 0);
  }
}
$('.wp360_invoice_addItem').on('click', function() {
    wp360invoice_addNewItem();
});
$('.wp360_invoice_removeInvoiceItem').on('click', function() {
    wp360invoice_removeLastItem();
});
$(document).on('change keydown keyup', '.wp360_invoice_itemsCon input', function(){
  let qty = 0;
  let unitPrice = 0;
  let itemPrice = 0;
  let totalPrice = 0;
  $('.wp360_invoice_itemsCon .wp360_invoiceItem').each(function(index){
      qty = $(this).find('.qtyField').val()
      unitPrice = $(this).find('.unitPriceField').val()
      itemPrice = qty * unitPrice
      totalPrice = totalPrice + itemPrice;
      qty = 0;
      unitPrice = 0;
      itemPrice = 0;
  })
  $('#totalAmountField').val(totalPrice)
})
}); 


jQuery(document).ready(function($) {
  // Function to handle dynamic addition and removal of fields
  function setupDynamicFields(tableSelector, addButtonSelector, removeButtonSelector) {
      // Add field
      $(tableSelector).on('click', addButtonSelector, function() {
          let $template = $(this).parents('fieldset').find('.dynamic-field-template').first().clone();
          $template.removeClass('dynamic-field-template');
          $template.addClass('is_removable_field');
          $template.find('textarea').val('');
          $template.show();
          console.log($(this));
          $(this).parent('div').before($template);
      });

      // Remove field
      $(tableSelector).on('click', removeButtonSelector, function() {
          $(this).closest('.is_removable_field').remove();
      });
  }
  // Setup for Invoice Addresses
  setupDynamicFields('#wp360_invoice-settings-form', '.add-dynamic-field', '.remove-dynamic-field');

  // User Profile Extra Fields
  const fieldTemplate = `
      <div class="wp360-invoice-field">
          <input type="text" name="wp360_invoice_field_names[]" placeholder="Field Name" />
          <input type="text" name="wp360_invoice_field_values[]" placeholder="Value" />
          <button type="button" class="remove-field">Remove</button>
      </div>
  `;

    // Add field button click handler
    $('#wp360_invoice_user_extra_add').on('click', function() {
        $('#wp360_invoice_extra_fields #wp360-invoice-fields-container').append(fieldTemplate);
    });

    // Remove field button click handler
    $('#wp360_invoice_extra_fields #wp360-invoice-fields-container').on('click', '.remove-field', function() {
        $(this).closest('.wp360-invoice-field').remove();
    });
});
