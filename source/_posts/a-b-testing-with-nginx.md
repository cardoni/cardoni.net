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

## Simple A/B Testing Nginx Config (50%/50%)
```config
    split_clients "abtest${remote_addr}${http_user_agent}${date_gmt}" $variant {
        50%                 "abtest.your_domain.com/a_test.html";
          *                 "abtest.your_domain.com/b_test.html";
    }

    server {
        listen              80;
        server_name         abtest.your_domain.com;
        root                /var/www/your_abtests_folder;

        location / {
            rewrite ^\/$ "${scheme}://${variant}" redirect;
        }

        # access_log          off;
    }
```