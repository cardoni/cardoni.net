title: "A/B Testing With Nginx"
tags:
 - nginx
 - a/b testing
 - testing
 - product validation
categories:
  - nginx
  - testing
keywords: ['nginx', 'a/b testing', 'product validation']
date: 2015-01-30 16:12:36
---

[Hone](http://gohone.com) is an incredibly data-driven company. Whenever possible, we use analytics data (combined with customer feedback) to drive decision making about which features to add, modify, and remove — among other things.

### An Example
We recently wanted to know how some proposed styling changes would affect user interaction rates of a widget in our web client. To accomplish this, we needed to run a few A/B tests.

Using our Nginx load-balancer, we decided to split incoming traffic in half: 50% of our visitors would be served the existing widget and the remaining 50% would be served the new widget (with the new styling/layout changes).