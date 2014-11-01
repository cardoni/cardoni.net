title: Setting up PostgreSQL on Mac OS X
tags:
  - Brew
  - Databases
  - Homebrew
  - PostgreSQL
  - rails
  - SQL
  - SQLite
id: 102
comment: false
categories:
  - Personal Pivot
date: 2012-03-08 16:04:47
---

What's that? You're making a Rails app, planning on eventually pushing it to Heroku, and you're still running SQLite locally on your machine? Like a chump!? Come on now!

You've got to install Postgres locally! The good news is it that it's super easy.

[TBS_LABEL class="success"]Major Hat Tip:[/TBS_LABEL] [Dan Manges](https://twitter.com/#!/dan_manges "Dan Manges") is crazy-smart, the CTO of [Braintree](http://www.braintreepayments.com/ "Braintree Payments"), and happens to be my mentor while at [Code Academy](http://codeacademy.org/ "Code Academy in Chicago, IL"). He saved me about three hours of chin-scratching, by teaching me everything below today (in about 15 minutes). Thanks man!
(Probably worth noting that any errors below are courtesy of yours truly—not Dan :)

1.  First things first: You'll need _[Homebrew](http://mxcl.github.com/homebrew/ "Homebrew")_.

    *   Open _terminal_ and type: [cc lang='bash' line_numbers='false']brew -v[/cc]
This will return the current version of brew (if you have it installed).

            *   If you do have it installed, update it with the following command: [cc lang='bash' line_numbers='false']brew update[/cc]
That was pretty simple.
        *   If you got an error when you ran [cci lang='bash' line_numbers='false']brew -v[/cci], then you need to install _Homebrew_. Type the following into _Terminal_: [cc lang='bash' line_numbers='false']/usr/bin/ruby -e "$(/usr/bin/curl -fsSL https://raw.github.com/mxcl/homebrew/master/Library/Contributions/install_homebrew.rb)"[/cc]
More [info about installing _Homebrew_ here](https://github.com/mxcl/homebrew/wiki/installation "Installing Homebrew").

        *   With _brew_ installed, you're golden. Time to install PostgreSQL!

2.  Install _[PostgreSQL](http://www.postgresql.org/ "PostgreSQL")_ with the following command in _Terminal_: [cc lang='bash' line_numbers='false']brew install postgresql[/cc]
3.  Start the PostgreSQL server and create a database:[cc lang='bash' line_numbers='false']initdb /usr/local/var/postgres[/cc]

    *   [TBS_LABEL class="important"]Optional[/TBS_LABEL] You'll need to have PostgreSQL running locally in order for your app (running in development mode, of course) to read and write to your Postgres database(s). If you want to have PostgreSQL start automatically each time you start your computer, enter the following three lines into Terminal one-by-one:[cc lang='bash' line_numbers='false']
mkdir -p ~/Library/LaunchAgents
cp /usr/local/Cellar/postgresql/9.1.3/homebrew.mxcl.postgresql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
[/cc]

4.  Done and done. PostgreSQL is up and running and now all you need to do is tweak a few setting in your Rails App's [cci lang='rails' line_numbers='false']database.yml[/cci] file (in the _config_ folder).

    *   In your [cci lang='rails' line_numbers='false']database.yml[/cci] file, you'll see a few environments and their respective configs beneath. Most likely you'll see three environments: [cci lang='rails' line_numbers='false']development:[/cci], [cci lang='rails' line_numbers='false']test:[/cci], and [cci lang='rails' line_numbers='false']production:[/cci].
    *   For now, we'll just change the [cci lang='rails' line_numbers='false']development:[/cci] environment. If you haven't changed anything, you'll see the following as the default config for [cci lang='rails' line_numbers='false']development:[/cci]:

            *   [cc lang='rails' line_numbers='false']
development:
# adapter: sqlite3
# database: db/development.sqlite3
# pool: 5
# timeout: 5000
[/cc]
        *   In order for your app to use your PostgreSQL server, you'll want to change the above to this:
[cc lang='rails' line_numbers='false']
development:
# adapter: postgresql
# database: name_of_your_app_development
# encoding: utf8
# template: template0
# host: localhost
[/cc]
        *   [TBS_LABEL class="important"]Super-awesome Protip:[/TBS_LABEL] You'll want to replace [cci lang='rails' line_numbers='false']name_of_your_app[/cci] with the name of _your_ app.

5.  Hold on there partner, don't forget to tweak your _gemfile_!
Make sure the you've got the [cci lang='rails' line_numbers='false']pg[/cci] gem in your gemfile:[cc lang='rails' line_numbers='false']gem 'pg'[/cc]

    *   [TBS_LABEL class="important"]Don't Forget:[/TBS_LABEL] You _don't_ want this [cci lang='rails' line_numbers='false']gem 'pg'[/cci] line _only_ within your [cci lang='rails' line_numbers='false']group :development, :test do[/cci] block. So, either make sure you add [cci lang='rails' line_numbers='false']:production[/cci] to that block, or just add the [cci lang='rails' line_numbers='false']gem 'pg'[/cci] line _outside_ of any such block like I did—like a pro.

6.  Finally, you'll want to create a new database: [cc lang='bash' line_numbers='false']rake db:create[/cc] and you'll probably want to run the following command to delete your tables, recreate them, and seed them with any data you may have in your [cci lang='rails' line_numbers='false']seeds.db[/cci] file with the following command: [cc lang='bash' line_numbers='false']rake db:reset[/cc]
[TBS_LABEL class="success"]Trying to install PostgreSQL on your Linux machine instead?[/TBS_LABEL]

My buddy—[Eric MacAdie](http://www.macadie.net/ "Eric MacAdie, Software Developer")—offers these helpful [instructions for setting up a Postgres server for Rails on a Linux machine](http://www.macadie.net/2012/03/12/connecting-rails-and-postgres/ "How to set up PostgreSQL on Linux for your Rails app during development") instead of OS X.