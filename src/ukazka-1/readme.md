**Angular Dependency Injection**

Zakladni myslenka DI je moznost konzumovat instance trid, bez nutnosti starat se o to, jak a kde se tyto instance vytvareji.
Vyhoda tedy spociva v tom, ze pokud se rozhodnu zmenit implementaci tridy kterou konzumuji jinde, tak to delam pouze na jednom miste.
V opacnem pripade bych musel obehnout celou aplikaci a upravit vsechny mista, kde se intance dane tridy vytvari a konzumuje.

Dobrym prikladem jsou automaticke testy, kdy skoro vzdy potrebujem prohodit implementaci tridy za mock implementaci a bez DI
by to znamenalo upravovat importy primo v te tride, ktere se testovani tyka, coz nikdo delat nechce.

**Jak to funguje v Angularu?**

Angular zada prikaz Injectoru k vytvoreni instance tridy. Injector zjisti, zda ma dana trida nejake zavislosti a pokud ano,
zacne hledat jejich Provider. Je dulezite upoznornit na to, ze existuje velke mnozstvi injectoru a kazdy z nich ma svoje pole provideru.
Pokud Injector nenajde Provider v dane komponente, odkaze se na vyse postaveny Injector s dotazem na Provider, takto pokracujeme z Element Injectoru az po
Null Injector, ktery stoji v hiearchii stromu nahore. V pripade nenalezeni Provideru je vyhozena hlaska StaticInjectorError - No provider for UdelejSnidaniService service!

![This is an image](https://i.ibb.co/GnyGZFd/injector.png)

**Provider**

Provider je funkce, ktera je nasledne chapana jako tovarna na nove instance. Pro lepsi pochopeni si jednoduchy provider vytvorime. Vetsinou pro nas
Angular vytvari Provider automaticky. V pripade ukazky vytvorime Provider, ktery vrati instanci tridy UdelejSnidaniService. Pokud by
mela trida UdelejSnidaniService nejake vlastni zavislosti, vrazime je mezi zavorky.

**Injection token**

Krome Provideru potrebuje Injector i unikatni identifikator instance. V Angularu se o to stara trida InjectionToken, kterou dava Anuglar k dispozici.
Je dulezite zminit ze kazdy token musi byt unikatni. Jako typ InjectionTokenu zvolime typ tridy, ke ktere budeme token prirazovat a jako prvni arugment mezi zavorky
vrazime unikatni nazev tokenu (string).
