//create nav list
$(".mmx-docs-chapter").each(function(){

    //remove spaces from id

    var chapter_heading = $(this).find("h2.mmx-docs-heading");

    var newid = chapter_heading.attr("id").replace(/ /g,'').trim();

    chapter_heading.attr("id", newid);

    //create links for nav
    var nav_name = chapter_heading.text().trim();
    var link_text = nav_name.replace(/ /g,'');

    var chapter_link = $("<li><a href='#"+link_text+"'>"+ nav_name +"</a><ul class='subnav'></ul></li>");

    $("#mmx-document-nav > ul").append(chapter_link);

    //create subnav

    $(this).find("h3.mmx-docs-heading").each(function(index){

        var newid = $(this).attr("id").replace(/ /g,'').trim();

        $(this).attr("id", newid);

        //create links for nav
        var nav_name = $(this).text().trim();
        var link_text = nav_name.replace(/ /g,'');

        chapter_link.children('.subnav').append("<li><a href='#"+link_text+"'>"+ nav_name +"</a></li>");

    });

});

// Scrollspy

$('body').scrollspy({ target: '#mmx-document-nav' })

//smooth scroll

$('#mmx-document-nav a').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $( target ).offset().top
    }, 500, function() {
        location.hash = target.replace('#', '');
    });
    return false;
});

//copy url to clipboard

$("h3.mmx-docs-heading button").each(function(){

   var url = [location.protocol, '//', location.host, location.pathname].join('');
   var datavalue = url+$(this).data("clipboard-text").replace(/ /g,'');

   $(this).attr("data-clipboard-text", datavalue);



});

new Clipboard('.btn');

//show or hide nav

if (!Cookies.get('nav-pinned') || Cookies.get('nav-pinned') == "false") {

    $("#mmx-document-nav").toggleClass("mmx-document-nav-slide-left");

}

else {
    $("#mmx-docs-toggle-button").toggleClass("active");
}

$("#mmx-docs-toggle-button").click(function(){

        $(this).toggleClass("active");

        if (!Cookies.get('nav-pinned') || Cookies.get('nav-pinned') == "false") {

            Cookies.set('nav-pinned', 'true');
        }

        else {
            Cookies.set('nav-pinned', 'false');
        }

        $("#mmx-document-nav").toggleClass("mmx-document-nav-slide-left");
    }
);