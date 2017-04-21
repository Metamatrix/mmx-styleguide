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

//smooth scroll

$('#mmx-document-nav a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

$('#mmx-document-nav > ul > li > a').click(function() {
    $('#mmx-document-nav li.active').removeClass('active');
    $(this).parent().toggleClass('active');
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


//github RSS feed

//get appname

var mmxappname = $(".mmx-componentlibrary").data("appname");

var rssfoundmatches = false;

$("#rss-feeds").rss(
    "https://github.com/Metamatrix/mmx-styleguide/commits/master.atom?token=AF6z2jWhqZt8O44ww1eMs0Gw8yrF_Dp3ks61QacrwA%3D%3D",
  {
    // how many entries do you want?
    // default: 4
    // valid values: any integer
    limit: 100,

    filterLimit: 1,
    filter: function(entry, tokens) {


        if(tokens.title.indexOf(mmxappname) > -1) {
            rssfoundmatches = true;
        }

        return tokens.title.indexOf(mmxappname) > -1
    },

    // outer template for the html transformation
    // default: "<ul>{entries}</ul>"
    // valid values: any string
    layoutTemplate: "<div class='mmx-docs-feed-container'><h4 class='mmx-docs-heading'>Latest update</h4><ul class='list-unstyled'>{entries}</li></div>",

    // inner template for each entry
    // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
    // valid values: any string
    entryTemplate:  '<li><h5><span class="fa fa-check-circle"></span>{title}</h5><span class="mmx-docs-feed-details"><time>{date}</time> by {author}</span></li>',


    // the effect, which is used to let the entries appear
    // default: 'show'
    // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
    effect: 'slideFastSynced',

    onData: function(){


    }
  },

  // callback function
  // called after feeds are successfully loaded and after animations are done
  function callback() {

        if (!rssfoundmatches) {
            $(".mmx-docs-feed-container").hide();
        }

  }
)