title: "Making DigitalOcean's Private Networking Secure"
tags:
  - openvpn
  - vpn
  - digital ocean
  - security
categories:
  - security
  - nginx
date: 2014-11-13 10:00:00
---

A few weeks ago here at [Hone](http://gohone.com/ "Hone"), we decided to spin a new server cluster in DigitalOcean's NYC3 data center. [DigitalOcean introduced 'private' networking](https://www.digitalocean.com/company/blog/introducing-private-networking/ "DigitalOcean: Introducing Private Networking") just over a year ago. However, it turns out that DigitalOcean actually refers to this as _Shared Private Networking_—and many of the comments under their announcement point out that their private networking [isn't](https://www.digitalocean.com/company/blog/introducing-private-networking/#comment-1160313645) [really](https://www.digitalocean.com/company/blog/introducing-private-networking/#comment-1067364221) [too](https://www.digitalocean.com/company/blog/introducing-private-networking/#comment-1038459686) [private](https://www.digitalocean.com/company/blog/introducing-private-networking/#comment-1037153678).

We decided to use [OpenVPN](http://openvpn.net/ "OpenVPN: An open source VPN daemon") to layer a secure network on top of DigitalOcean's shared private networking.

### What we wanted to accomplish:
1. Install an OpenVPN _server_ on our load balancer
2. Install an OpenVPN _client_ on all of our other machines
3. Drop any traffic other than OpenVPN on `eth1` (DO's shared private network)
4. Allow all traffic over `tun0` (our secured private network)

With traffic passing through the `tun0` interface between machines, we gain the ability to more quickly and easily spin up new machines and add them to our infrastructure.

Here's how to setup a virtual private network on DigitalOcean (or whichever provider you might be using):

## Setup / Configure Your OpenVPN _Server_
Update your packages and install _OpenVPN_ and _Easy RSA_:
    ```bash
    apt-get update && apt-get install openvpn easy-rsa
    ```

Copy some Easy RSA files over to a more permanent location so that you can upgrade OpenVPN in the future without losing your configuration settings:
    ```bash
    mkdir /etc/openvpn/easy-rsa/
    cp -r /usr/share/easy-rsa/* /etc/openvpn/easy-rsa/
    ```

Edit `/etc/openvpn/easy-rsa/vars` and change the various exports for default certificate values.
At the very least, you'll want to change the following keys in the `vars` file to suit your needs:
    ```bash
    export KEY_COUNTRY="US"
    export KEY_PROVINCE="IL"
    export KEY_CITY="Chicago"
    export KEY_ORG="Your Company, Inc."
    export KEY_EMAIL="email@address-here.com"
    export KEY_OU="http://address-here.com"
    ```

With your `vars` configured, you can now generate a master Certificate Authority (CA) Certificate and Key for your server:
    ```bash
    cd /etc/openvpn/easy-rsa/
    source vars
    ./clean-all
    ./build-ca
    ```

Generate a certificate and private key for the server:
    ```bash
    ./build-key-server <vpn_server_name>
    ```

Generate some [Diffie–Hellman–Merkle parameters](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange "Diffie–Hellman–Merkle Parameters [Wikipedia]") for the OpenVPN server (**This will take a minute or two**):
    ```bash
    ./build-dh
    ```

Copy the keys, certs, and the Diffie–Hellman–Merkle params that you generated from `/etc/openvpn/easy-rsa/keys` into your OpenVPN directory, `/etc/openvpn/`:
    ```bash
    cd /etc/openvpn/easy-rsa/keys/
    cp <vpn_server_name>.crt <vpn_server_name>.key ca.crt ca.key dh2048.pem /etc/openvpn/
    ```

### Generate Certificates For VPN Client(s)
You'll need to generate a certificate and key for each VPN client:
    ```bash
    cd /etc/openvpn/easy-rsa/
    source vars
    ./build-key <vpn_client_name>
    ```

_Securely_ copy these the following files to the client machine (via `rsync`, `scp`, etc.):
  1. `/etc/openvpn/ca.crt`
  2. `/etc/openvpn/easy-rsa/keys/<vpn_client_name>.crt`
  3. `/etc/openvpn/easy-rsa/keys/<vpn_client_name>.key`

After you've copied these keys and certs to your client machine(s), delete them from the VPN server. They're no longer needed on that machine and keeping them there poses a security risk if unauthorized access is gained.

## Edit Your OpenVPN Server Config
Copy over and unpack the provided example server config—`server.conf.gz`—to `/etc/openvpn/server.conf`
    ```bash
    cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/
    gzip -d /etc/openvpn/server.conf.gz
    ```

Edit `/etc/openvpn/server.conf` to ensure it contains the settings that make sense for your intended setup.

You'll want to make sure it points to the correct location of your certs, keys, and `dh2048.pem` file (Diffie–Hellman–Merkle parameters) that you generated earlier.

Here's an example of some lines you should configure (or uncomment) in `server.conf`
    ```bash
    ca ca.crt
    cert <vpn_server_name>.crt
    key <vpn_server_name>.key                       # This file should be kept secret
    dh dh2048.pem
    client-config-dir /etc/openvpn/static_clients   # Specify where your static client info is stored
    client-to-client
    ```
**Note:** Uncommenting `client-to-client` will enable your VPN clients to communicate with one another directly. By default, VPN clients will only see the VPN server.

Start OpenVPN on your server
    ```bash
    service openvpn start
    ```

### Check That it Works
After you start your openvpn service, you should see `tun0` interface details when you run:
    ```bash
    ifconfig tun0
    ```

If you've set up your server correctly, you should see some output like this:
    ```bash
    tun0      Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
              inet addr:10.8.0.1  P-t-P:10.8.0.2  Mask:255.255.255.255
              UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1500  Metric:1
              RX packets:0 errors:0 dropped:0 overruns:0 frame:0
              TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
              collisions:0 txqueuelen:100
              RX bytes:0 (0.0 B)  TX bytes:0 (0.0 B)
    ```

If you run the `ifconfig tun0` command above and see the error `ifconfig: interface tun0 does not exist`, then you'll need to check your OpenVPN server.conf again and make sure to reconfigure it.

## Setup / Configure Your OpenVPN _Client(s)_

Update your packages and install _OpenVPN_:
    ```bash
    apt-get update && apt-get install openvpn
    ```

Copy the example `client.conf` file over to `/etc/openvpn/client.conf`:
    ```bash
    cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf /etc/openvpn/
    ```

**If you haven't already done so**: Make sure that you've generated and then securely transferred (or manually copied over) `ca.crt`, `<vpn_client_name>.crt`, and `<vpn_client_name>.key` to your new VPN client.
(For the purposes of this tutorial, I've copied them into `/etc/openvpn/`.)

Edit `/etc/openvpn/client.conf` and make sure everything points to correct certs and keys. You should also make sure to specify the IP address corresponding to your OpenVPN server's `eth1` interface (DO's shared private network):
    ```bash
    remote 10.0.0.1 1194     # This points to the private IP of your OpenVPN server (and the OpenVPN port)
    ca ca.crt
    cert <vpn_client_name>.crt
    key <vpn_client_name>.key
    ```

Having finished editing `client.conf`, you can restart the OpenVPN service on your VPN client machine:
    ```bash
    service openvpn restart
    ```

Check to see that you've got a `tun0` interface (and that it has the correct IP):
    ```bash
    ifconfig tun0
    ```
### Ping Your VPN Server (From Client Machine)
If you'd like to sanity-check your connection to your VPN server, try pinging the OpenVPN server directly:
    ```Bash
    ping 10.8.0.1
    ```
In this example, I'm pinging `10.8.0.1`, which is set by OpenVPN default server config. You may have selected something different, in which case you should find the IP corresponding to your OpenVPN server's `tun0` interface.
You can grab this IP quickly by running (on the OpenVPN server itself): `ifconfig tun0`.

If you can't ping the OpenVPN server, then something is wrong with your config. Consider re-reading all of the above.

## Assign Static IPs to VPN Clients
You may desire to assign static IP addresses to some or all of your client machines. ([Hat-tip to Michael Albert](http://michlstechblog.info/blog/openvpn-set-a-static-ip-address-for-a-client/ "Michael Albert: 'OpenVPN: Set a static IP Address for a client'") for a great post which helped here.)

On your OpenVPN server, create a folder in which to save the information of your static clients.
In this example, we'll name our folder `static_clients`:
    ```bash
    mkdir /etc/openvpn/static_clients
    ```

Make sure to uncomment and edit this line in `server.conf`:
    ```vim
    client-config-dir /etc/openvpn/static_clients
    ```

Previously, when you generated a cert and key for your new VPN client, recall the `common_name` that you chose.
Create a file—naming it whatever you chose for the `common_name`— in `/etc/openvpn/static_clients/` with the following content:

(Note that in this example, we'd like this VPN client's `tun0` interface to be assigned the IP `10.8.0.4`)
    ```vim
    ifconfig-push 10.8.0.4 10.8.0.5
    ```

OpenVPN will need to read these files after it drops privileges. You can do that do that with the following:
    ```bash
    sudo chown -R nobody:nogroup /etc/openvpn/static_clients
    ```

## Configure Your `iptables`
If you want to further secure your VPN, you should edit your VPN client machine's `iptables`. With your OpenVPN server and clients set up correctly and pingable (in both directions) via their `tun0` interfaces, you can begin restricting traffic over your `eth1` (DO's shared private network interface) to accept only traffic over port `1194` (OpenVPN's default port) on that interface.

For example, if you're routing traffic through a load balancer, you may want to lock down VPN client boxes as such:
* Restrict access on `eth0` interface (public) to port 22 only
* Restrict access on `eth1` interface (DO's shared private network) to udp/tcp traffic over port 1194 only
* Unrestricted access on `tun0` interface (OpenVPN tunnel interface).

Here's an example `iptables` config that would restrict traffic in the way I mention above:
    ```apacheconf
    *filter
    :INPUT ACCEPT [0:0]
    :FORWARD ACCEPT [0:0]
    :OUTPUT ACCEPT [0:0]
    -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    -A INPUT -i lo -j ACCEPT
    -A INPUT -i tun0 -j ACCEPT
    -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
    -A INPUT -i eth1 -p udp -m udp --dport 1194 -j ACCEPT
    -A INPUT -i eth1 -p tcp -m tcp --dport 1194 -j ACCEPT
    -A INPUT -j DROP
    COMMIT
    ```

## [Hone](http://gohone.com/ "Hone") is Hiring!
[Check out all of the positions for which we're currently hiring](http://gohone.com/jobs/ "Hone, Inc. Job Listings").

## Credit Where Credit Is Due
While figuring out how to do everything above—and while I was writing this tutorial—I was reading and consulting with the following sources:
1. https://openvpn.net/index.php/open-source/documentation/howto.html
2. http://grantcurell.com/2014/07/22/setting-up-a-vpn-server-on-ubuntu-14-04/
3. https://help.ubuntu.com/14.04/serverguide/openvpn.html
4. http://www.slsmk.com/getting-started-with-openvpn/installing-openvpn-on-ubuntu-server-12-04-or-14-04-using-tap/
5. https://www.digitalocean.com/community/tutorials/how-to-setup-and-configure-an-openvpn-server-on-debian-6
6. https://www.digitalocean.com/community/tutorials/how-to-setup-and-configure-an-openvpn-server-on-centos-6
7. https://www.digitalocean.com/community/tutorials/openvpn-access-server-centos
8. https://gist.github.com/padde/5689930
9. https://github.com/tinfoil/openvpn_autoconfig/blob/master/bin/openvpn.sh