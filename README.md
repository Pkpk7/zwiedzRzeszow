## Zwiedź Rzeszów!

Aplikacja do zwiedzania Rzeszowa. Zawiera kilka predefiniowanych ścieżek zwiedzania Rzeszowa, a także inne funkcjonalności. Aplikacja została stworzona jako PWA z wykorzystaniem Reacta i Mapbox API. Testowana na Xiaomi mi a2 lite i komputerze z wyszukiwarką Chrome (powinna działać na większości urządzeń mobilnych i wyszukiwarkach komputerowych).

Aby zainstalować aplikację na telefonie przejdź do strony https://pkpk7.github.io/zwiedzRzeszow/. Powinien pojawić się dymek umożliwiający dodanie PWA do ekranu głównego telefonu, albo po kliknięciu "trzech kropek" w prawym gównym rogu i zdalnym dodaniu aplikacji do ekranu głównego. 

![Alt text](/src/Screens/Screenshot_20191225-171033.png)

Po włączeniu aplikacji, pojawi się splash art podczas ładowania się aplikacji. 

![Alt text](/src/Screens/2019_12_25_17.22.04.jpg?raw=true "Ekran startowy aplikacji")

Następnie na ekranie pojawi się mapa zbliżona na Rzeszów (mapa nie pozwala na "wyjechanie" nią poza granice Rzeszowa). Na mapie wyświetlone zostają markery na wybranych miejscach, które po kliknięciu w nie, pozwalają na zobaczenie jakie to miejsce i przeczytanie krótkiego opisu. Po lewej widnieją trzy przyciski, pozwalające na wyświetlanie poszczególnych ścieżek na zwiedzanie Rzeszowa. W prawnym gównym rogu położony jest przycisk geolokacji, który w przypadku położenia poza Rzeszowem wyświetli krótką notkę mówiącą o tym. W przeciwnym przypadku pokaże nasze położenie i zbliży na nie mape. 

Mapa Rzeszowa:

![Alt text](/src/Screens/Screenshot_20191225-172247.png?raw=true "Mapa Rzeszowa")

Jesteś poza Rzeszowem:

![Alt text](/src/Screens/Screenshot_20191225-172318.png?raw=true "Poza Rzeszowem")

Działająca geolokacja:

![Alt text](/src/Screens/Screenshot_20191225-172404.png?raw=true "Dzialajaca geolokacja")

Jeżeli geolokacja nie jest włączona, kliknięcie w marker na mapie spowoduje wyświetlenie dymka, który wyświetli nazwę miejsca i krótki jego opis. 

![Alt text](/src/Screens/Screenshot_20191225-172420.png?raw=true "Dymek")

Jeżeli geolokacja jest włączona, kliknięcie w marker oprócz zrobienia rzeczy opisanych wcześniej, narysuje także ścieżke do tego miejsca, która będzie aktualizowana co każdą aktualizację naszego położenia. W lewym dolnym rogu wyświetli się także okienko, które pokazuje ile czasu zajmie dojazd do danego miejsca (czas dojazdu, a także sama droga zależa od czasu, a także korków). 

![Alt text](/src/Screens/Screenshot_20191225-172529.png?raw=true "Trasa")

Podczas poruszania się, droga którą pokonujemy będzie rysowana na szaro. Droga rysowana jest tylko, gdy poruszymy się na odpowiednio daleki dystans od naszego ostatniego położenia (aby zapobiec rysowaniu bardzo krótkich linii).

![Alt text](/src/Screens/Screenshot_20191225-172707.png?raw=true "Gdzie byles")

Przyciski po lewej, pokazują nam trzy różne trasy zwiedzania Rzeszowa (bary, jedzenie i zwiedzanie). Każdy z przycisków po przyciśnięciu, zmienia kolor na kolor trasy którą rysuje. Po odkliknięciu przycisku dana trasa znika z mapy. 

![Alt text](/src/Screens/Screenshot_20191225-172739.png?raw=true "Trasy")

Przykładowa mapa z wyświetloną tylko trasą dla barów.

![Alt text](/src/Screens/Screenshot_20191225-172809.png?raw=true "Bary")

Jeżeli geolokacja jest włączona i zbliżymy się do jakiegoś z obiektów, wyświetlony zostanie odpowiedni komunikat (zamykany poprzez kliknięcie w niego).

![Alt text](/src/Screens/Screenshot_20191225-172844.png?raw=true "Bary")
