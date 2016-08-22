$(function() {
  console.log("dziala");

  //variables for main ul list
  var productLists = $('.product-list');
  //variable for api url
  var productUrl = 'https://www.unisport.dk/api/sample';


  /* Insert Products to DOM  */
  function insertContent(content) {
    $.each(content, function(indexProduct, product) {
       // create new elements
        var liProduct = $('<li>', {class: "product"}).data("kids", product.kids).data('kid-adult', product.kid_adult).data('women', product.women); //main product-div
        console.log(liProduct.data());
        var aWrap = $('<a>', {href: product.url, target: "_blank"}) //link to Product
          aWrap.on('click', function (event) {
            event.preventDefault();
          })
        var img = $('<img>', {src: product.image, class: "small-photo"}); //product img + data-url for maxi-img
        // console.log(img.data());
        var bigPhotoIcon = $('<img>', {src:"D:/WORKSPACE/sample-grid/images/more-zoom.png", class:'big-photo-icon'}).data("big", product.img_url).addClass('hidden');
        // console.log(bigPhotoIcon.data());
        var divNameWrap = $('<div>', {class: "name-wrap"}); //div for Name
        var spanName = $('<span>').text(product.name); //span for Name

        var divPriceWrap = $('<div>', {class: "price-wrap"}); //div for Price
        var spanPrice = $('<span>', {class: "price"}).text(product.price); //span for Price
        var supCurrency = $('<sup>', {class: "currency"}).text(" " + product.currency); //currency for Price
          if (product.price == "0,00") {
            spanPrice.text('N/A')
          } else {
            spanPrice.text(product.price);
          }
        var pOldPrice = $('<p>', {class: "old-price"}); //old Price
          if ((product.price_old === "0,00")||(product.price_old == product.price)) { //only display when the product indeed had old price
            pOldPrice.text('');
          } else {
            pOldPrice.text(product.price_old + product.currency);
          }
        var divDeliveryWrap = $('<div>', {class: "delivery-wrap"}); //div for Delivery
        var spanDelivery = $('<span>').text("Delivery: " + product.delivery); //span for Delivery
        var divSizeWrap = $('<div>', {class: "size-wrap"}); //div for size-wrap
        var spanSizeLabel = $('<span>').text("Sizes: "); //span for Size-Label
        var spanSizes = $('<span>', {class: "sizes"}).text(product.sizes); //span for Sizes
        //rest of data
        var divOtherWrap = $('<div>', {class: "other-wrap"}); //div for other-wrap
        var divOnline = $('<div>', {class: "online"}); //Online
          if (product.online === "1") { //text for displaying when product is online
            divOnline.text("available online");
          } else {
            divOnline.text("unavailable online");
          }
        var pPackage = $('<p>', {class: "package"}); //pPackage
          if (product.package === "1") {
            pPackage.text("Part of a Set: Yes")
          } else {
            pPackage.text("Part of a Set: No");
          }
        var divPorto = $('<div>', {class: "porto"}); //only show if true
          if (product.free_porto === "1") {
            divPorto.text("Free Shipping");
          } else {
            divPorto.text("+ shipping");
          }
        var pIdNumber = $('<p>', {class: "id-number"}).text("Product No: "); //ID
        var spanIdNumber = $('<span>').text(product.id);

        //create other elements (not json data)
        var divReadMore = $('<div>', {class: "read-more"});
        var aReadMore = $('<a>').text("READ MORE");


      //append elements to DOM
        liProduct.append(aWrap);
        aWrap.append(img);
        aWrap.append(bigPhotoIcon);
        //Name
        aWrap.append(divNameWrap);
        divNameWrap.append(spanName);
        //Price
        aWrap.append(divPriceWrap);
        divPriceWrap.append(spanPrice);
        divPriceWrap.append(supCurrency);
        divPriceWrap.append(pOldPrice);
        //read MORE
        aWrap.append(divReadMore);
        divReadMore.append(aReadMore);

        // product to DOM
        productLists.append(liProduct);

        //show all details
        function showDetails(){
         divReadMore.each(function(i,v){
           $(this).click(function(){
             console.log('read more');
             var detailsDiv = $('<div>');
             var detailsFullScreen = $('<div>');

             detailsFullScreen.addClass('full-screen-details').fadeIn('slow').appendTo($('.details-box'));//add fullScreen class and attach to <body>
             detailsDiv.addClass('detailsDiv').appendTo(detailsFullScreen);

            //create and add two columns to display info
            var detailsDivImg = $('<div>').addClass('half lefthalf').appendTo(detailsDiv);
            var detailsDivInfo = $('<div>').addClass('half righthalf').appendTo(detailsDiv);
            var destroyButton = $("<div>").addClass('destroy').appendTo(detailsDivInfo); //exit button
            //clone and append elements that will appear in detailsDiv
             var imgCloned = img.clone().appendTo(detailsDivImg);
             var divNameWrapCloned = divNameWrap.clone().appendTo(detailsDivInfo);
             var divPriceWrapCloned = divPriceWrap.clone().appendTo(detailsDivInfo);
             divPriceWrapCloned.append(divPorto);


             //Delivery & online
             detailsDivInfo.append(divDeliveryWrap);
             divDeliveryWrap.append(spanDelivery);
             detailsDivInfo.append(divOnline);

             //Sizes
             detailsDivInfo.append(divSizeWrap);
             divSizeWrap.append(spanSizeLabel);
             divSizeWrap.append(spanSizes);
             //other
             detailsDivInfo.append(divOtherWrap);
             divOtherWrap.append(pPackage);
             divOtherWrap.append(pIdNumber);
             pIdNumber.append(spanIdNumber);

             $('body').on('click', '.destroy', function(){ //exits full screen
               detailsFullScreen.fadeOut('slow');
             });

           })
         })
        }
        showDetails();

        //function for showing big photo
        function showBigPhoto() {
          //show and hide zoom icon when hovering on photo
          img.each(function(i,v){
            $(this).on("mouseover", function(){
              $(this).next().removeClass('hidden');
            });
            $(this).on("mouseleave", function(){
              $(this).next().addClass('hidden');
            });
          })

        //show big photo
          bigPhotoIcon.each(function(i,v){
            $(this).on("mouseover", function(){
              $(this).removeClass('hidden');
            });
            $(this).click(function(){
              var imageSource = $(this).data('big');

              var bigImg = $('<img>'); //create big image
              var divBigImg = $('<div>') //create div that contains img and close button
              var fullScreen = $('<div>'); // create full screen
              var closeButton = $('<div>'); //create button that exits full screen

              fullScreen.addClass('full-screen-bigphoto').fadeIn('slow').appendTo($('.photomax-box'));//add fullScreen class and attach to <body>
              divBigImg.addClass('div-big-img').appendTo(fullScreen);
              bigImg.attr('src', imageSource).appendTo(divBigImg);//add img src and attach to <fullScreen>
              closeButton.addClass('destroy').appendTo(divBigImg);//add closeButton and attach to <fullScreen>

              // $('section').addClass('fixed');

              $('body').on('click', '.destroy', function(){ //exits full screen
                fullScreen.fadeOut('slow');
              });
              // $('body').on('click', '.full-screen-bigphoto', function(){ //exits full screen
              //   fullScreen.fadeOut('slow');
              // });
            })
          //hide zoom icon
            $(this).on("mouseleave", function(){
              $(this).addClass('hidden');
            });
          })
        }
        showBigPhoto();

        function filter(){
        var options = $('options');
        var select = $("#filter");

        select.change(function(){
          $( "select option:selected" ).each(function() {
            if (($(this).hasClass("kids")) && (liProduct.data('kids') === '0')){
              liProduct.show();
              // liProduct.data('kids').hide();
              liProduct.data('kids', '0').hide();
            } else if (($(this).hasClass('kid-adult')) && (liProduct.data('kid-adult') === '0')) {
              liProduct.show();
              liProduct.data('kid-adult', '0').hide();
              // liProduct.data('kid-adult', '1').show();
            } else if (($(this).hasClass('women')) && (liProduct.data('women') === '0')) {
              liProduct.show();
              liProduct.data('women', '0').hide();
              liProduct.data('women', '1').show();

            }

        })
      })

}//end of filter function

filter();
    });
  }

  //Load products and insert them into the DOM
  function loadProducts() {
        $.ajax({
            	url: productUrl
        }).done(function(response){
     		    insertContent(response.products)
    	 }).fail(function(error) {
           console.log(error)
       })
  }

  loadProducts();

});
