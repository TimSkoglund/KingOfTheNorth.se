# King of the North

Next.js/TypeScript tournament site for **King of the North - EuroBowl Poland 2026 Rules Warm-up**.

## Starta lokalt

```bash
npm install
npm run dev
```

Öppna sedan `http://localhost:3000`.

## Admin

Admin finns på `http://localhost:3000/admin`.

Standardlösenord lokalt är:

```text
change-me-king
```

För lokal användning, skapa `.env.local` om du vill byta lösen:

```env
ADMIN_PASSWORD=byt-till-ett-starkt-losenord
ADMIN_SESSION_TOKEN=byt-till-en-lang-slumpad-token
```

I production måste `ADMIN_PASSWORD` och `ADMIN_SESSION_TOKEN` vara satta. Appen startar inte admin-auth korrekt utan dem.

## Registreringar

Registreringar sparas lokalt i:

```text
data/registrations.json
```

Varje registrering får status:

- `unpaid`
- `paid`
- `confirmed`

Detta är medvetet enkelt och kan senare bytas mot riktig databas genom att byta implementation i `lib/data.ts`.

## Ändra texter

Grundtexterna ligger i:

```text
lib/defaultContent.ts
```

När sidan startas skapas även en redigerbar kopia i:

```text
data/site-content.json
```

Adminpanelen kan redigera både svensk och engelsk text via JSON-editorn.

## Byta bilder

Publika assets ligger i:

```text
public/assets/images
```

Viktiga bilder:

- `public/assets/images/hero-arena-background.png`
- `public/assets/images/orc-player.png`
- `public/assets/images/elf-player.png`
- `public/assets/images/branding/king-of-the-north-logo.png`
- `public/assets/images/branding/north-skull-emblem.png`
- `public/assets/images/awards/*.png`

Byt filerna med samma namn om du vill ändra design utan att ändra kod.

## Struktur

```text
app/                  Next.js routes och API routes
components/           Publik sida och admin UI
lib/defaultContent.ts Strukturerade texter på svenska/engelska
lib/data.ts           Lokal JSON-lagring, lätt att ersätta med DB
public/assets/        Bilder och visuella assets
```

## Publicera på DigitalOcean Droplet

Den här setupen kör sidan med Docker Compose på en droplet. `data/` ligger som volym på servern så registreringar och adminändringar överlever deploys.

### 1. Förbered droplet

Logga in på dropleten via SSH och installera Docker, Nginx och Certbot:

```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg nginx certbot python3-certbot-nginx
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 2. Lägg projektet på servern

```bash
sudo mkdir -p /var/www/kingofthenorth
sudo chown -R $USER:$USER /var/www/kingofthenorth
git clone <DIN_GIT_REPO_URL> /var/www/kingofthenorth
cd /var/www/kingofthenorth
cp deploy/.env.production.example deploy/.env.production
nano deploy/.env.production
```

Sätt riktiga värden:

```env
ADMIN_PASSWORD=ett-langt-unikt-losenord
ADMIN_SESSION_TOKEN=en-lang-slumpad-token-minst-32-tecken
```

Skapa gärna token med:

```bash
openssl rand -hex 32
```

### 3. Starta appen

```bash
cd /var/www/kingofthenorth
bash deploy/deploy.sh
```

Appen lyssnar internt på `127.0.0.1:3001` på dropleten och kör Next inuti containern på port `3000`.

### 4. Nginx

```bash
sudo cp /var/www/kingofthenorth/deploy/nginx-kingofthenorth.conf /etc/nginx/sites-available/kingofthenorth.se
sudo ln -s /etc/nginx/sites-available/kingofthenorth.se /etc/nginx/sites-enabled/kingofthenorth.se
sudo nginx -t
sudo systemctl reload nginx
```

När DNS pekar rätt, aktivera HTTPS:

```bash
sudo certbot --nginx -d kingofthenorth.se -d www.kingofthenorth.se
```

### 5. Automatisk deploy från GitHub main

Workflow finns i `.github/workflows/deploy.yml`. Lägg dessa GitHub repository secrets:

```text
DEPLOY_HOST=<droplet-ip>
DEPLOY_USER=<ssh-user, exempelvis root eller deploy>
DEPLOY_SSH_KEY=<privat ssh-nyckel som får logga in på dropleten>
DEPLOY_PORT=22
```

På dropleten måste `/var/www/kingofthenorth` vara en git-klon av repo:t och användaren i `DEPLOY_USER` måste kunna köra `docker compose`.

Efter det räcker det att pusha till `main`; GitHub Actions kör `deploy/deploy.sh` på dropleten.

### 6. Loopia DNS

I Loopia DNS för `kingofthenorth.se`:

```text
@      A      <droplet-ip>
www    CNAME  kingofthenorth.se
```

Alternativt kan `www` också vara en `A`-pekare till samma IP. Vänta tills DNS slagit igenom och kör sedan Certbot-kommandot ovan.
