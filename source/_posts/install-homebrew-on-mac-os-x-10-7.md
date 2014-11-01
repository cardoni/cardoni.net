title: Install Homebrew on Mac OS X 10.7+
tags:
  - basics
  - Homebrew
  - tools
id: 141
comment: false
categories:
  - Basics
  - Coding
date: 2012-05-01 23:34:00
---

#### How to Install Homebrew on Mac OS X (10.7 or later)

This one's super-quick and easy!  If you want to easily install other tools and add-ons in the future, you need [Homebrew](http://brew.sh/ "Homebrew").

1.  Open a new shell and run the following:
[cc lang='bash']ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"[/cc]
2.  Once Homebrew has finished its installation, make sure to run the following:
[cc lang='bash']brew update[/cc]
Running Brew's _update_ command instructs it to fetch the latest install recipes from the remote repository. Remember: Before you use Brew to install something, you definitely want to run this command. _Every single time_! That way, you'll always ensure you're installing only the latest, stable packages.
That's it!  You're done.