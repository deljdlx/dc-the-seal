FROM nginx:alpine

# Install nodejs + mpn
RUN apk add --no-cache nodejs npm

# Copier notre script d'initialisation
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exécuter notre script, puis appeler le entrypoint de WordPress
ENTRYPOINT ["/bin/sh", "-c", "/entrypoint.sh"]
