---
layout: post
title: "Hướng dẫn setup Skype cho FreeBSD 11.0"
comments: true
description: "Cài đặt Skype trên FreeBSD 11.0 bằng cách sử dụng Linux emulator."
keywords: "FreeBSD, Skype, linux-c6, emulator"
---

Hướng dẫn setup Skype trên Freebsd 11.0

Để setup được skype phải setup emulator Linux trên freebsd .Ta tiến hành như sau

 
<pre class="shell"># cd /usr/ports/emulators/linux-c6
# make install clean

</pre>
Tiếp theo update port tree
<pre class="shell"><strong>pkg upgrade</strong></pre>
Sau khi cài đặt xong tiến hành cài đặt Skype
<pre class="shell"># cd /usr/ports/net-im/skype4
# make install clean</pre>
Update file trong /etc/fstab
<pre class="file">linprocfs               /compat/linux/proc linprocfs rw         0       0

</pre>
 

Link tham khảo thêm

http://daemon-notes.com/articles/desktop/skype
