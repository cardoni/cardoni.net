title: "Don't forget to rake after deploying to heroku"
tags:
 - ruby
 - rails
 - heroku
categories:
  - personal pivot
date: 2012-03-06 16:55:35
---

Deploying your Rails 3 app to [heroku](http://www.heroku.com/ "Heroku") (on their _[Cedar](http://devcenter.heroku.com/articles/cedar "Heroku Cedar Stack for Rails 3 Apps")_ stack)?

### Protip
Don't forget to run this command—ya know, just as you would when first running the app locally on your own machine.
(Might save you 20 minutes of chin-scratching!)
  ```bash Run a `rake` task on Heroku:
  heroku run rake db:migrate
  ```

#### Good times!