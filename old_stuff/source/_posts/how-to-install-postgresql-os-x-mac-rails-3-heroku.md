title: Setting up PostgreSQL on Mac OS X
tags:
  - brew
  - databases
  - homebrew
  - postgresql
  - rails
  - sql
  - sqlite
categories:
  - personal pivot
keywords: [ 'postgres', 'postgresql', 'mac os' ]
date: 2012-03-08 16:04:47
---

What's that? You're making a Rails app, planning on eventually pushing it to Heroku, and you're still running SQLite locally on your machine? Like a chump!? Come on now!

You've got to install Postgres locally! The good news is: It's super easy.

## First Things First
You'll first need to install PostgreSQL.  For this tutorial, we'll use  _[Homebrew](http://brew.sh/ "Homebrew")_ to help us do that quickly.

Open _terminal_ and type: `brew -v`
This will return the current version of brew (if you have it installed).
If you do have it installed, update it with the following command: `brew update`

### That was pretty simple

If you saw a `command not found: brew` (or similar) error after you ran `brew -v`, then you likely need to install _Homebrew_. If you would like to do that now, type the following into your terminal:
    ```bash
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

#### Pro Tip
If at this point you're thinking of installing Homebrew, consider first reading more about installing Homebrew in this article I wrote on [How To Install Homebrew on Mac OS X 10.7+](/install-homebrew-on-mac-os-x-10-7 "How to Install Homebrew on Mac OS X 10.7+").

With _brew_ installed, you're golden. Time to install PostgreSQL!

## Install PostgreSQL and Configure

With Brew, you can install _[PostgreSQL](http://www.postgresql.org/ "PostgreSQL")_ with the following command in _Terminal_:
    ```bash
    brew install postgresql
    ```

You can now start your PostgreSQL server and create a database:
    ```bash
    initdb /usr/local/var/postgres
    ```

**Optional**
You'll need to have PostgreSQL running locally in order for your app (running in development mode, of course) to read and write to your Postgres database(s). If you want to have PostgreSQL start automatically each time you start your computer, enter the following three lines into Terminal one after another:
    ``` bash
    mkdir -p ~/Library/LaunchAgents
    cp /usr/local/Cellar/postgresql/9.1.3/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
    ```

Done and done. PostgreSQL is up and running and now all you need to do is tweak a few setting in your Rails App's `database.yml` file (in the `config/` folder).

In your `database.yml` file, you'll see a few environments and their respective configs beneath. Most likely you'll see three environments: `development:`, `test:`, and `production:`.

For now, we'll just change the `development:` environment. If you haven't changed anything, you'll see the following as the default config for `development:`:
    ```rails
    development:
    # adapter: sqlite3
    # database: db/development.sqlite3
    # pool: 5
    # timeout: 5000
    ```

In order for your app to use your new PostgreSQL server, you'll want to change the above to this:
    ```rails
    development:
    # adapter: postgresql
    # database: name_of_your_app_development
    # encoding: utf8
    # template: template0
    # host: localhost
    ```

### Super-awesome Protip
You'll want to replace `name_of_your_app` with the name of _your_ app.

## Editing Your Gemfile
Hold on there partner, don't forget to tweak your `Gemfile`!  Make sure the you've got the `pg` gem in your gemfile:
    ```rails Example line entry in your Rail's `Gemfile`, if you want to use the `pg` gem:
    gem 'pg'
    ```

#### Want To Run PostgreSQL in Production?
If you want to run Postgres in your production environment as well as your development environment, make sure to add the `gem 'pg'` line somewhere within the `:production` block—and not _only_ within your `group :development, :test do` block.

Finally, you'll want to create a new database: `rake db:create` and you'll probably want to run the following command to delete your tables, recreate them, and seed them with any data you may have in your `seeds.db` file with the following command: `rake db:reset`

## Trying to install PostgreSQL on your Linux machine instead?
My buddy—[Eric MacAdie](http://www.macadie.net/ "Eric MacAdie, Software Developer")—offers these helpful [instructions for setting up a Postgres server for Rails on a Linux machine](http://www.macadie.net/2012/03/12/connecting-rails-and-postgres/ "How to set up PostgreSQL on Linux for your Rails app during development") instead of OS X.

## Credit Where Credit Is Due:
[Dan Manges](https://twitter.com/#!/dan_manges "Dan Manges") is crazy-smart, the CTO of [Braintree](http://www.braintreepayments.com/ "Braintree Payments"), and happens to be my mentor while at ~~[Code Academy](http://codeacademy.org/ "Code Academy in Chicago, IL")~~ [The Starter League](http://www.starterleague.com/ "The Starter League in Chicago, IL"). He saved me about three hours of chin-scratching, by teaching me everything below today (in about 15 minutes). Thanks man!
(Probably worth noting that any errors below are courtesy of yours truly—and not Dan :)