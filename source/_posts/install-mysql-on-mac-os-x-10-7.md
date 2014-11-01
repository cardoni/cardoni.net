title: Install MySQL on Mac OS X 10.7+
tags:
  - basics
  - database
  - Homebrew
  - mysql
  - postgres
id: 165
comment: false
categories:
  - Basics
  - Coding
date: 2012-05-02 00:06:37
---

The no fuss, no muss guide to installing the latest stable version of MySQL DB locally on your Mac running OS X 10.7 or later.  (Hat tip to [Trey Piepmeier](http://solutions.trey.cc/2010/02/28/installing-mysql-on-snow-leopard-using-homebrew/ "Trey Piepmeier") for his excellent tutorial, upon which I improved a few things.)

1.  I'm assuming you've already [installed Homebrew](http://cardoni.net/install-homebrew-on-mac-os-x-10-7 "Install Homebrew on Mac OS X 10.7+").
2.  If you haven't already done so, run a quick [cci lang='bash']brew update[/cci] in terminal. This ensures you have the latest brew library of packages before you install anything.
3.  OK? Good. Now you need to tell _brew_ to install [MySQL](http://www.mysql.com/ "MySQL") by entering this command:
[cc lang='bash' nowrap='0' ]brew install mysql[/cc]
4.  Enter the following two commands, one after the other (the second one starts up your new, local MySQL server and creates an initial database):
[cc lang='bash' nowrap='0' ]unset TMPDIR
mysql_install_db --verbose --user=`whoami` --basedir="$(brew --prefix mysql)" --datadir=/usr/local/var/mysql --tmpdir=/tmp[/cc]
5.  The output from that last command should instruct you to enter three more.  Do it!:
[cc lang='bash' nowrap='0' ]
mkdir -p ~/Library/LaunchAgents
cp $(brew --prefix mysql)/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/
launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
[/cc]**
**The three commands above do the following, respectively: create a _LaunchAgents_ folder for you if you don't already have one, copy the _mysql.plist_ file into that launch folder, and then loads that file into a system file so that Mac OS X starts MySQL for you each time you restart your machine.  Perfect!
6.  One final (optional) step is to run the included MySQL root/user config script. It'll step you through various default username/password/etc options that you might want to configure now that you've got MySQL up and running on your machine. To run this automated post-MySQL-install wizard, enter:
[cc lang='bash' nowrap='0' ]$(brew --prefix mysql)/bin/mysql_secure_installation[/cc]
[Looking to install PostgreSQL instead](http://cardoni.net/how-to-install-postgresql-os-x-mac-rails-3-heroku "Setting up PostgreSQL on Mac OS X")?