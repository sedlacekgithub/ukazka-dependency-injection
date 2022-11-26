**Angular Dependency Injection**

Zakladni myslenka DI je moznost konzumovat instance trid, bez nutnosti starat se o to, jak a kde se tyto instance vytvareji.
Vyhoda tedy spociva v tom, ze pokud se rozhodnu zmenit implementaci tridy kterou konzumuji jinde, tak to delam pouze na jednom miste.
V opacnem pripade bych musel obehnout celou aplikaci a upravit vsechny mista, kde se intance dane tridy vytvari a konzumuje.

Dobrym prikladem jsou automaticke testy, kdy skoro vzdy potrebujem prohodit implementaci tridy za mock implementaci a bez DI
by to znamenalo upravovat importy primo v te tride, ktere se testovani tyka, coz nikdo delat nechce.

**Jak to funguje v Angularu?**

![This is an image](https://i.ibb.co/GnyGZFd/injector.png)
