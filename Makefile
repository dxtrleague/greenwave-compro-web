.PHONY: start stop restart build rebuild logs shell preview

# Variables
DC=docker compose
SERVICE=app

# Menjalankan container di background
start:
	$(DC) up -d

# Menghentikan container
stop:
	$(DC) down

# Restart container
restart:
	$(DC) restart

# Membangun image
build:
	$(DC) build

# Membangun ulang tanpa cache dan restart
rebuild:
	$(DC) build --no-cache
	$(DC) up -d --force-recreate

# Melihat log aplikasi
logs:
	$(DC) logs -f $(SERVICE)

# Masuk ke shell container
shell:
	$(DC) exec $(SERVICE) sh

# Membuat build static dan menjalankannya (Simulasi GitHub Pages)
# Port 8003 akan digunakan oleh server static (serve)
preview:
	$(DC) run --rm -e NODE_ENV=production -p 8003:8003 $(SERVICE) sh -c "rm -rf out && npm run build && npx -y serve out -l 8003"
