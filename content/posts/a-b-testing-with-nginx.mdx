title: "A/B Testing With Nginx"
tags:
    - nginx
    - a/b testing
    - testing
    - product validation
categories:
 - nginx
keywords: [ 'nginx', 'a/b testing', 'product validation' ]
date: 2015-01-30 16:12:36
---

[Hone](//gohone.com) is an incredibly data-driven company. Whenever possible, we use analytics data (combined with customer feedback) to drive decision making about which features to add, modify, and remove — among other things.

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
        # access_log          off;                # enable if you'd like logging

        location / {
            rewrite ^\/$ "${scheme}://${variant}" redirect;
        }
    }
```

The http server config above utilizes Nginx’s [*ngx_http_split_clients_module*](//nginx.org/en/docs/http/ngx_http_split_clients_module.html) functionality to assign all incoming requests into one of *n*-buckets — and then redirects them to the corresponding test page.

## Results
We run A/B tests until a [statistically-significant](//en.wikipedia.org/wiki/Statistical_significance) number of visitors have passed through them. For this particular widget being tested, we needed 10k visitors: ~5k going to each of our *A*- and *B*-test widgets.

What did we learn? After examining our analytics data, it was immediately clear: A much higher percentage of users interacted in the ways we wanted with the new, redesigned widget compared to the old widget. And — importantly — the higher-than-previous engagement remained steady during the following weeks and months — meaning it wasn’t merely a temporary lift.

## More Advanced A/B Testing
If you’re interested in learning more, check out [this article by Lawson Kurtz](//viget.com/extend/split-test-traffic-distribution-with-nginx) that details some more advanced configs and methods of A/B testing using Nginx.

## Work At [Hone](//gohone.com)
Interested in working at a small, ambitious startup? [Check us out](//gohone.com)!