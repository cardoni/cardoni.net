title: "Don't forget to rake after deploying to heroku"
id: 87
comment: false
categories:
  - Personal Pivot
date: 2012-03-06 16:55:35
tags:
---

Deploying your Rails 3 app to [heroku](http://www.heroku.com/ "Heroku") (on their _[Cedar](http://devcenter.heroku.com/articles/cedar "Heroku Cedar Stack for Rails 3 Apps")_ stack)?

[TBS_LABEL class="important"]Protip:[/TBS_LABEL] Don't forget to run this command—ya know, just as you would when first running the app locally on your own machine. (Might save you 20 minutes of chin-scratching!)

[cc lang='bash' line_numbers='false']heroku run rake db:migrate[/cc]

Good times!