# https://stackoverflow.com/questions/64081992/docker-opened-up-ports-to-public-how-do-i-close-them
# https://www.jeffgeerling.com/blog/2020/be-careful-docker-might-be-exposing-ports-world
echo "Patch DOCKER-USER"
sudo iptables -N DOCKER-USER

sudo iptables -N DOCKER-USER-YES
sudo iptables -N DOCKER-USER-NO

# OUT: EXT and BETWEEN
# IN=br-0c887f4982d7 OUT=br-0c887f4982d7 PHYSIN=vethba67891 PHYSOUT=vethbe8c52a SRC=172.18.0.6 DST=172.18.0.8 PROTO=TCP SPT=3200 DPT=59274
# IN=br-0c887f4982d7 OUT=eth0 PHYSIN=vethba67891 SRC=172.18.0.6 DST=193.210.18.18 PROTO=UDP SPT=53652 DPT=53
#sudo iptables -A DOCKER-USER -s 172.0.0.0/8 -j DOCKER-USER-YES
sudo iptables -A DOCKER-USER -s 172.0.0.0/8 -j RETURN

# IN: response
# IN=eth0 OUT=br-0c887f4982d7 SRC=193.210.18.18 DST=172.18.0.6 PROTO=UDP SPT=53 DPT=5664
# IN=eth0 OUT=br-53c1912761b2 SRC=216.58.209.173 DST=172.18.0.6 PROTO=TCP SPT=443 DPT=34310
#sudo iptables -A DOCKER-USER -m state --state ESTABLISHED -j DOCKER-USER-YES
sudo iptables -A DOCKER-USER -m state --state ESTABLISHED -j RETURN

#sudo iptables -A DOCKER-USER -d 172.0.0.0/8 -p tcp -m multiport --sports 53 -j DOCKER-USER-YES
#sudo iptables -A DOCKER-USER -d 172.0.0.0/8 -p tcp -m multiport --sports 53 -j RETURN

# BLOCK exposed ports
# IN=eth0 OUT=br-0c887f4982d7 SRC=80.220.184.243 DST=172.18.0.2 PROTO=TCP SPT=57526 DPT=5432
#sudo iptables -A DOCKER-USER -i eth0 ! -s 127.0.0.1 -d 172.0.0.0/8 -j DOCKER-USER-NO
sudo iptables -A DOCKER-USER -i eth0 ! -s 127.0.0.1 -d 172.0.0.0/8 -j DROP

#sudo iptables -A DOCKER-USER -i eth1 ! -s 127.0.0.1 -d 172.0.0.0/8 -j DOCKER-USER-NO
sudo iptables -A DOCKER-USER -i eth1 ! -s 127.0.0.1 -d 172.0.0.0/8 -j DROP

# DOCK YES
sudo iptables -A DOCKER-USER-YES -j LOG  --log-level info --log-prefix "DOCK_YES "
sudo iptables -A DOCKER-USER-YES -j RETURN

# DOCK NO
sudo iptables -A DOCKER-USER-NO -j LOG  --log-level info --log-prefix "DOCK_NO "
sudo iptables -A DOCKER-USER-NO -j DROP
