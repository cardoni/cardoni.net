title: "Rails' default HTTP methods for button_to and link_to helpers"
tags:
  - button_to
  - link_to
  - rails
  - url helpers
categories:
  - personal pivot
date: 2012-03-05 15:28:33
---

Here's a tip when using Rails' `button_to` and `link_to` URL helpers!
Never ever forget these two things:

#### **`button_to`** uses the **`:POST`** method by default
#### **`link_to`** uses the **`:GET`** method by default

Believe me: Memorizing these two simple Rails defaults will save you routing headaches down the road.

## Example — Specifying the **`:GET`** method:

Let's say that you'd like to provide your user with a "Cancel" _button_ on a form that redirects her back to the previous page after it's clicked. (Because you're nice, you'll also throw up a warning modal...):
    ```rails
    button_to "Cancel / Delete",
              :back,
              confirm: 'Are you sure you would like to cancel and delete this post?',
              disable_with: 'Deleting...'
    ```

**Guess what? That's not right!** When clicked, that button will either throw a routing error or unintentionally make a post request to one of your routes. Instead, you need to specify that you'd like the button to use the `:GET` method, instead of its default `:POST` method. (refer to rule _1_ above.)

Here's the correct code for such a button:
    ```rails
    button_to "Cancel / Delete",
              :back,
              method: :get,
              confirm: 'Are you sure you would like to cancel and delete this post?',
              disable_with: 'Deleting...'
    ```

See how we specify the method in there with _`method: :get`_?

## Example — Specifying the **`:POST`** method:

Want a text link that ends up sending sending a `:POST` to one of your routes? Simple. Just remember to pass the correct method:
    ```rails
    link_to "Click here to submit post.",
            posts_url,
            method: :post
    ```
If you wanted a button to perform the same action, you wouldn't need to specify the method, as the default method is already `:POST`:
    ``` rails
    button_to "Submit Post",
              posts_url,
              disable_with: "Submitting Post...
    ```
## Example — Specifying the **`:DELETE`** method:
Just as you need to pass in the proper HTTP method into your `button_to` and `link_to` helpers if you'd like to use them for the opposite of their default method, so too must you specify the `:DELETE` method when you'd like to use that instead:
    ```rails
    button_to "Cancel / Delete",
              :back,
              method: :delete,
              confirm: "Are you sure you'd like to cancel and delete this post?",
              disable_with: "Deleting..."
    ```