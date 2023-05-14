# Three.js  
In deze workshop zal je de basis van three.js leren, alsook zal je gebruik maken van Cannon.js als physics engine om een auto te maken en doen bewegen.  
  
Je kan gebruik maken van volgende sites voor informatie te vinden tijdens de workshop:  
https://schteppe.github.io/cannon.js/docs/  
https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene  
  
Bij vragen aarzel niet om mij iets te vragen.   

# Inleiding  
Voor we satrten haal je best de beginsbestanden af van github, de github is:   
https://github.com/Seppedc/Three.js.git  
  
vervolgens zal je via het commando npm install de benodigde bpackages gaan installeren. Zorg dat je zeker in de juiste folder zit(Workshop Files).  
Je kan het project runnen via npx vite, deze maakt dan een link waar je het resultaat van de code kan gaan bekijken.  

# Phase1
We gaan beginnen met de basis van three.js aan te maken.    
-	Scene aanmaken  
-	Camera aanmaken  
-	Renderen aanmaken  
-	Grootte van de renderer aanpassen   
-	Renderer toevoegen in de html  
-	In de animate functie de renderer toevoegen  
-	Achtergrond van de scene aanpassen naar ander kleur  
  
# Phase 2
In dit deel gaan we een eerste object aanmaken en de omgeving gaan instellen.  
-	Camera positie veranderen(wil je weten waarom dit nodig  is? Doe dit dan eens weg nadat u het viekrant heeft toegevoegd en kijk of je uw vierkant nog kan zien)  
-	Toevoegen nieuw object(vierkant).  
-	Geef de vloer een texture. Je kan gebruik maken van volgende link als bron:  
https://upload.wikimedia.org/wikipedia/commons/4/4c/Grass_Texture.png  
De code van de vloer zelf heb ik al toegevoegd maar moet je nog uit commentaar zetten.   
Enkel de lijn van de het definiëren van de texture moet je nog aanpassen.   
-	Voeg een lichtrbon toe aan de scene  
  
# Phase 3  
Het is tijd om eens de physics enginne te gaan gebruiken. In dit deel maken we physieke object en laten  deze interageren met elkaar.   
-	Maak een fysiek object dat de vorm van een vierkant heeft.   
-	Geef dit object de coordinaten: (1, 10, 0)  
-	Maak een 2de fysiek object aan in de vorm van een bal(Sphere)  
-	Geef dit object de coordinaten: (0, 7, 0)  
  
Als dit correct is toegevoegd dan zou je beide objecten moeten kunne zien vallen.  
Doordat dit physieke objecten zijn kunnen ze tegen elkaar botsen.   
Normaal kan je deze objecten niet zien maar ik heb al de code toegevoegd om ze wel te kunnen zien. (cannondebugger)   
  
# Phase 4   
De visuele objecten en physieke objecten werken natuurlijk nog niet samen in dit deel gaan we ze gaan synchronizeren. Dez fase werk je volledig uit in de animate functie.   
-	Zet de positie van de visuele box en de physieke box gelijk aan elkaar. Ja kan gebruik maken van position.copy();  
-	Zet de rotatie van de boen gelijk aan elkaar. (quaternion).  
-	Doe het zelfde voor de bal die ik heb toegevoegd(bal & balBody)  
  
Als dit correct is toegevoegd zouden beide objecten moeten vallen op elkaar en de bal zou moeten weg rollen.   
  
# Phase 5  
Dit was de basis. Nu gaan we beginnen met een complexer object te gaan maken. In dit deel gaan we een model inladen.   
Zet de code van de bal en vierkant in commentaar.   
-	Maak gebruik van de GLTFLoader om een model in te laden. In de assets folder zit er al een model van een tesla. Moest hje zelf een ander model willen gebruiken kan dat ook. Modellen kan je vinden via o.a https://sketchfab.com/tags/car.  
-	Zet de scale van het model op een normale grootte (meegegeven model = 0.02)  
-	Maak voor het inladen een lege variabele aan waarin je het nmodel ook zal opslaan.  
  
Klaar met deze phase laat het mij weten en ik kom eens snle kijken  of dit correct is.   
  
