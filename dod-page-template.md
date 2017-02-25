# Definition of Done Page Template

Template has these regions:

Page structure

* [ ] &lt;header role="banner"&gt; 
* [ ] &lt;nav role="navigation"&gt;
* [ ] &lt;main role="main"&gt; 
* [ ] &lt;article role="article"&gt; 
* [ ] &lt;aside role="complementary"&gt; 
* [ ] &lt;footer role="contentinfo"&gt;
* [ ] &lt;form role="search"&gt;

HTML

* [ ] Markup is correct. Test with W3C Validator or Sitevalidator
* [ ] Template has lang attribute: &lt;html lang="en"&gt;
* [ ] Tempalte uses semantic headings and structure (h1-h6, sections, articles, ul/li, etc)
* [ ] Semantic elements are not used for visual presentation only. Use div and span for visual presentation.
* [ ] Don't use links to run scripts only. Buttons run scripts and submits forms. Links link to content.

Images

* [ ] All images without exact width and height have img-wrapper
* [ ] All images have alt-attribute. Leave the attribute value empty if the image is visual presentation and has no meaning.
* [ ] Alt text describes the image. Images do not have alt texts like alt="list image" or alt="image description".

Forms

* [ ] All form fields have a label element with for attribute connected to form element id. Placeholder is not a replacement for label. The label can be hidden.
* [ ] Provide styling for form states like valid and invalid fields. These can be viewed in the styleguide.
* [ ] The label text indicates that a form filed is required or optional.
* [ ] Use attributes like required, aria-required, aria-invalid on form fields.

Template has been tested in browsers:

* [ ] Internet Explorer 9
* [ ] Internet Explorer 10
* [ ] Internet Explorer 11
* [ ] Edge
* [ ] Firefox
* [ ] Chrome
* [ ] Mobile Safari

Template has been tested in: 

* [ ] Desktop
* [ ] Tablet
* [ ] Mobil

Accessibility and Quality

* [ ] Test keyboard navigation and that it works according to https://www.w3.org/TR/wai-aria-practices/#aria_ex
* [ ] Tested with WAVE evaluation tool, Google Chrome Accessibility Tools, Tota11y or similar tool
* [ ] WAI-ARIA is used if needed. Check https://www.w3.org/TR/wai-aria-practices/#aria_ex
* [ ] If template uses AJAX it uses aria-live
* [ ] Color contrast has been checked
