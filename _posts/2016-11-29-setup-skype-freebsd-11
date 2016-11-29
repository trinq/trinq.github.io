---
layout: post
title: "Hướng dẫn setup setup  Skype cho Freebsd 11.0"
comments: true
description: "Hướng dẫn setup  Skype cho Freebsd 11.0e"
keywords: "Hướng dẫn setup setup Skype cho Freebsd 11.0"
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
