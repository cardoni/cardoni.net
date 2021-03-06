title: "So you wanna use Git, huh?"
tags:
  - git
  - reverting
  - revision control system
  - saving
  - version control
categories:
  - personal pivot
keywords: [ 'git', 'version control', 'revision control system' ]
date: 2012-02-29 03:54:37
---

Over the past few weeks, I've been working on an app with three other people. The four us divided up the necessary work that needed to be done, chose parts to work on that we found interesting, and then got to work.

> How do multiple people add to, modify, and delete the project's codebase (and other files)—all while keeping track of everything along the way?

As soon as we asked this question, the answer was simple: use **Git**!

## What is Git?

 _Git_ is a Distributed, Revision Control System

Using Git, multiple people can easily work on the same project, at the same time, and keep track of all changes. In addition to providing a detailed history of who did what and when, Git empowers collaborators to revert back to a previous version of a project's codebase (or a previous version of, say, a single file), should broken code or otherwise undesirable changes occur at some point.

## Using Git in _Your_ Own Projects

After creating your project, `cd` into your project's working directory via terminal and initialize Git with the following command:
    ```bash Initialize a new git repository within the present directory
    git init
    ```

Git is now good to go and is ready to keep track of the files in that directory. Make changes to some code, return to terminal, and type the following:
    ```bash Add all files in the present directory (**not** including those that have been deleted) to Git staging
    git add .
    ```

Notice the `.` (period) at the end? That tells Git to add all of the new and modified files to it's index. In other words, Git is now tracking _every_ file in that directory and will know when changes are made to existing files or when new files are _added_.

### Note:
If you ever delete a file from your project—and you want to track that deletion in your Git repository—you should type the following command in terminal:
    ```bash Add all files in the present directory (including those that have been deleted) to Git staging
    git add -A .
    ```

It's similar to the previous command, but passing in the `-A` option will tell Git to "add" the files that you removed from your project. (You can think of this as Git keeping track of the fact that you just _deleted_ a file.)

## Committing Files

So far, Git has been initialized and is also tracking all of the files in your project (including any changes you've made so far). But, you've yet to _commit_ these changes. These _commits_ are the snapshots of your project that Git will keep a history of, enabling you to rollback or revert to at some point in the future should you so desire.

To commit your changes—and thus make your first/initial commit for this project—type the following command in terminal:
    ```bash Your initial commit message probably shouldn't have the message of 'initial commit'
    git commit -m 'initial commit'
    ```

This _commits_ your changes. Note the `-m` option that we've passed in as well as the `'initial commit'` message following it. As you might guess, the `-m` stands for "message" and the text in single (or double) quotes following it contains a message that will be saved along with the commit. (You should always pass in a descriptive note that will enable you (and/or other developers reading it later on) to quickly decipher what changes you made for _that_ particular commit.

## Part Two: Coming Soon
This post covers the basics of using Git for your personal projects. In the next post, I'll detail how using the above-listed commands—as well as a few other commands—will enable you to use Git for a single project with multiple collaborators as I described in the opening paragraph.