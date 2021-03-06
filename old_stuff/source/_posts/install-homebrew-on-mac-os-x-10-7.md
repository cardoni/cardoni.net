title: Install Homebrew on Mac OS X 10.7+
tags:
  - basics
  - homebrew
  - tools
  - coding
categories:
  - personal pivot
keywords: [ 'homebrew', 'brew', 'mac os', 'brew update' ]
date: 2012-05-01 23:34:00
---

#### How to Install Homebrew on Mac OS X (10.7 or later)

This one's super-quick and easy!  If you want to easily install other tools and add-ons in the future, you need [Homebrew](http://brew.sh/ "Homebrew").

Open a new shell and run the following:

    ```bash
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

It's that simple. Really.

## Homebrew Future Tip
Once Homebrew has finished installing, you'll want to make sure to always run the following before trying to install anything using the `brew` command:

    ```bash
    brew update
    ```

Running Brew's `update` command instructs it to fetch the latest install recipes from its remote repository. Remember: Before you use Brew to install something, you definitely want to run the `brew update` command _Every single time_! That way, you'll always ensure you're installing only the latest, stable packages.

### That's it!  You're done.

Want to learn more about Brew on your own?  Check out: http://brew.sh/