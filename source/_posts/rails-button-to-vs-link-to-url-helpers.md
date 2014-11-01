title: "Rails' default HTTP methods for button_to and link_to helpers"
tags:
  - ":delete"
  - ":get"
  - ":post"
  - button_to
  - link_to
  - rails
  - url helpers
id: 68
comment: false
categories:
  - Personal Pivot
date: 2012-03-05 15:28:33
---

Here's a tip when using Rails' [cci lang="rails"]button_to[/cci] and [cci lang="rails"]link_to[/cci] URL helpers!
> Never ever forget these two things:
> 1\. [cci lang="rails"]button_to[/cci] uses the [cci lang="rails"]:POST[/cci] method by default
> 
> 2. [cci lang="rails"]link_to[/cci] uses the [cci lang="rails"]:GET[/cci] method by default
Believe me: Memorizing these two simple Rails defaults will save you routing headaches down the road.

[TBS_LABEL class="important"]Example — Specifying the :GET method:[/TBS_LABEL] Let's say that you'd like to provide your user with a "Cancel" _button_ on a form that redirects her back to the previous page after it's clicked. (Because you're nice, you'll also throw up a warning modal...): [cc lang="rails"]button_to "Cancel / Delete", :back, confirm: "Are you sure you'd like to cancel and delete this post?", disable_with: "Deleting..."[/cc]

**Guess what? That's not right!** When clicked, that button will either throw a routing error or unintentionally make a post request to one of your routes. Instead, you need to specify that you'd like the button to use the [cci lang="rails"]:GET[/cci] method, instead of its default [cci lang="rails"]:POST[/cci] method. (refer to rule _1_ above.)

Here's the correct code for such a button: [cc lang="rails"]button_to "Cancel / Delete", :back, method: :get, confirm: "Are you sure you'd like to cancel and delete this post?", disable_with: "Deleting..."[/cc] See how we specify the method in there with "[cci lang="rails"]method: :get[/cci]"?

[TBS_LABEL class="important"]Example — Specifying the :POST method:[/TBS_LABEL] Want a text link that ends up sending sending a [cci lang="rails"]:POST[/cci] to one of your routes? Simple, just remember to pass the correct method: [cc lang="rails"]link_to "Click here to submit post.", posts_url, method: :post[/cc]

If you wanted a button to perform the same action, you wouldn't need to specify the method, as the default method is already [cci lang="rails"]:POST[/cci]: [cc lang="rails"]button_to "Submit Post", posts_url, disable_with: "Submitting Post..."[/cc]

[TBS_LABEL class="important"]Example — Specifying the :DELETE method:[/TBS_LABEL] Just as you need to pass in the proper HTTP method into your [cci lang="rails"]button_to[/cci] and [cci lang="rails"]link_to[/cci] helpers if you'd like to use them for the opposite of their default method, so too must you specify the [cci lang="rails"]:DELETE[/cci] method when you'd like to use that instead: [cc lang="rails"]button_to "Cancel / Delete", :back, confirm: "Are you sure you'd like to cancel and delete this post?", disable_with: "Deleting..."[/cc]

Simple as pie to understand; Easy to forget and waste an hour scratching your head. Do yourself a favor and commit this to memory!