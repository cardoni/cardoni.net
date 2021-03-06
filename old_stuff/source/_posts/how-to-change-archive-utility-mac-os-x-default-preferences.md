title: "Change OS X's Archive Utility Preferences"
tags:
  - archive utility
  - mac
  - minitip
  - os x
categories:
  - personal pivot
date: 2012-03-19 23:22:30
---

So you're sick of the lame, default settings that OS X's _Archive Utility_ comes with and you want to change 'em? Yeah—I did too. So, here's three ways to change that little tool's settings to whatever your heart desires _once and for all_! (...or temporarily if you'd like; I don't much mind either way to be honest with you.)

Unless you're as fast as Superman and can open _Archive Utility's_ preferences pane during the ~~roughly 0.0006~~ few seconds that it's displayed on the screen during its unarchiving process, it seems the only way to change the default preferences are:

## How to Change Archive Utility Preferences
Launch Archive Utility manually and change the preferences as you would in any other app:
Open up _Terminal_ and type: `open -a Archive Utility`

If you're the type that doesn't want anything to do with opening _Terminal_ ([not that there's anything wrong with that](http://www.youtube.com/watch?v=GZPcGapl2dM "Origin of the phrase, &quot;Not that there")) or one that prefers clicking the mouse a few more times, just for sport:

Click on OS X's _Finder_ (usually in the lower-left of your dock), then go to the very top OS X menu bar and select "Go" and then "Go to Folder..." Then, just enter the following—`/System/Library/CoreServices`—and smack the enter key on your keyboard (or gingerly click the "Go" button with your mouse—again, totally up to you. I prefer smacking the enter-key, myself.)

At this point, you need only find the _Archive Utility_ App within the Finder window and give her the ol' double-click to launch.

## Let's Get All Fancy-like
Want to add a new icon to OS X's _System Preferences_ app, enabling all users to set their own _Archive Utility_ preferences? Do the following:

Open up _Terminal_ and enter this beautiful one-liner:
    ```bash
    open /System/Library/CoreServices/Archive Utility.app/Contents/Resources/
    ```

In the Finder window that opens as a result, locate and double-click on the `Archives.prefPane` file.

If you're asked to enter your Admin password, _DO IT IMMEDIATELY WITHOUT HESITATION_. This isn't a drill and your life could depend on it. Of course, that's simply false. But the truth is that at this point, OS X wants to add a dedicated preference icon for _Archive Utility_ to its _System Preferences_ App and wants you to confirm this action by entering your password. Honest!

Enjoy the following panel that you now have access to and configure the settings until you're blue in the face!

![OS X Archives Settings Panel](//cardoni.net/media/os_x_archive_utility_preferences_panel.png "OS X Archives Settings Panel")

## Hat Tippity Tip / Source:
This "how to" article was adopted from one I originally read on TAUW [right here](http://www.tuaw.com/2010/10/21/mac-101-use-archive-utility-preferences-for-control-over-archiv/ "Mac 101: Use Archive Utility preferences for control over archives (by  TJ Luoma)"), which itself was apparently adopted from an even earlier article, currently located on Macworld.com [right here](http://hints.macworld.com/article.php?story=20071028161249238 "http://hints.macworld.com/article.php?story=20071028161249238 (by JoolsG4)"). Enjoy!