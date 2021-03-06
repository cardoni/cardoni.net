title: Install MySQL on Mac OS X 10.7+
tags:
  - basics
  - database
  - homebrew
  - mysql
  - postgres
  - coding
categories:
  - personal pivot
keywords: [ 'mysql', 'mac os', 'homebrew', 'brew', 'postgres', 'postgresql' ]
date: 2012-05-02 00:06:37
---

The no fuss, no muss guide to installing the latest stable version of MySQL DB locally on your Mac running OS X 10.7 or later.  (Hat tip to [Trey Piepmeier](http://solutions.trey.cc/2010/02/28/installing-mysql-on-snow-leopard-using-homebrew/ "Trey Piepmeier") for his excellent tutorial, upon which I improved a few things.)

## Install MySQL (using Homebrew)

I'll assume you've already [installed Homebrew](/install-homebrew-on-mac-os-x-10-7 "Install Homebrew on Mac OS X 10.7+").

Assuming you have your `brew` command ready to rock, make sure to run a quick `brew update`, telling brew to fetch the latest packages:
```bash Update brew to ensure you have the latest library of packages (install scripts):
brew update
```

OK? Good. Now you need to tell _brew_ to install [MySQL](http://www.mysql.com/ "MySQL") by entering this command:

    ```bash
    brew install mysql
    ```

Enter the following two commands, one after the other (the second one starts up your new, local MySQL server and creates an initial database):

    ```bash
    unset TMPDIR
    mysql_install_db --verbose --user=$(whoami) --basedir=$(brew --prefix mysql) --datadir=/usr/local/var/mysql --tmpdir=/tmp
    ```

## Launch MySQL Automatically

The output from that last command should instruct you to enter three additional commands. (The ones below might not be exactly what you see in your terminal. Of course, make sure you follow those instructions and not these below, unless they're identical.):

    ```bash
    mkdir -p ~/Library/LaunchAgents
    cp $(brew --prefix mysql)/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/
    launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
    ```

The three commands above do the following, respectively: create a _LaunchAgents_ folder for you if you don't already have one, copy the _mysql.plist_ file into that launch folder, and then loads that file into a system file so that Mac OS X starts MySQL for you each time you restart your machine.  Perfect!

## Start Configuring MySQL

One final (optional) step is to run the included MySQL root/user config script. It'll step you through various default username/password/etc options that you might want to configure now that you've got MySQL up and running on your machine. To run this automated post-MySQL-install wizard, enter:

    ```bash
    $(brew --prefix mysql)/bin/mysql_secure_installation
    ```

Or, perhaps you're interested in [Installing and Setting up PostgreSQL on Mac OS X](/how-to-install-postgresql-os-x-mac-rails-3-heroku "Installing and Setting up PostgreSQL on Mac OS X")?