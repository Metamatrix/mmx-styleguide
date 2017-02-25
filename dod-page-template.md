# Definition of Done Page Template

Template has these regions:

Page structure

* [ ] <header role="banner"> 
* [ ] <nav role="navigation"> 
* [ ] <main role="main"> 
* [ ] <article role="article"> 
* [ ] <aside role="complementary"> 
* [ ] <footer role="contentinfo"> 
* [ ] <form role="search">

HTML

* [ ] Template has lang attribute: <html lang="en">
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

Test
* [ ] Test using keyboardnavigation