# Phase 6  
Tijd om het fysieke deel van de auto te maken.  
Zet momenteel het toevoegen van het auto model aan de scene in commentaar. Dit zal je tijdens deze phase terug gebruiken  
-	Maak een variabele die de body van de auto is via CANNON.Body, in de body gaan we de mass, position en shape een waarde geven.   
    -	mass: zelf te kiezen (heeft imvloed op gewicht van de auto)  
    -	position: positie van de body   
    -	shape: Cannon.Box met de groote van uw voertuig. Maak gebruik van het model (uncomment de code) om de groote gelijk te zetten aan de groote van het model.  
  
-	Maak via variabele die het voertuig bijhoud via CANNON.RigidVehicle. zet de chassisBody gelijk aan de aangemaakte body van de vorige stap.  
-	Voeg het voertuig toe aan de physieke wereld.(de code van volgende stappen plaats je er boven zodat het voertuig altijd als laatste wordt toegevoegd).  
-	Maak een wheelbody aan via CANNON.Body. als parameter geef je volgende: {mass,material:wheelMaterial}  
-	Voeg aan deze wheelBody de shape toe via addshape(wheelshape).  
-	Zet de angularDamping van de wheelBody gelijk aan 0.4;  
-	Voeg dit wiel toe aan het voertuig.  Genruik volgende parameters:   
    -	body: wheelBody,  
    -	position: plaats van het wiel maak gebruik van uw model om de wielen op de juiste plaats te zetten  
    -	axis: orientatie van de wielen bij gebruik van de tesla is dit: (-1,0,0)  
    -	direction: down (voorgemaakte variabele)  
-	Herhaal de stap van het wiel  nog 3x   
  
Nadat het voertuig is toegevoegd gaan we via user input het voertuig laten bewegen.  
-	Maak gebruik van addEventListener om de keydown te registreren en voeg volgende functies toe:  
    -	ArrowUp: laat het voertuig naar voor bewegen d.m.v SetWheelForce(maxForce, wiel). Doe dit voor beide voorste wielen  
    -	ArrowDown: laat het voertuig naar achter  bewegen d.m.v SetWheelForce(-maxForce, wiel). Doe dit voor beide voorste wielen  
    -	ArrowLeft: Laat het voertuig de wielen naar links draaien. Dit kan je doen via setSteeringValue(maxSteerVal, nummer van het wiel ) Doe dit voor beide voorste wielen  
    -	ArrowRight: Laat het voertuig de wielen naar rechts draaien. Dit kan je doen via setSteeringValue(-maxSteerVal, nummer van het wiel ) Doe dit voor beide voorste wielen  
-	Maak gebruik van addEventListener om de keyupt e registreren dit gan we doen om het voertuig te doen stoppen met bewegen andat de knop is losgelaten. Je kan de zelfde code gaan gebruiken als voor de keydown maar de waardes zijn allemaal 0.  
-	De laatste stap is het linken van de physieke auto die je net hebt gemaakt en hebt laten bewegen met het ingeladen model.  In de animate functie moet je de positie en quaternion van het model gelijkzetten aan die van het physieke model.   
  
Na al dit lastig werken verdien je wel wat plezier.  
Voeg de functie GenerateFun() toe aan de code(voor de animate functie) en amuseer u met het bewegen van uw voertuig.  
  
# Phase 7  
Dit is het laatste deel. Wat je nu gaat doen is proberen om de camera de auto te doen volgen. In de animate functie zet je “controls.update();” in commentaar.  
-	Verplaats de camera zodat deze achter de auto staat en naar de voorkant kijkt. (je ziet dus de achterkant van de auto.). je kan zelf kiezen op welke afstand je de camera zet.  
-	Maak een variabele cameraOffset hierin maak je een vector3. Bereken  het verschil tussen de camera en de fysieke auto en sla dit op als de cameraOffset.  
-	Zet de camera positie gelijk aan die van de auto en voeg hier dan de cameraOffset aan toe.  
  
Volgende opdrachten voeg je toe aan de animate functie:  
-	Update de positie van de camera in de animate functie met de locatie van de auto en voeg hier de offset aan toe.  
-	Maak een varibele aan en sla hier de locatie van het voertuig in op.  
-	Maak gebruik van de lookAt functie om de camera naar de variabele te doen kijken.  
  
Dit is het einde van de workshop hopelijk ben je tot hier geraakt met enkele minuten tijd over en vond je het iets of wat plezant.   
