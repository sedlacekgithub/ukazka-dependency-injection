**Angular Dependency Injection**

Zakladni myslenka DI je moznost konzumovat instance trid, bez nutnosti starat se o to, jak a kde se tyto instance vytvareji.

Priklad: mam 100 ruznych trid, ktere nezavisle na sobe vytvareji instanci moji tridy. Musi tedy pokazde pres konstruktor vlozit
vsechny potrebne parametry a instanci vytvorit. V momente kdy se programator rozhodne pridat jeste jeden parametr konstruktoru,
musi zaroven obehnout vsech 100 trid a tento parametr pri zakladani nove instance do konstruktoru pridat rucne.

Druhym pripadem muzou byt automaticke testy, kde vetsinou potrebujeme podvrhnout puvodni tridu za jeji mock implementaci (napr. u http callu).
Nebudeme tedy menit primo import ve tride kterou testujeme, ale jen pres konstruktor posleme nasi podvrhnutou zavislost ktera ma stejnou signaturu jako originalni trida.

**Jak to funguje v Angularu?**

Pokud je potreba vytvorit novou instanci tridy, zavola si Angular na pomoc specialni tridu Injector.
Injector vytvori zavislosti a vrati pres factort funkci instanci dane tridy.

**Injector**

Injector je Angulari trida zodpovedna za vytvoreni instance zavislosti pro danou tridu/servisu.
Existuji dva typy Injectoru, jeden pro Moduly (ModuleInjector) a druhy pro Komponenty a Direktivy (ElementInjector).
Kazdy Injector dostava sve pole Provideru podle toho, kde vzniknul. Diky tomu ze jsou oba typy Injectoru stromove struktury
je mozne hledat Provider i v nadrazenem Injectoru.

Zajimavost:
V pripade registrace Provideru pres dekorator @Injectable providedIn: 'root', skonci dany Provider v poli provideru RootModuleInjectoru.
Pri pozadani o instanci ve tride musi tedy Angular projit skrz vsechny Injectory az k RootModuleInjectoru a az teprve tam najde Provider ktery hleda.

Pozor:
Pokud je ovsem Provider nalezen v aktualnim Injectoru, dale nahoru nekouka cimz obcas vznika novackovska chyba kdy dany programator umisti napr. sluzbu kterou jiz ma providnutou pomoci dekoratoru Injectable do pole provideru v komponente ve ktere pracuje. Omylem mu tak vznikne uplne nova instance sluzby.

Pozor2:
V pripade nenalezeni Provideru v zadnem Injectoru je zobrazna hlaska StaticInjectorError - No provider for ... service!

Priklad vytvoreni sluzby z tokenu pomoci Injectoru:

```javascript
    const injector = Injector.create({
      providers: [
        {
          provide: KUCHYN_TOKEN,
          useFactory: kuchynProvider,
        },
      ],
    });
    const kuchynInstance = injector.get(KUCHYN_TOKEN);
```

**Provider**

Provider je v Angularu objekt, ktery presne popisuje jak ma byt vytvorena instance tokenu. Angular si vytvori Provider ve vybranych pripadech automaticky a to pokud: ..vlozime napr. tridu rucne do Providers pole v @NgModule,@Component nebo @Directive. Druhy, castejsi pripad je v pripade pouziti dekoratoru @Injectable v parametrem providedIn.

Zajimavost: diky teto logice je mozne v child komponente pres konstruktor vlozit nejen instanci sluzby, ale
i instanci primeho rodice.

```javascript
const provider = {
  provide: KUCHYN_TOKEN, // token nebo string
  useFactory: kuchynProviderFunction, // funkce, ktera vytvari instanci
  deps: [], // pokud by kuchynProvider mel vlastni zavislosti, je potreba je uvest zde
},
```

**Injection token**

Kazdy Provider potrebuje mit unikatni identifikator. Tomuto identifikatoru se rika Injection Token a nejcasteji se jedna o instanci tridy
InjectionToken, ale stejne dobre lze pouzit i obycejny string. V pripade ukazky jsem si vybral InjectionToken, ktery otypuji jako tridou Kuchyn a mezi zavorky vrazim \_desc, ktery nemusi byt unikatni (je to pro debug).

```javascript
export const KUCHYN_TOKEN = new InjectionToken<Kuchyn>('KUCHYN_TOKEN');
```

**Volitelne Dekoratory**

Existuje dalsi moznost, jak jeste vice do hloubky konfigurovat chovani DI. Angular pro nas pripravil par dekoratoru ktere stoji za zminku.

1. @Self - Angular hleda Provider pouze v aktualnim Injectoru ( napriklad ve tride ve ktere se aktualne nachazi)
2. @SkipSelf - Naopak preskakuje aktualni Injector a diva se po Provideru o level vyse a dale
3. @Optional - Pokud Provider nenajde, misto vyhozeni chyby proste vrati Null.
4. @Host - TODO :D

Dobre je vedet ze tyto dekoratory lze kombinovat.
