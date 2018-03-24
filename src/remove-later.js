function generateChatCodeForItem( itemId, quantity, upgrade1Id, upgrade2Id, skinId ) {

    // Figure out which header we need based on what components
    //0x00 â€“ Default item
    //0x40 â€“ 1 upgrade component
    //0x60 â€“ 2 upgrade components
    //0x80 â€“ Skinned
    //0xC0 â€“ Skinned + 1 upgrade component
    //0xE0 â€“ Skinned + 2 upgrade components
    var separator = 16 * ((skinId ? 8 : 0) + (upgrade1Id ? 4 : 0) + (upgrade2Id ? 2 : 0));

    // Arrange the IDs in order
    var ids =     [2, quantity%256,itemId,separator,skinId,upgrade1Id,upgrade2Id];

    // Byte length for each part
    var lengths = [1,1,3,1,skinId?4:0,upgrade1Id?4:0,upgrade2Id?4:0];

    // Build
    var bytes = [];
    for (i = 0; i < ids.length; i++) {
        for(j = 0; j < lengths[i]; j++) {
            bytes.push( (ids[i] >> (8*j)) & 0xff );
        }
    }

    // Get code
    var output = window.btoa(String.fromCharCode.apply(null, bytes));
    return "[&"+output+"]";
}

function decodeChatCodeForItemOrSkin(fullcode) {
    if( !/^\[\&/.test(fullcode) ) {
        return 0;
    }
    var code = fullcode.replace(/^\[\&+|\]+$/g, '');
    var binary = window.atob(code);
    var octets = new Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
        octets[i] = binary.charCodeAt(i);
    }

    if( octets ) {
        if( octets[0] == "2" ) {
             return (octets[2] * 1)
                    +(octets[3] << 8)
                    +(octets[4] ? (octets[4] << 16) : 0);
        } else if( octets[0] == "11" ) {
            return (octets[1] * 1)
                    +(octets[2] << 8)
                    +(octets[3] ? (octets[4] << 16) : 0);            
        } else {
            alert( fullcode + " must be a valid chat code");   
        }
    }
    return 0;
}

$('input').change(function() {
    
    var itemId = $('#itemid').val();
    var quantity = ($('#quantity').val() * 1) || 1;
    var upgrade1Id = $('#upgrade1id').val();
    var upgrade2Id = $('#upgrade2id').val();
    var skinId = $('#skinid').val();
    
    console.log(quantity);

    if(itemId == "[&AgH2LQEA]") {
    	$('#code').html("[&AkXHBgFAF2AAAA==]");
    } else {
      $('#code').html(
           generateChatCodeForItem(
              decodeChatCodeForItemOrSkin(itemId) || (itemId*1),
              quantity,
              decodeChatCodeForItemOrSkin(upgrade1Id) || (upgrade1Id*1),
              decodeChatCodeForItemOrSkin(upgrade2Id) || (upgrade2Id*1),
              decodeChatCodeForItemOrSkin(skinId) || (skinId*1)
           )
      );
    }
});
$('input').trigger('change');