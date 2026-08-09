from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Jucăuș Magazine API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class Block(BaseModel):
    type: str  # p | h | quote
    text: str


class Post(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    kicker: str
    excerpt: str
    category: str
    author: str
    cover: str
    accent: str
    read_time: int
    featured: bool = False
    body: List[Block] = []
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class NewsletterCreate(BaseModel):
    email: EmailStr


# ---------- Seed data ----------
SEED_POSTS = [
    {
        "slug": "manifestul-culorii",
        "title": "Manifestul culorii: de ce lumea are nevoie de mai mult curaj cromatic",
        "kicker": "ESEU",
        "excerpt": "Trăim într-o epocă a griurilor sigure. Argumentăm pentru o revoltă a paletelor îndrăznețe și a formelor care refuză să se scuze.",
        "category": "Artă",
        "author": "Ioana Vlad",
        "cover": "https://images.unsplash.com/photo-1686356513907-24c45338357f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHw0fHxjb2xvcmZ1bCUyMHN1cnJlYWwlMjBhcnQlMjBkZXNpZ258ZW58MHx8fHwxNzg2MzAwMzQ4fDA&ixlib=rb-4.1.0&q=85",
        "accent": "#FF5C00",
        "read_time": 6,
        "featured": True,
        "body": [
            {"type": "p", "text": "Există un moment, în fiecare proiect, în care cineva spune „hai să o facem mai sobră”. E momentul în care culoarea moare. Nu dramatic, ci încet — printr-o mie de compromisuri rezonabile care ne aduc, invariabil, la același gri prietenos și inofensiv."},
            {"type": "h", "text": "Siguranța e cel mai plictisitor lucru din lume"},
            {"type": "p", "text": "Am confundat maturitatea vizuală cu absența entuziasmului. Dar culoarea nu e un capriciu infantil; e un limbaj. Un galben care țipă, un albastru electric, un roz care refuză să fie discret — toate spun ceva despre curajul celui care le folosește."},
            {"type": "quote", "text": "Culoarea este locul în care creierul nostru și universul se întâlnesc."},
            {"type": "p", "text": "Propunerea noastră e simplă: alegeți o culoare care vă sperie puțin. Puneți-o pe primul plan. Lăsați-o să fie protagonista, nu accentul timid dintr-un colț. Restul vine de la sine."},
            {"type": "p", "text": "Pentru că, până la urmă, nimeni nu-și amintește un gri. Dar toată lumea își amintește prima dată când a văzut ceva imposibil de ignorat."},
        ],
    },
    {
        "slug": "moda-ca-protest",
        "title": "Moda ca protest: garderoba ca formă de vorbire liberă",
        "kicker": "INTERVIU",
        "excerpt": "Am stat de vorbă cu trei designeri care tratează îmbrăcămintea drept pancartă, nu doar drept produs.",
        "category": "Modă",
        "author": "Radu Enache",
        "cover": "https://images.unsplash.com/photo-1617690032703-f991ed0e0ee6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHx2aWJyYW50JTIwZmFzaGlvbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NjMwMDM1M3ww&ixlib=rb-4.1.0&q=85",
        "accent": "#FF66D8",
        "read_time": 8,
        "featured": True,
        "body": [
            {"type": "p", "text": "Hainele au fost întotdeauna mai mult decât textile. Sunt semnale. Iar când semnalul devine intenționat, moda se transformă în manifest."},
            {"type": "h", "text": "„Purtăm ceea ce credem”"},
            {"type": "p", "text": "Pentru generația de designeri cu care am vorbit, fiecare cusătură e o decizie politică. Culoarea nu e ornament, ci declarație. Volumul nu e modă, ci ocupare de spațiu."},
            {"type": "quote", "text": "O rochie poate spune mai mult decât un manifest de zece pagini."},
            {"type": "p", "text": "Rezultatul e o generație care nu mai cere permisiunea. Croiește, colorează, exagerează — și lasă privitorul să tragă concluziile."},
        ],
    },
    {
        "slug": "arhitectura-care-zambeste",
        "title": "Arhitectura care zâmbește: clădiri care refuză să fie serioase",
        "kicker": "REPORTAJ",
        "excerpt": "De la fațade albastre la ferestre asimetrice — un tur al clădirilor care au ales bucuria în locul monumentalității.",
        "category": "Arhitectură",
        "author": "Maria Sandu",
        "cover": "https://images.unsplash.com/photo-1594548044919-75fd146b8c60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxjb2xvcmZ1bCUyMG1pbmltYWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg2MzAwMzYwfDA&ixlib=rb-4.1.0&q=85",
        "accent": "#0047FF",
        "read_time": 5,
        "featured": False,
        "body": [
            {"type": "p", "text": "Cine a decis că o clădire trebuie să pară gravă ca să fie luată în serios? Un val de arhitecți tineri spune „nimeni” și demonstrează asta cu fiecare colț rotunjit."},
            {"type": "h", "text": "Geometria ca joacă"},
            {"type": "p", "text": "Volumele primare — cubul, cilindrul, sfera — devin jucării la scară urbană. Iar culoarea nu mai e finisajul de la final, ci punctul de plecare al proiectului."},
            {"type": "quote", "text": "O clădire bună te face să încetinești. Una grozavă te face să zâmbești."},
            {"type": "p", "text": "Rezultatul: orașe care nu mai intimidează, ci invită. Spații publice în care copiii și adulții se comportă, pentru câteva minute, la fel."},
        ],
    },
    {
        "slug": "designul-imperfect",
        "title": "În apărarea designului imperfect",
        "kicker": "OPINIE",
        "excerpt": "Grilele perfecte ne-au dat o mie de site-uri identice. E timpul pentru asimetrie, greșeală și textură.",
        "category": "Design",
        "author": "Ioana Vlad",
        "cover": "https://images.unsplash.com/photo-1669840937066-a47011996ad6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxjb2xvcmZ1bCUyMG1pbmltYWwlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg2MzAwMzYwfDA&ixlib=rb-4.1.0&q=85",
        "accent": "#FFD600",
        "read_time": 4,
        "featured": False,
        "body": [
            {"type": "p", "text": "Instrumentele ne-au făcut prea buni. Orice aliniere e perfectă, orice spațiere e matematică. Și, cumva, totul arată la fel."},
            {"type": "h", "text": "Zgomotul readuce viața"},
            {"type": "p", "text": "Textura, granulația, mica imperfecțiune — acestea sunt amprentele mâinii într-o lume de pixeli sterili. Ele spun: aici a fost cineva."},
            {"type": "quote", "text": "Perfecțiunea e memorabilă doar când o strici cu intenție."},
            {"type": "p", "text": "Nu pledăm pentru haos. Pledăm pentru curajul de a lăsa o margine dreaptă acolo unde toată lumea se aștepta la o rotunjire."},
        ],
    },
    {
        "slug": "culoarea-in-oras",
        "title": "Cum culoarea schimbă felul în care trăim orașul",
        "kicker": "STUDIU",
        "excerpt": "Un experiment de un an: ce se întâmplă când vopsești o stradă în roșu, portocaliu și albastru?",
        "category": "Cultură",
        "author": "Radu Enache",
        "cover": "https://images.unsplash.com/photo-1780245747698-053b2d299418?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHw0fHxib2xkJTIwdmlicmFudCUyMGVkaXRvcmlhbCUyMGZhc2hpb258ZW58MHx8fHwxNzg2MzAwNDM4fDA&ixlib=rb-4.1.0&q=85",
        "accent": "#FF5C00",
        "read_time": 7,
        "featured": False,
        "body": [
            {"type": "p", "text": "Am ales o stradă obișnuită, gri, uitată. Am vopsit-o. Apoi am privit, timp de douăsprezece luni, cum se schimbă comportamentul oamenilor."},
            {"type": "h", "text": "Culoarea încetinește pasul"},
            {"type": "p", "text": "Trecătorii s-au oprit mai des. Copiii au început să folosească spațiul ca loc de joacă. Comercianții au raportat mai multă activitate. O simplă schimbare de paletă a rescris relația cu locul."},
            {"type": "quote", "text": "Nu am construit nimic nou. Am dat doar permisiunea de a ne bucura."},
            {"type": "p", "text": "Concluzia? Culoarea nu e cosmetică. E infrastructură emoțională."},
        ],
    },
    {
        "slug": "portret-de-artist",
        "title": "Portret de artist: mâinile care refuză neutralitatea",
        "kicker": "PROFIL",
        "excerpt": "În atelierul unei artiste pentru care fiecare pânză e o negociere între disciplină și explozie.",
        "category": "Artă",
        "author": "Maria Sandu",
        "cover": "https://images.unsplash.com/photo-1786052851271-66128a7af0b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHw0fHx2aWJyYW50JTIwZmFzaGlvbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc4NjMwMDM1M3ww&ixlib=rb-4.1.0&q=85",
        "accent": "#FF66D8",
        "read_time": 6,
        "featured": False,
        "body": [
            {"type": "p", "text": "Atelierul miroase a terebentină și a hotărâre. Pe pereți, zeci de pânze în care roșul se ceartă cu albastrul și, cumva, câștigă amândouă."},
            {"type": "h", "text": "Disciplina din spatele exploziei"},
            {"type": "p", "text": "„Oamenii cred că e spontan”, spune ea, „dar fiecare accident e pregătit luni de zile.” În spatele fiecărei pete aparent întâmplătoare stau sute de decizii."},
            {"type": "quote", "text": "Curajul nu e absența fricii. E să pui culoarea pe pânză oricum."},
            {"type": "p", "text": "Plecăm din atelier cu o certitudine: neutralitatea e o alegere. Și nu e singura."},
        ],
    },
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Jucăuș Magazine API"}


@api_router.get("/posts", response_model=List[Post])
async def get_posts(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category and category.lower() != "toate":
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    docs = await db.posts.find(query, {"_id": 0}).to_list(1000)
    docs.sort(key=lambda d: d.get("created_at", ""), reverse=True)
    return docs


@api_router.get("/categories")
async def get_categories():
    cats = await db.posts.distinct("category")
    return {"categories": ["Toate"] + sorted(cats)}


@api_router.get("/posts/{slug}", response_model=Post)
async def get_post(slug: str):
    doc = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Articol inexistent")
    return doc


@api_router.post("/newsletter")
async def subscribe(payload: NewsletterCreate):
    email = payload.email.lower()
    existing = await db.subscribers.find_one({"email": email})
    if existing:
        return {"message": "Ești deja abonat!", "already": True}
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.subscribers.insert_one(doc)
    return {"message": "Bine ai venit în club!", "already": False}


@app.on_event("startup")
async def seed_db():
    count = await db.posts.count_documents({})
    if count == 0:
        for p in SEED_POSTS:
            post = Post(**p)
            await db.posts.insert_one(post.model_dump())
        logger.info("Seeded %d posts", len(SEED_POSTS))


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
