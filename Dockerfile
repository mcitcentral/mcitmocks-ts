FROM ubuntu:20.04

# prereqs
RUN apt-get update && apt-get -y full-upgrade
RUN apt-get -y install apt-utils software-properties-common dialog gnupg wget curl sudo htop

# repositories
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -

# node and postgres
RUN apt-get update
RUN apt-get -y install postgresql nodejs

# setup yarn
RUN npm install --global yarn

# Set up mcitmocks as the user with home directory
ARG GID=1000
ARG UID=1000
ARG USERNAME=mcitmocks
RUN addgroup --gid $GID $USERNAME
RUN useradd --system --create-home --shell /bin/bash --groups sudo -p "$(openssl passwd -1 mcit)" --uid $UID --gid $GID $USERNAME

# setup postgres
USER postgres

ARG DB_NAME=mcitmocks_dev
ARG DB_USER=mcitmocks
ARG DB_PASS=password
# Create a PostgreSQL role named ``docker`` with ``docker`` as the password and
# then create a database `docker` owned by the ``docker`` role.
# Note: here we use ``&&\`` to run commands one after the other - the ``\``
#       allows the RUN command to span multiple lines.
RUN    /etc/init.d/postgresql start &&\
  psql --command "CREATE USER $DB_USER WITH SUPERUSER PASSWORD '$DB_PASS';" &&\
  createdb -O $DB_USER $DB_NAME

VOLUME  "/var/lib/postgresql"

# For additional configuration options, see https://docs.docker.com/samples/postgresql_service/

# Set the default command to run when starting the container?
#CMD ["/usr/lib/postgresql/13/bin/postgres", "-D", "/var/lib/postgresql/13/main", "-c", "config_file=/etc/postgresql/13/main/postgresql.conf"]


# switch to mcitmocks user
USER $USERNAME
WORKDIR /home/$USERNAME/
