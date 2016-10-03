//jquery rss

!function(t){"use strict";var e=function(e,n,o,i){this.target=e,this.url=n,this.html=[],this.effectQueue=[],this.options=t.extend({ssl:!1,host:"www.feedrapp.info",limit:null,key:null,layoutTemplate:"<ul>{entries}</ul>",entryTemplate:'<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>',tokens:{},outputMode:"json",dateFormat:"dddd MMM Do",dateLocale:"en",effect:"show",offsetStart:!1,offsetEnd:!1,error:function(){console.log("jQuery RSS: url doesn't link to RSS-Feed")},onData:function(){},success:function(){}},o||{}),this.options.ssl&&"www.feedrapp.info"===this.options.host&&(this.options.host="feedrapp.herokuapp.com"),this.callback=i||this.options.success};e.htmlTags=["doctype","html","head","title","base","link","meta","style","script","noscript","body","article","nav","aside","section","header","footer","h1-h6","hgroup","address","p","hr","pre","blockquote","ol","ul","li","dl","dt","dd","figure","figcaption","div","table","caption","thead","tbody","tfoot","tr","th","td","col","colgroup","form","fieldset","legend","label","input","button","select","datalist","optgroup","option","textarea","keygen","output","progress","meter","details","summary","command","menu","del","ins","img","iframe","embed","object","param","video","audio","source","canvas","track","map","area","a","em","strong","i","b","u","s","small","abbr","q","cite","dfn","sub","sup","time","code","kbd","samp","var","mark","bdi","bdo","ruby","rt","rp","span","br","wbr"],e.prototype.load=function(e){var n="http"+(this.options.ssl?"s":""),o=n+"://"+this.options.host,i=o+"?callback=?&q="+encodeURIComponent(this.url);this.options.offsetStart&&this.options.offsetEnd&&(this.options.limit=this.options.offsetEnd),null!==this.options.limit&&(i+="&num="+this.options.limit),null!==this.options.key&&(i+="&key="+this.options.key),t.getJSON(i,e)},e.prototype.render=function(){var e=this;this.load(function(n){try{e.feed=n.responseData.feed,e.entries=n.responseData.feed.entries}catch(o){return e.entries=[],e.feed=null,e.options.error.call(e)}var i=e.generateHTMLForEntries();if(e.target.append(i.layout),0!==i.entries.length){t.isFunction(e.options.onData)&&e.options.onData.call(e);var s=t(i.layout).is("entries")?i.layout:t("entries",i.layout);e.appendEntriesAndApplyEffects(s,i.entries)}e.effectQueue.length>0?e.executeEffectQueue(e.callback):t.isFunction(e.callback)&&e.callback.call(e)})},e.prototype.appendEntriesAndApplyEffects=function(e,n){var o=this;t.each(n,function(t,n){var i=o.wrapContent(n);"show"===o.options.effect?e.before(i):(i.css({display:"none"}),e.before(i),o.applyEffect(i,o.options.effect))}),e.remove()},e.prototype.generateHTMLForEntries=function(){var e=this,n={entries:[],layout:null};return t(this.entries).each(function(){var t,o=this,i=e.options.offsetStart,s=e.options.offsetEnd;i&&s?index>=i&&index<=s&&e.isRelevant(o,n.entries)&&(t=e.evaluateStringForEntry(e.options.entryTemplate,o),n.entries.push(t)):e.isRelevant(o,n.entries)&&(t=e.evaluateStringForEntry(e.options.entryTemplate,o),n.entries.push(t))}),this.options.entryTemplate?n.layout=this.wrapContent(this.options.layoutTemplate.replace("{entries}","<entries></entries>")):n.layout=this.wrapContent("<div><entries></entries></div>"),n},e.prototype.wrapContent=function(e){return t(0!==t.trim(e).indexOf("<")?"<div>"+e+"</div>":e)},e.prototype.applyEffect=function(t,e,n){var o=this;switch(e){case"slide":t.slideDown("slow",n);break;case"slideFast":t.slideDown(n);break;case"slideSynced":o.effectQueue.push({element:t,effect:"slide"});break;case"slideFastSynced":o.effectQueue.push({element:t,effect:"slideFast"})}},e.prototype.executeEffectQueue=function(t){var e=this;this.effectQueue.reverse();var n=function(){var o=e.effectQueue.pop();o?e.applyEffect(o.element,o.effect,n):t&&t()};n()},e.prototype.evaluateStringForEntry=function(e,n){var o=e,i=this;return t(e.match(/(\{.*?\})/g)).each(function(){var t=this.toString();o=o.replace(t,i.getValueForToken(t,n))}),o},e.prototype.isRelevant=function(t,e){var n=this.getTokenMap(t);return this.options.filter?this.options.filterLimit&&this.options.filterLimit===e.length?!1:this.options.filter(t,n):!0},e.prototype.getFormattedDate=function(t){if(this.options.dateFormatFunction)return this.options.dateFormatFunction(t);if("undefined"!=typeof moment){var e=moment(new Date(t));return e=e.locale?e.locale(this.options.dateLocale):e.lang(this.options.dateLocale),e.format(this.options.dateFormat)}return t},e.prototype.getTokenMap=function(n){if(!this.feedTokens){var o=JSON.parse(JSON.stringify(this.feed));delete o.entries,this.feedTokens=o}return t.extend({feed:this.feedTokens,url:n.link,author:n.author,date:this.getFormattedDate(n.publishedDate),title:n.title,body:n.content,shortBody:n.contentSnippet,bodyPlain:function(t){for(var n=t.content.replace(/<script[\\r\\\s\S]*<\/script>/gim,"").replace(/<\/?[^>]+>/gi,""),o=0;o<e.htmlTags.length;o++)n=n.replace(new RegExp("<"+e.htmlTags[o],"gi"),"");return n}(n),shortBodyPlain:n.contentSnippet.replace(/<\/?[^>]+>/gi,""),index:t.inArray(n,this.entries),totalEntries:this.entries.length,teaserImage:function(t){try{return t.content.match(/(<img.*?>)/gi)[0]}catch(e){return""}}(n),teaserImageUrl:function(t){try{return t.content.match(/(<img.*?>)/gi)[0].match(/src="(.*?)"/)[1]}catch(e){return""}}(n)},this.options.tokens)},e.prototype.getValueForToken=function(t,e){var n=this.getTokenMap(e),o=t.replace(/[\{\}]/g,""),i=n[o];if("undefined"!=typeof i)return"function"==typeof i?i(e,n):i;throw new Error("Unknown token: "+t+", url:"+this.url)},t.fn.rss=function(t,n,o){return new e(this,t,n,o).render(),this}}(jQuery);

//create nav list
$(".mmx-docs-chapter").each(function(){

    //remove spaces from id

    var chapter_heading = $(this).find("h2.mmx-docs-heading");

    var newid = chapter_heading.attr("id").replace(/ /g,'');

    chapter_heading.attr("id", newid);

    //create links for nav
    var nav_name = chapter_heading.text();
    var link_text = nav_name.replace(/ /g,'');


    $("#mmx-document-nav > ul").append(
      "<li><a href='#"+link_text+"'>"+ nav_name +"</a><ul class='subnav'></ul></li>"
    );

    //create subnav

    $(this).find("h3.mmx-docs-heading").each(function(index){

        var newid = $(this).attr("id").replace(/ /g,'');

        $(this).attr("id", newid);

        //create links for nav
        var nav_name = $(this).text();
        var link_text = nav_name.replace(/ /g,'');


        $(".subnav").last().append(

        "<li><a href='#"+link_text+"'>"+ nav_name +"</a></li>"
        );


    });

});

//smooth scroll

$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
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