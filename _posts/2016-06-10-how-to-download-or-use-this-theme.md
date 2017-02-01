---
layout: post
title: "Hướng dẫn setup setup card Wifi cho Freebsd 11.0"
comments: true
description: "Hướng dẫn setup setup card Wifi cho Freebsd 11.0e"
keywords: "Hướng dẫn setup setup card Wifi cho Freebsd 11.0"
tag: [FreeBSD]
---

Hướng dẫn setup setup card Wifi cho Freebsd 11.0

Hiện tại phiên bản FreeBSD đã hỗ trợ hầu hết các card WIFI , máy tính mình đang xài dòng:
<pre>vendor     = 'Broadcom Corporation'
    device     = 'BCM4312 802.11b/g LP-PHY'
    class      = network
</pre>
Đầu tiên để chạy được dòng này cần phải có driver  bwn , mặc định Freebsd không có driver này cần phải build lại Kernel để có driver.

Sau khi build lại kernel của Freebsd cần làm tiếp :

 
<ul>
	<li>cài đặt <tt>bwn-firmware-kmod</tt> từ  ports</li>
	<li><tt> add những dòng phía dưới vào /boot/loader.conf</tt></li>
</ul>
 
<pre>if_bwn_load="YES"
bwn_v4__lp_ucode_load="YES"

# if_bwi_load="YES"
wlan_scan_ap_load="YES"
wlan_scan_sta_load="YES"
wlan_wep_load="YES"
wlan_ccmp_load="YES"
wlan_tkip_load="YES"</pre>
Chèn thêm những dòng vào file rc.conf
<pre>wlans_bwn0="wlan0"
ifconfig_wlan0="ssid HSD DHCP"</pre>
Sau đó reboot rồi
<pre>root@BSDbox:~ # ifconfig wlan0 scan
root@BSDbox:~ #</pre>
